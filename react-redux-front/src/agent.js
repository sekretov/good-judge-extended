import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';
const API_ROOT2 = 'http://auca.space:8085';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const requests2 = {
  del: url =>
    superagent.del(`${API_ROOT2}${url}`).use(tokenPlugin).set('Accept', 'application/json').then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT2}${url}`).use(tokenPlugin).set('Accept', 'application/json').then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT2}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT2}${url}`, body).use(tokenPlugin).set('Accept', 'application/json').then(responseBody)
};

const Auth = {
  current: () =>
    requests2.get('/user'),
  login: (login, password) =>
    requests2.post('/login', { login, password }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  del: id =>
    requests2.del(`/entry/${id}/delete`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests2.get('/entries'),
  get: id =>
    requests2.get(`/entry/${id}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests2.post(`/entry/${article.id}/update`, article),
  create: article =>
    requests2.post('/entry/create', article)
};

const Comments = {
  create: (id, submission) =>
    requests2.post(`/entry/${id}/submit`, { submission }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: id =>
    requests2.get(`/entry/${id}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  setToken: _token => { token = _token; }
};
