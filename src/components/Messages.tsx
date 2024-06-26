import { useState } from 'react';
import './styles/Messages.css';

const Messages = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div className="messages">
            <div className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메시지 입력"
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
};

export default Messages;
