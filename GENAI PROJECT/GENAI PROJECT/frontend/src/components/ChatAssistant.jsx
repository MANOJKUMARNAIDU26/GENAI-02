import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatAssistant.css';

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm LexiClause AI Assistant. Ask me anything about legal clauses, contracts, or compliance." }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTyping(true);

    try {
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg }),
      });
      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          setTyping(false);
          setMessages(prev => [...prev, {
            role: 'bot',
            text: data.answer || "I couldn't find a relevant clause for that query.",
            clauses: data.results?.slice(0, 2)
          }]);
        }, 800);
      } else {
        throw new Error('Server error');
      }
    } catch {
      setTimeout(() => {
        setTyping(false);
        setMessages(prev => [...prev, {
          role: 'bot',
          text: "I'm having trouble connecting to the server. Please ensure the backend is running on localhost:8000."
        }]);
      }, 600);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <Bot size={20} />
                <div>
                  <h4>LexiClause AI</h4>
                  <span className="chat-status">Online</span>
                </div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
                  <div className="chat-msg-avatar">
                    {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className="chat-msg-bubble">
                    <p>{msg.text}</p>
                    {msg.clauses && msg.clauses.map((c, j) => (
                      <div key={j} className="chat-clause-ref">
                        <span className="chat-clause-badge">{c.type}</span>
                        <p>{c.text?.substring(0, 80)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="chat-msg chat-msg-bot">
                  <div className="chat-msg-avatar"><Bot size={14} /></div>
                  <div className="chat-msg-bubble chat-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="chat-input-area">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about any legal clause..."
                className="chat-input"
              />
              <button className="chat-send" onClick={handleSend} disabled={!input.trim()}>
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chat-fab"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </>
  );
}
