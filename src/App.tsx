import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/LeftNavbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import ExplorePage from './pages/ExplorePage';
import MessagesPage from './pages/MessagesPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
