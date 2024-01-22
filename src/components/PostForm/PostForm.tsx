import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PostForm.css";
import UserContext from "../../context/UserContext";

export const PostForm = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [content, setContent] = useState("");

  useEffect(() => {
    const localData = localStorage.getItem("post");

    if (localData !== null) {
      const storedContent = JSON.parse(localData);
      setContent(storedContent);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      id: 0,
      content: content,
      user,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_ADD_NEW_POST_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Clear post from local storage
    localStorage.setItem("post", JSON.stringify(content));

    // Redirect to homepage
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="post-form-wrapper">
      <div className="user-info">
        <img className="user-avatar" src={user.avatar} alt={user.name} />
        <div className="user-name">{user.name}</div>
      </div>
      <button type="button" className="cancel-button" onClick={handleCancel}>
        &#x2716;
      </button>
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          className="content-input"
          placeholder="Введите текст поста"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit" className="btn publish-button">
          Опубликовать
        </button>
      </form>
    </div>
  );
};
