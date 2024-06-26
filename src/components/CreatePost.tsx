import { useState } from 'react';
import './styles/CreatePost.css';

const CreatePost = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');

    const handlePost = () => {
        // 게시물 업로드 로직을 여기에 추가
        console.log('Image URL:', imageUrl);
        console.log('Caption:', caption);
    };

    return (
        <div className="create-post">
            <h2>새 게시물 만들기</h2>
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="이미지 URL"
            />
            <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="캡션"
            />
            <button onClick={handlePost}>게시</button>
        </div>
    );
};

export default CreatePost;
