import { useState, useEffect } from 'react';
import './styles/ChatBot.css';
import { TextField, Button } from '@mui/material';
import api from '../services/api';

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    useEffect(() => {
        const ingestPosts = async () => {
            try {
                await api.post('/chatbot/ingestPosts');
                console.log("Posts ingested successfully");
            } catch (error) {
                console.error("Error ingesting posts:", error);
            }
        };

        ingestPosts();
    }, [isOpen]); // ChatBot 컴포넌트가 호출될 때마다 ingestPosts 함수를 실행

    const toggleChatBot = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async () => {
        if (message.trim() === '') return;
        try {
            const response = await api.post('/chatbot/chat', { message });
            const botResponse = typeof response.data === 'object' ? response.data.message : response.data;
            setChatHistory([...chatHistory, { sender: 'user', text: message }, { sender: 'bot', text: botResponse }]);
            setMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div>
            <button className="chatbot-button" onClick={toggleChatBot}>
                💬
            </button>
            
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">ChatBot</div>
                    <div className="chatbot-messages">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={`chatbot-message ${chat.sender}`}>
                                <div className={`chatbot-bubble ${chat.sender}`}>
                                    {chat.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            onKeyDown={handleKeyDown}
                            placeholder="메시지를 입력하세요"
                        />
                        <Button onClick={handleSend} variant="contained" color="primary">전송</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;