const { embedBatch, embed } = require('./embeddings');

class VectorStore {
  constructor() {
    this.chunks = [];
    this.vectors = [];
  }

  async addDocuments(chunks) {
    this.chunks = chunks;
    this.vectors = await embedBatch(chunks);
  }

  async search(query, topK = 3) {
    if (this.chunks.length === 0) return [];

    const queryVec = await embed(query);

    const scores = this.vectors.map((vec, i) => ({
      chunk: this.chunks[i],
      score: cosineSimilarity(queryVec, vec),
      index: i,
    }));

    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter(s => s.score > 0);
  }

  getDocumentCount() {
    return this.chunks.length;
  }

  clear() {
    this.chunks = [];
    this.vectors = [];
  }
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

const store = new VectorStore();

module.exports = store;
