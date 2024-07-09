import CreatePost from '../components/CreatePost';
import LeftNavBar from '../components/LeftNavBar';
import ActivityStatus from '../components/ActivityState';
import './styles/CreatePostPage.css';

const CreatePostPage = () => {
    return (
        <div className="page-container">
            <LeftNavBar />
            <div className="create-post-container">
                <h2 className="create-post-title">새 게시물 만들기</h2>
                <CreatePost />
            </div>
            <ActivityStatus />
        </div>
    );
};

export default CreatePostPage;
