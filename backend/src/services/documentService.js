const pdf = require('pdf-parse');
const { splitIntoChunks } = require('../rag/chunker');
const vectorStore = require('../rag/vectorStore');

async function processDocument(file) {
  let text;

  if (file.mimetype === 'application/pdf') {
    const result = await pdf(file.buffer);
    text = result.text;
  } else {
    text = file.buffer.toString('utf-8');
  }

  if (!text || text.trim().length === 0) {
    throw new Error('Could not extract text from document');
  }

  const chunks = splitIntoChunks(text);

  vectorStore.clear();
  await vectorStore.addDocuments(chunks);

  return {
    filename: file.originalname,
    totalChunks: chunks.length,
    textLength: text.length,
  };
}

module.exports = { processDocument };
