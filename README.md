## Overview

The goal of this task is to evaluate your ability to design and implement a **small AI-powered backend system**.

We are interested in:

* system design thinking
* backend engineering practices
* practical AI / RAG implementation
* code structure and clarity
* explanation of technical decisions

This task should take **approximately 4–6 hours**.

Do not overengineer the solution.

---

# Task

Build a **Document Question Answering API**.

The system should allow a user to upload a document and ask questions about it.

Example:

```
POST /ask
{
  "question": "What does the document say about refunds?"
}
```

Response:

```
{
  "answer": "The document states that refunds are allowed within 30 days..."
}
```

The answer should be generated **based on the document content**.

---

# Requirements

## Backend

Use one of the following:

* Python (FastAPI / Django)
* Node.js (Express / Fastify / NestJS)

---

## Document Processing

Your system should:

1. Load or ingest a document
2. Split the document into chunks
3. Generate embeddings
4. Store embeddings
5. Retrieve relevant chunks for a query

---

## AI / RAG Pipeline

Implement a simple retrieval pipeline:

```
document → chunk → embeddings → vector search → context → LLM
```

Vector store options:

* FAISS
* in-memory similarity search
* any open-source solution

Avoid services that require paid accounts.

---

## LLM Integration

You may use:

* OpenAI
* Anthropic
* local model
* or a mocked LLM implementation

The goal is to demonstrate **how the pipeline works**.

---

# API Endpoints

Minimum endpoints:

```
POST /ingest
POST /ask
```

### /ingest

Used to load or process a document.

### /ask

Returns an answer based on the document context.

---

# Project Structure

Organize your code clearly.

Example structure:

```
/api
/services
/rag
/models
/utils
```

Good structure and separation of concerns are important.

---

# Deliverables

Submit:

1. A GitHub repository containing your implementation
2. A **README** explaining:

   * how to run the project
   * architecture overview
   * design decisions

Optional but encouraged:

```
ARCHITECTURE.md
```

Explaining:

* system design
* improvements for production scale

---

# Evaluation Criteria

We will evaluate:

### Engineering Quality

* code readability
* modular structure
* good practices

---

### Architecture Thinking

* clear separation of components
* reasonable design decisions

---

### AI System Understanding

* proper retrieval pipeline
* effective context usage

---

### Communication

* clarity of documentation
* explanation of decisions

---

# Bonus (Optional)

You may optionally include:

* simple frontend UI
* streaming responses
* caching
* Docker setup
* improved retrieval strategies

These are **not required**.

---

# Instructions

1. Fork this repository
2. Complete the task in your fork
3. Submit the link to your repository to HR

Please **do not open a pull request to this repository**.

---

# Notes

The goal is not to build a production-ready system, but to demonstrate **clear engineering thinking and clean implementation**.

Focus on **quality and clarity rather than complexity**.
