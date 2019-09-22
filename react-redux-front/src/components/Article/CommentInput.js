import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';
import { bindActionCreators } from 'redux';

const changeText = (payload1) => {
  return {
    type: 'CHANGE_COMMENT',
    payload: payload1
}
} 

const mapDispatchToProps = dispatch => ({
  changeText: bindActionCreators(changeText, dispatch),
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

const mapStateToProps = state => ({
  ...state.article, commentBody: state.article.commentBody
});

class CommentInput extends React.Component {
  constructor() {
    super();

    //this.setBody = ev => {
     //body: ev.target.value });
    //};

    this.createComment = ev => {
      ev.preventDefault();
      const articleTests = this.props.article.tests;
      console.log("articleTests:", articleTests);
      const articleTestId1 = articleTests.substr(22, 24);
      const articleTestId = "572709f8d12a816dfbde7a81";
      console.log("articleTestId1:", articleTestId1);

      //const payload = agent.Comments.create(this.props.match.params.id,
        //{ body: ev.target.value });
      console.log('commentBody', this.props.commentBody);
      const submit = 'submit';
      const payload = agent.Comments.create1(articleTestId1, this.props.commentBody, articleTestId1, submit)
      //this.props.article.id
      //this.props.onSubmit(this.props.commentBody);
      this.props.onSubmit(payload);
    };
  }
  
  render() {
    return (
    <section class="solution">
    <section class="submission">  
      <form id="problemForm" className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
        <input type="hidden" name="id" value="572709f8d12a816dfbde7a81" />
          <textarea className="form-control"
            name="submission"
            placeholder="Write your code..."
            onChange={(event) => {
              this.props.changeText(event.target.value)
            }}
            value={this.props.commentBody}
            rows="20">
          </textarea>
          <div id="editor"></div>
        </div>
        <div className="card-footer">
          <button
            name="submit"s
            className="btn btn-sm btn-primary submit"
            type="submit">
            Submit
          </button>
        </div>
        <aside class="results">
          <h2>Results</h2>
          <p className="error" style={{'display' : 'none'}}></p>
          <table>
            <thead>
              <tr>
                <th>Test #</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </aside>
      </form>
    </section>
  </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);

//onChange={this.setBody}

/* 


  

  <section class="solution">
    <section class="submission">
      <form id="problemForm" method="post" action="http://35.228.104.2:8080/submit">
        <input type="hidden" name="id" value="572709f8d12a816dfbde7a87" />
        <textarea className="form-control"
            name="submission"
            placeholder="Write your code..."
            onChange={(event) => {
              this.props.changeText(event.target.value)
            }}
            value={this.props.commentBody}
            rows="20">
          </textarea>
          <div id="editor"></div>
        <input type="submit" name="submit" value="submit" />
      </form>
      <aside class="results">
          <h2>Results</h2>
          <p className="error" style={{'display' : 'none'}}></p>
          <table>
            <thead>
              <tr>
                <th>Test #</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </aside>
      </section>
  </section>
  */