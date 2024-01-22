import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import usePolling from "../../hooks/usePolling";
import { PostList } from "../PostList";

import "./HomePage.css";

export const HomePage = () => {
  const [ data, isLoading, error] = usePolling(
    `${process.env.REACT_APP_ADD_NEW_POST_URL}`
  );

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/posts/new");
  };

  return (
    <div className="homepage">
      <div className="create-btn-wrapper">
        <button className="btn create-post-btn" onClick={onClick}>
          Create new post
        </button>
      </div>

      <div className="post-list-wrapper">
        {isLoading ? (
          <div className="loader">
            <FaSpinner className="spin" />
          </div>
        ) : (
          <>
            <PostList posts={data} />
          </>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
