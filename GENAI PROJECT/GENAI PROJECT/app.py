import pandas as pd
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="LexiClause AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Initializing LexiClause models...")
try:
    df = pd.read_csv("clauses.csv")
    documents = df["clause_text"].tolist()
    metadata = df["clause_type"].tolist()
    
    model = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = model.encode(documents)
    
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings))
    print("Models initialized successfully!")
except Exception as e:
    print(f"Error initializing models: {e}")
    documents, metadata, model, index = [], [], None, None

class SearchQuery(BaseModel):
    query: str

@app.post("/search")
def search_clauses(request: SearchQuery):
    if not model or not index:
        raise HTTPException(status_code=500, detail="Model or index not loaded")
        
    query_vec = model.encode([request.query])
    k = 3
    distances, indices = index.search(np.array(query_vec), k)
    
    results = []
    for idx in indices[0]:
        results.append({
            "text": documents[idx],
            "type": metadata[idx]
        })
        
    answer = results[0]["text"] if results else "I cannot answer based on the provided clauses."
    
    return {
        "answer": answer,
        "results": results
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)