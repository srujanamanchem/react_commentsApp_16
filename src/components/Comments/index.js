import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem/index'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    username: '',
    userComment: '',
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  likeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        key={eachComment.id}
        deleteComment={this.deleteComment}
        likeComment={this.likeComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()

    const {username, userComment} = this.state
    const initialBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: username,
      comment: userComment,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBackgroundClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      userComment: '',
    }))
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangeUserComment = event => {
    this.setState({
      userComment: event.target.value,
    })
  }

  render() {
    const {username, userComment, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="user-comments-card">
          <h1 className="heading">Comments</h1>
          <div className="user-container">
            <form
              className="user-comment-container"
              onSubmit={this.onAddComment}
            >
              <p className="text">Say something about 4.0 technologies</p>

              <input
                type="text"
                className="user-input"
                onChange={this.onChangeUsername}
                value={username}
                placeholder="Your Name"
              />
              <br />
              <textarea
                rows="6"
                value={userComment}
                className="user-input"
                placeholder="Your Comment"
                onChange={this.onChangeUserComment}
              />
              <button type="submit" className="submit-btn">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
          <hr className="line" />
          <div className="comments-count-container">
            <p className="comment">
              <span className="comments-count">{commentsList.length}</span>
              Comments
            </p>
          </div>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
