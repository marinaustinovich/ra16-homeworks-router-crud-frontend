import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';
import './PostList.css';

function PostList(props) {
    const { posts } = props;
    
    return (
        <div>
            {posts.map((post) => <Post key={post.id} post={post}></Post>)}
        </div>
    )
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            created:  PropTypes.number.isRequired,
            user: PropTypes.object.isRequired,
        })
    ).isRequired
}

export default PostList
