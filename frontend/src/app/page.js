'use client';

import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Chat from '../components/Chat';

export default function Home() {
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const [docInfo, setDocInfo] = useState(null);

  const handleUploadSuccess = (info) => {
    setDocInfo(info);
    setIsDocumentLoaded(true);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Document Q&A</h1>
        <p style={styles.subtitle}>Upload a document and ask questions about it</p>
      </header>

      <main style={styles.main}>
        <FileUpload onSuccess={handleUploadSuccess} />

        {isDocumentLoaded && (
          <div style={styles.docInfo}>
            <p>Loaded: <strong>{docInfo.filename}</strong> ({docInfo.totalChunks} chunks)</p>
          </div>
        )}

        <Chat disabled={!isDocumentLoaded} />
      </main>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  docInfo: {
    padding: '8px 16px',
    background: '#e8f5e9',
    borderRadius: 6,
    fontSize: 14,
  },
};
