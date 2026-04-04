// Mock LLM — simulates what a real LLM integration would look like.
// In production, swap this with OpenAI/Anthropic API calls.

function generateAnswer(question, contextChunks) {
  if (!contextChunks || contextChunks.length === 0) {
    return {
      answer: "I couldn't find relevant information in the document to answer your question.",
      sources: [],
    };
  }

  const context = contextChunks.map(c => c.chunk).join('\n\n');

  // In a real implementation, this would be:
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-4',
  //   messages: [
  //     { role: 'system', content: `Answer based on the following context:\n\n${context}` },
  //     { role: 'user', content: question }
  //   ]
  // });

  // Mock: extract key sentences from context that seem relevant
  const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const questionWords = question.toLowerCase().split(/\s+/);

  const relevant = sentences
    .map(s => ({
      text: s.trim(),
      relevance: questionWords.filter(w =>
        s.toLowerCase().includes(w) && w.length > 3
      ).length,
    }))
    .filter(s => s.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);

  let answer;
  if (relevant.length > 0) {
    answer = `Based on the document: ${relevant.map(r => r.text).join('. ')}.`;
  } else if (sentences.length > 0) {
    answer = `Based on the provided context, the document mentions: "${sentences[0]}."`;
  } else {
    answer = `The document contains information related to your query, but I could not extract a specific answer. Context provided: "${context.substring(0, 200)}..."`;
  }

  return {
    answer,
    sources: contextChunks.map(c => ({
      text: c.chunk.substring(0, 150) + '...',
      score: Math.round(c.score * 100) / 100,
    })),
  };
}

module.exports = { generateAnswer };
