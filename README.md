# GENAI-02
LexiClause AI is a semantic clause retrieval system that uses AI embeddings and FAISS to find the most relevant legal clauses based on user queries.

# LexiClause AI

LexiClause AI is a semantic clause retrieval system that helps users find relevant legal clauses based on the meaning of their query rather than exact keyword matching. It uses sentence embeddings and FAISS similarity search to return the most relevant clauses from a clause dataset, with a FastAPI backend and a modern React/Vite frontend.

## Features

* Semantic search over legal clauses
* SentenceTransformer embeddings for meaning-based retrieval
* FAISS vector index for fast similarity search
* FastAPI backend with a `/search` endpoint
* React + Vite frontend with protected routes
* Login, register, dashboard, document manager, clause search, and settings pages
* Returns the best matching clause along with top related results

## How It Works

1. The clause dataset is loaded from `clauses.csv`.
2. Each clause is converted into an embedding using `sentence-transformers`.
3. Embeddings are stored in a FAISS index for fast retrieval.
4. When a user submits a query, it is also converted into an embedding.
5. FAISS finds the nearest clause vectors.
6. The system returns the most relevant clause and supporting matches.

## Tech Stack

### Backend

* Python
* FastAPI
* Uvicorn
* Pandas
* Sentence-Transformers
* FAISS

### Frontend

* React
* Vite
* React Router
* Framer Motion
* React Hot Toast
* Lucide React
* Recharts

## Project Structure

```text
GENAI PROJECT/
├── app.py
├── clauses.csv
├── requirements.txt
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── styles/
│   └── dist/
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/lexiclause-ai.git
cd lexiclause-ai
```

### 2. Set up the backend

```bash
pip install -r requirements.txt
```

If you prefer a virtual environment:

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

## Running the Project

### Start the backend

From the project root where `app.py` is located:

```bash
uvicorn app:app --reload
```

The backend will usually run at:

```text
http://127.0.0.1:8000
```

### Start the frontend

From the `frontend` folder:

```bash
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173
```

## API Usage

### Search Clauses

**Endpoint:** `POST /search`

**Request body:**

```json
{
  "query": "What happens if a tenant does not pay rent on time?"
}
```

**Response example:**

```json
{
  "answer": "Most relevant clause text here",
  "results": [
    {
      "text": "First matching clause",
      "type": "Clause type"
    },
    {
      "text": "Second matching clause",
      "type": "Clause type"
    },
    {
      "text": "Third matching clause",
      "type": "Clause type"
    }
  ]
}
```

## Example Use Case

A user can ask a legal question such as:

> "What happens if one party breaks the agreement?"

LexiClause AI searches the clause dataset, finds semantically similar clauses, and returns the most relevant legal text even if the exact words do not match.

## Key Components

### `app.py`

Main FastAPI backend file that:

* loads the clause dataset
* creates sentence embeddings
* builds the FAISS index
* exposes the `/search` endpoint

### `clauses.csv`

Contains the clause dataset used for retrieval. Each row includes clause text and clause type.

### `frontend/`

Contains the user interface built with React and Vite.

## Future Improvements

* Add clause explanation generation with an LLM
* Improve ranking using hybrid search
* Support document upload and indexing
* Add citation display for retrieved clauses
* Deploy backend and frontend to cloud hosting

## Limitations

* Retrieval quality depends on the size and quality of the clause dataset
* The current system retrieves clauses rather than generating new legal answers
* Performance depends on the embedding model and FAISS index quality

## Contributing

Contributions are welcome. You can improve the retrieval logic, enhance the frontend UI, add deployment support, or expand the clause dataset.

## License

This project is intended for academic and demonstration purposes. Add a license here if you plan to publish or distribute it publicly.

## Acknowledgement

This project was developed as part of an academic final-year style project using semantic search, AI embeddings, and fast retrieval techniques for clause matching.
