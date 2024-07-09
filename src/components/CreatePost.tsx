import React, { useState, ChangeEvent, FormEvent } from 'react';
import api from '../services/api';
import './styles/CreatePost.css';

const CreatePost = () => {
    const [postImage, setPostImage] = useState<File | null>(null);
    const [content, setContent] = useState<string>('');

    const handlePostImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPostImage(event.target.files[0]);
        }
    };

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!postImage) {
            alert('Please select a post image.');
            return;
        }

        const formData = new FormData();
        formData.append('postImage', postImage);
        formData.append('content', content);

        try {
            // Upload the image and get the URL
            const uploadResponse = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { postUrl } = uploadResponse.data;

            // Create the post with the uploaded image URL
            const postResponse = await api.post('/post', {
                postUrl,
                content,
            });

            console.log('Post created:', postResponse.data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-post-form">
            <div className="form-group">
                <label className="form-label">Post Image:</label>
                <input type="file" onChange={handlePostImageChange} className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Content:</label>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    className="form-textarea"
                    rows={4}
                ></textarea>
            </div>
            <button type="submit" className="form-button">
                Create Post
            </button>
        </form>
    );
};

export default CreatePost;
