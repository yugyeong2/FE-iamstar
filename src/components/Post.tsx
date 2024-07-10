import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import './styles/Post.css';
import { PostData } from '../interfaces/PostData';
import api from '../services/api';

const Post = ({ id, username, fullName, content, profileUrl, postUrl, likes, comments }: PostData) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchIsLiked = async () => {
            try {
                const response = await api.get(`/post/${id}/isLiked`);
                setIsLiked(response.data.isLiked);
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };

        fetchIsLiked();
    }, [id]);

    const handleLike = async () => {
        try {
            if (isLiked) {
                await api.post(`/post/${id}/unlike`);
                setLikeCount(likeCount - 1);
            } else {
                await api.post(`/post/${id}/like`);
                setLikeCount(likeCount + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    return (
        <div className="post-container mx-auto">
            <div className="post-header">
                <img src={profileUrl} alt="profile" className="post-profile-img" />
                <div className="post-user-info">
                    <div className="font-bold text-lg">{username}</div>
                    <div className="text-sm text-gray-500">{fullName}</div>
                </div>
            </div>
            {postUrl && <img src={postUrl} alt="Post" className="post-image" />}
            <div className="post-content">
                <div className="mb-2 text-left">{content}</div>
                <div className="flex items-center mb-2">
                    <Button size="small" className="mr-2" onClick={handleLike}>
                        <img
                            src={isLiked ? 'image/filled_heart.png' : 'image/empty_heart.png'}
                            alt="like"
                            className="like-icon"
                        />
                        좋아요 {likeCount}개
                    </Button>
                    <Button size="small">댓글 {comments.length}개</Button>
                </div>
                <div className="post-comments">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment-item">
                            <div className="font-bold mr-2">{comment.userId}</div>
                            <div>{comment.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Post;
