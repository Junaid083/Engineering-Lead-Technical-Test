const vectorStore = require('../rag/vectorStore');
const { generateAnswer } = require('../rag/llm');

async function answerQuestion(question) {
  if (vectorStore.getDocumentCount() === 0) {
    throw new Error('No document has been ingested yet. Please upload a document first.');
  }

  const results = await vectorStore.search(question, 3);
  return generateAnswer(question, results);
}

module.exports = { answerQuestion };
