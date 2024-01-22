import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { PostType } from "../Post";

import "./ChangeCard.css";

export const ChangeCard = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [changedPost, setChangedPost] = useState<PostType | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const localData = localStorage.getItem("postForChange");

    if (localData !== null) {
      const storedContent = JSON.parse(localData);
      setChangedPost(storedContent);
      setContent(storedContent.content);
    }
  }, []);

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (changedPost) {
      const post = {
        id: changedPost.id,
        content,
        user,
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_ADD_NEW_POST_URL}/${changedPost.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create post");
        }

        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="post-form-wrapper post-form-wrapper-change">
      <div className="change-close-button">
        <div className="change-title">Редактировать публикацию</div>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          &#x2716;
        </button>
      </div>

      <div className="user-info">
        <img className="user-avatar" src={user.avatar} alt={user.name} />
        <div className="user-name">{user.name}</div>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          className="content-input"
          placeholder="Введите текст поста"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit" className="btn publish-button">
          Сохранить
        </button>
      </form>
    </div>
  );
};
