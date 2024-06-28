import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ExplorePage from './pages/Explore';
import MessagesPage from './pages/MessagesPage';
import CreatePostPage from './pages/CreatePostPage';
// import CollectionPage from './pages/CollectionPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            {/* <Route path="/Collection" element={<CollectionPage />} /> */}
          </Routes>
      </div>
    </Router>
  );
};

export default App;
