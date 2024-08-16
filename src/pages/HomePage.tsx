import { useEffect, useState } from 'react';
import api from '../services/api';
import { Container } from '@mui/material';
import Post from '../components/Post';
import LeftNavBar from '../components/LeftNavBar';
import ActivityState from '../components/ActivityState';
import ChatBotButton from '../components/ChatBot';
import './styles/HomePage.css';
import { PostProps } from '../interfaces/PostProps';

const HomePage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await api.get('/post', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API 응답 데이터:', response.data);
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          throw new Error('API 응답이 배열이 아닙니다.');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error('Error fetching posts:', err.message);
        } else {
          setError('An unexpected error occurred');
          console.error('Error fetching posts:', err);
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="homepage-container">
      <LeftNavBar />

      <div className="content-container">
        <Container className="mt-5">
          {error && <div className="text-red-500">Error: {error}</div>}

          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                userId={post.userId}
                username={post.username}
                fullName={post.fullName}
                content={post.content}
                profileUrl={post.profileUrl}
                postUrl={post.postUrl}
                likes={post.likes}
                comments={post.comments}
                timestamp={post.timestamp}
              />
            ))}
          </div>
        </Container>
      </div>

      <ActivityState />

      <ChatBotButton />
    </div>
  );
};

export default HomePage;
