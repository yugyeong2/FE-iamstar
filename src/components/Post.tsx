import './styles/Post.css';

interface PostProps {
    username: string;
    imageUrl: string;
    likes: number;
    comments: string[];
}

const Post = ({ username, imageUrl, likes, comments }: PostProps) => {
    return (
        <div className="post">
            <div className="post-header">
                <span>{username}</span>
            </div>
            <img src={imageUrl} alt="post" className="post-image" />
            <div className="post-actions">
                <img src="image/heart.pngs"></img>
                <button>좋아요 {likes}</button>
                <button>댓글 달기</button>
                <button>저장</button>
            </div>
            <div className="post-comments">
                {comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                ))}
            </div>
        </div>
    );
};

export default Post;
