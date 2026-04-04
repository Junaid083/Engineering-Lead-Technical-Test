const express = require('express');
const { answerQuestion } = require('../services/qaService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const result = await answerQuestion(question);
    res.json(result);
  } catch (err) {
    console.error('Ask error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
