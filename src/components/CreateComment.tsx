import React, { useState } from 'react';
import api from '../services/api';
import { Comment } from '../interfaces/Comment';

interface CreateCommentProps {
    postId: string;
    onCommentAdded: (comment: Comment) => void;
}

const CreateComment = ({ postId, onCommentAdded }: CreateCommentProps) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment.trim() === '') return;

        try {
            const username = localStorage.getItem('username'); // 현재 로그인한 사용자의 username을 가져옴
            const response = await api.post(`/post/${postId}/comment`, { username, comment });
            onCommentAdded(response.data);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-comment-form">
            <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요"
                rows={3}
                className="comment-textarea"
            ></textarea>
            <button type="submit" className="comment-submit-button">댓글 달기</button>
        </form>
    );
};

export default CreateComment;
