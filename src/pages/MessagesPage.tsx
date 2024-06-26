import { useState } from 'react';
import './styles/MessagesPage.css';

const MessagesPage = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div className="messages-page">
            <div className="messages">
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지 입력"
            />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
};

export default MessagesPage;
