import { FaThumbsUp, FaComment } from "react-icons/fa";
import formatTimeAgo from "../../utils/formatTimeAgo";
import usePolling from "../../hooks/usePolling";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";

export const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, isLoading, error] = usePolling(`${process.env.REACT_APP_ADD_NEW_POST_URL}/${id}`);

  if (data === null || isLoading) {
    return (
      <div className="loader">
        <FaSpinner className="spin" />
      </div>
    );
  }

  const { post, created } = data;

  const onChangePost = () => {
    navigate(`/posts/change`);
    localStorage.setItem("postForChange", JSON.stringify(post));
  };

  const onDeletePost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ADD_NEW_POST_URL}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      navigate("/");
    } else {
      console.error("Failed to delete post");
    }
  };

  return (
    <>
      <div className="post" id={post.id}>
        <div className="user-info">
          <img
            className="user-avatar"
            src={post.user.avatar}
            alt={post.user.name}
          />
          <div className="user-name">{post.user.name}</div>
        </div>
        <div className="post-time">{formatTimeAgo(created)}</div>
        <div className="post-content">{post.content}</div>
        <div className="post-actions">
          <button className="like-button">
            <FaThumbsUp /> Нравится
          </button>
          <button className="comment-button">
            <FaComment /> Комментировать
          </button>
        </div>
        <div className="post-changes">
          <button className="btn change-button" onClick={onChangePost}>
            Изменить
          </button>
          <button className="btn delete-button" onClick={onDeletePost}>
            Удалить
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </>
  );
};
