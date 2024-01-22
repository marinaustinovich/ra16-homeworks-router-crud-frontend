import "./Post.css";
import {
  FaThumbsUp,
  FaComment,
  FaSmile,
  FaStickyNote,
  FaFilm,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import formatTimeAgo from "../../utils/formatTimeAgo";
import { UserType } from "../../context/UserContext";

export type PostType = {
  id: string;
  user: UserType;
  created: number;
  content: string;
};

type Props = {
  post: PostType;
};

export const Post = ({ post }: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className="post" id={post.id} onClick={onClick}>
      <div className="user-info">
        <img
          className="user-avatar"
          src={post.user.avatar}
          alt={post.user.name}
        />
        <div className="user-name">{post.user.name}</div>
      </div>
      <div className="post-time">{formatTimeAgo(post.created)}</div>
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <button className="like-button">
          <FaThumbsUp /> Нравится
        </button>
        <button className="comment-button">
          <FaComment /> Комментировать
        </button>
      </div>
      <div className="add-comment-wrapper">
        <img
          className="user-avatar user-avatar_comment"
          src={post.user.avatar}
          alt={post.user.name}
        />
        <form className="comment-form">
          <input type="text" placeholder="Напишите комментарий" />
          <div className="btn-comment-wrapper">
            <button className="btn-comment smiley-button">
              <FaSmile />
            </button>
            <button className="btn-comment sticker-button">
              <FaStickyNote />
            </button>
            <button className="btn-comment gif-button">
              <FaFilm />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
