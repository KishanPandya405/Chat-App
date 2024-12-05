import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig'; // Import Firebase database
import { ref, onValue, push } from 'firebase/database'; // Import Firebase methods
import '../Styles/ChatRoom.css'

const ChatRoom = ({ user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    // Fetch messages from Firebase
    useEffect(() => {
        const messagesRef = ref(database, 'messages/');
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMessages(Object.values(data));
            }
        });
    }, []);

    const handleSendMessage = () => {
        if (message.trim() === '') return;
    
        // Check if user is defined and get sender name
        const sender = user ? (user.displayName || user.email) : 'Anonymous'; // Fallback to 'Anonymous' if user is not defined
    
        // Send message to Firebase
        push(ref(database, 'messages/'), {
            text: message,
            sender: sender,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
    
        setMessage(''); // Clear input after sending
        setIsTyping(false); // Reset typing state
    };
    
      
      

    const handleTyping = (e) => {
        setMessage(e.target.value);
        setIsTyping(e.target.value !== '');
    };

    return (
        <div className="chat-app-container">
            <div className="chat-header">
                <h2>Chat Room</h2>
            </div>
            <div className="messages-container">
            {messages.map((msg, index) => (
    <div
        key={index}
        className={`message ${msg.sender === (user?.displayName || user?.email) ? 'own-message' : ''}`}
    >
        <div className="message-bubble">
            <p className="sender-name">{msg.sender || 'Anonymous'}</p> {/* Fallback to 'Anonymous' */}
            <p>{msg.text}</p>
            <span className="message-time">{msg.timestamp}</span>
        </div>
    </div>
))}


            </div>

            <div className="typing-indicator">
                {isTyping ? <p>Typing...</p> : null}
            </div>
            <div className="message-input-container">
                <input
                    type="text"
                    value={message}
                    onChange={handleTyping}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button onClick={handleSendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
