const express = require('express');
const multer = require('multer');
const { processDocument } = require('../services/documentService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await processDocument(req.file);
    res.json({
      message: 'Document processed successfully',
      ...result,
    });
  } catch (err) {
    console.error('Ingest error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
