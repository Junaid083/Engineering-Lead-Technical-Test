export const metadata = {
  title: 'Document Q&A',
  description: 'Upload a document and ask questions about it',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
