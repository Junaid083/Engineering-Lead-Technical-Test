'use client';

import { useState } from 'react';

export default function Chat({ disabled }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim() || disabled) return;

    const q = question.trim();
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: data.answer,
        sources: data.sources,
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `Error: ${err.message}`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.length === 0 && (
          <p style={styles.placeholder}>
            {disabled
              ? 'Upload a document to start asking questions'
              : 'Ask a question about your document'}
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{
            ...styles.message,
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? '#1976d2' : '#f5f5f5',
            color: msg.role === 'user' ? 'white' : '#333',
          }}>
            <p style={{ margin: 0 }}>{msg.text}</p>
            {msg.sources && msg.sources.length > 0 && (
              <details style={styles.sources}>
                <summary>Sources ({msg.sources.length})</summary>
                {msg.sources.map((s, j) => (
                  <div key={j} style={styles.source}>
                    <span style={styles.score}>Score: {s.score}</span>
                    <p style={styles.sourceText}>{s.text}</p>
                  </div>
                ))}
              </details>
            )}
          </div>
        ))}
        {loading && <p style={styles.loading}>Thinking...</p>}
      </div>

      <form onSubmit={handleAsk} style={styles.form}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          disabled={disabled || loading}
          style={styles.input}
        />
        <button
          type="submit"
          disabled={disabled || loading || !question.trim()}
          style={styles.button}
        >
          Ask
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 16,
    minHeight: 200,
    maxHeight: 400,
    overflowY: 'auto',
  },
  placeholder: {
    color: '#999',
    textAlign: 'center',
    margin: 'auto',
    fontSize: 14,
  },
  message: {
    padding: '10px 14px',
    borderRadius: 8,
    maxWidth: '80%',
    fontSize: 14,
    lineHeight: 1.5,
  },
  sources: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.8,
  },
  source: {
    marginTop: 4,
    padding: '4px 0',
    borderTop: '1px solid rgba(0,0,0,0.1)',
  },
  score: {
    fontWeight: 'bold',
  },
  sourceText: {
    margin: '2px 0 0',
    fontSize: 11,
  },
  loading: {
    color: '#999',
    fontStyle: 'italic',
    fontSize: 13,
  },
  form: {
    display: 'flex',
    borderTop: '1px solid #e0e0e0',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: 'none',
    outline: 'none',
    fontSize: 14,
  },
  button: {
    padding: '12px 24px',
    background: '#1976d2',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
  },
};
