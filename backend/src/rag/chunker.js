const CHUNK_SIZE = 500;
const OVERLAP_CHARS = 100;

function splitIntoChunks(text) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + ' ' + sentence).trim().length > CHUNK_SIZE && current.length > 0) {
      chunks.push(current.trim());
      // keep tail end for overlap between chunks
      current = current.slice(-OVERLAP_CHARS) + ' ' + sentence;
    } else {
      current = current ? current + ' ' + sentence : sentence;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}

module.exports = { splitIntoChunks };
