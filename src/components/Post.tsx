import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import './styles/Post.css';
import api from '../services/api';
import { Comment } from '../interfaces/Comment';
import { PostProps } from '../interfaces/PostProps';
import { AxiosError } from 'axios';

const Post = ({ id, userId, username, fullName, content, profileUrl, postUrl, likes, comments }: PostProps) => {
    const [likeCount, setLikeCount] = useState<number>(likes);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>('');
    const [commentList, setCommentList] = useState<Comment[]>(comments);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payloadBase64 = token.split('.')[1];
                const decodedPayload: { sub: string } = JSON.parse(atob(payloadBase64));
                setCurrentUser(decodedPayload.sub);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

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

    const handleAddComment = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            console.log(`AddComment: Using token: ${token}`);
            const response = await api.post(`/post/${id}/comment`, { comment: newComment }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCommentList([...commentList, response.data]);
            setNewComment('');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error adding comment:', error.message, error.response?.data);
            } else {
                console.error('Unexpected error adding comment:', error);
            }
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                console.log(`fetchComments: Using token: ${token}`);
                const response = await api.get(`/post/${id}/comments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCommentList(response.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error('Error fetching comments:', error.message, error.response?.data);
                } else {
                    console.error('Unexpected error fetching comments:', error);
                }
            }
        };

        const intervalId = setInterval(fetchComments, 10000000); // 추후에 1000으로 바꾸기

        return () => clearInterval(intervalId);
    }, [id]);

    const handleDeletePost = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            console.log(`DeletePost: Using token: ${token}`);
            await api.delete(`/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Post deleted successfully');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error deleting post:', error.message, error.response?.data);
            } else {
                console.error('Unexpected error deleting post:', error);
            }
        }
    };

    return (
        <div className="mx-auto post-container">
            <div className="post-header">
                <img src={profileUrl} alt="profile" className="post-profile-img" />
                <div className="post-user-info">
                    <div className="text-lg font-bold">{username}</div>
                    <div className="text-sm text-gray-500">{fullName}</div>
                    {currentUser === userId && (
                        <Button size="small" onClick={handleDeletePost}>삭제</Button>
                    )}
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
                            className="like-icon" />
                        좋아요 {likeCount}개
                    </Button>

                    <Button size="small">댓글 {commentList.length}개</Button>
                </div>

                <div className="post-comments">
                    {commentList.map((comment: Comment, index) => (
                        <div key={index} className="comment-item">
                            <div className="mr-2 font-bold">{comment.username}</div>
                            <div>{comment.comment}</div>
                        </div>
                    ))}
                </div>

                <div className="comment-input">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                    />
                    <Button size="small" onClick={handleAddComment}>댓글 추가</Button>
                </div>
            </div>
        </div>
    );
};

export default Post;
