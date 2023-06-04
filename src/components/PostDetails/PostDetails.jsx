import React from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import formatTimeAgo from '../../utils/formatTimeAgo';
import usePolling from '../../hooks/usePolling';
import { FaSpinner } from 'react-icons/fa';
import {  useNavigate, useParams } from 'react-router-dom';
import './PostDetails.css';

export default function PostDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: post, isLoading, error } = usePolling(`${process.env.REACT_APP_ADD_NEW_POST_URL}/${id}`);

    const onChangePost = () => {
        navigate(`/posts/change`);
        localStorage.setItem('postForChange', JSON.stringify(post.post));
    };

    const onDeletePost = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ADD_NEW_POST_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });

                if (!response.ok) {
                    throw new Error('Failed to create post');
                }
            
                navigate('/');
        } catch (error) {
                console.error(error);
        }
    };

    return (
        <>
        {isLoading ? (
            <div className='loader'>
                <FaSpinner className='spin' />
            </div>
        )  : (
        <div className="post" id={post.post.id}>
                <div className="user-info">
                    <img className="user-avatar" src={post.post.user.avatar} alt={post.post.user.name} />
                    <div className="user-name">{post.post.user.name}</div>
                    
                </div>
                <div className="post-time">{formatTimeAgo(post.created)}</div>
                <div className="post-content">{post.post.content}</div>
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
        )}
        {error && <p className='error'>{error}</p>}
        </>
    )
}

