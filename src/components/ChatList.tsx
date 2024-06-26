import Post from './Post';
import './styles/ChatList.css';

const ChatList = () => {
    const chats = [
        {
            username: 'user1',
            imageUrl: 'https://via.placeholder.com/150',
            likes: 100,
            comments: ['Great post!', 'Nice picture!']
        },
        {
            username: 'user2',
            imageUrl: 'https://via.placeholder.com/150',
            likes: 50,
            comments: ['Awesome!', 'Cool!']
        }
    ];

    return (
        <div className="chat-list">
            {chats.map((chat, index) => (
                <Post
                    key={index}
                    username={chat.username}
                    imageUrl={chat.imageUrl}
                    likes={chat.likes}
                    comments={chat.comments}
                />
            ))}
        </div>
    );
};

export default ChatList;
