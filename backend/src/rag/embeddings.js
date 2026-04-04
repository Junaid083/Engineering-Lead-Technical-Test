const { pipeline } = require('@huggingface/transformers');

let embedder = null;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
}

async function embed(text) {
  const model = await getEmbedder();
  const output = await model(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

async function embedBatch(texts) {
  const results = [];
  for (const text of texts) {
    results.push(await embed(text));
  }
  return results;
}

module.exports = { embed, embedBatch };
