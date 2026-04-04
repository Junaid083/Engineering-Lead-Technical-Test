const express = require('express');
const cors = require('cors');
const ingestRouter = require('./routes/ingest');
const askRouter = require('./routes/ask');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/ingest', ingestRouter);
app.use('/ask', askRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
