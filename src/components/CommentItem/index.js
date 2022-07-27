import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, deleteComment, likeComment} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const surname = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)

  const onClickLikeButton = () => {
    likeComment(id)
  }

  const onDeleteComment = () => {
    deleteComment(id)
  }
  return (
    <li className="comment-item">
      <div className="name-container">
        <p className={`surname ${initialClassName}`}>{surname}</p>
        <div className="name-comment-container">
          <div className="name-time-container">
            <p className="name">{name}</p>
            <p className="posted-time">{postedTime} ago</p>
          </div>
          <p className="comment-text">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-icon" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLikeButton}
          >
            Like
          </button>
        </div>
        <button
          className="delete-button"
          type="button"
          onClick={onDeleteComment}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
