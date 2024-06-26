import PostList from '../components/ChatList';
import './styles/ExplorePage.css';

const ExplorePage = () => {
    return (
        <div className="explore-page">
            <h2>탐색 탭</h2>
            <PostList />
        </div>
    );
};

export default ExplorePage;
