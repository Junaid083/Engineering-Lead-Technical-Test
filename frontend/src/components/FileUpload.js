'use client';

import { useState, useRef } from 'react';

export default function FileUpload({ onSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleUpload = async () => {
    const file = fileRef.current?.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.txt,.md"
        style={styles.input}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={styles.button}
      >
        {uploading ? 'Processing...' : 'Upload & Process'}
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: 20,
    border: '2px dashed #ccc',
    borderRadius: 8,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    background: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
  },
  error: {
    color: '#d32f2f',
    marginTop: 8,
    fontSize: 13,
  },
};
