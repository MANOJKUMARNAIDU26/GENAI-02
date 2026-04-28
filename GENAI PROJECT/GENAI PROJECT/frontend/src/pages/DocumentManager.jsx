import { useState, useRef } from 'react';
import { Upload, FileText, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedPage from '../components/AnimatedPage';
import './DocumentManager.css';

export default function DocumentManager() {
  const [documents, setDocuments] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef(null);

  const handleUpload = (files) => {
    if (!files || !files.length) return;
    const file = files[0];
    const validTypes = ['.pdf', '.docx', '.txt', '.doc', '.csv'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!validTypes.includes(ext)) {
      toast.error('Unsupported file type. Use PDF, DOCX, TXT, or CSV.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          const newDoc = {
            id: Date.now(), name: file.name,
            format: ext.replace('.', '').toUpperCase(),
            size: file.size > 1048576 ? (file.size / 1048576).toFixed(1) + ' MB' : (file.size / 1024).toFixed(0) + ' KB',
            uploadDate: new Date().toLocaleDateString(),
            status: 'Uploaded',
          };
          setDocuments(prev => [newDoc, ...prev]);
          toast.success(`${file.name} uploaded successfully!`);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const removeDoc = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    toast.success('Document removed');
  };

  return (
    <AnimatedPage>
      <div className="docs-page">
        <div className="page-header">
          <h1>Upload Documents</h1>
          <p>Upload legal documents (PDF, DOCX, TXT, CSV) for clause analysis and indexing</p>
        </div>

        <div className={`upload-zone ${dragOver ? 'upload-zone-active' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
          onClick={() => !uploading && fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" hidden accept=".pdf,.docx,.txt,.doc,.csv" onChange={e => handleUpload(e.target.files)} />
          {uploading ? (
            <div className="upload-progress">
              <div className="progress-bar-outer">
                <motion.div className="progress-bar-inner" style={{ width: `${Math.min(uploadProgress, 100)}%` }} />
              </div>
              <span>{Math.min(Math.round(uploadProgress), 100)}% — Uploading...</span>
            </div>
          ) : (
            <>
              <Upload size={36} className="upload-icon" />
              <p>Drag & drop files here or <span>browse</span></p>
              <span className="upload-hint">Supports PDF, DOCX, TXT, CSV — Max 50MB</span>
            </>
          )}
        </div>

        <div className="dataset-note">
          <AlertCircle size={14} />
          <span>Your main clause dataset is <strong>clauses.csv</strong> which is already indexed by the backend. Upload additional documents here for reference.</span>
        </div>

        {documents.length > 0 && (
          <>
            <h3 className="docs-list-title">Uploaded Documents ({documents.length})</h3>
            <div className="docs-list">
              {documents.map((doc, i) => (
                <motion.div key={doc.id} className="doc-item glass-card"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <FileText size={20} className="doc-item-icon" />
                  <div className="doc-item-info">
                    <h4>{doc.name}</h4>
                    <span>{doc.format} · {doc.size} · {doc.uploadDate}</span>
                  </div>
                  <span className="badge badge-low"><CheckCircle size={10} /> {doc.status}</span>
                  <button className="doc-remove-btn" onClick={() => removeDoc(doc.id)}>
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {documents.length === 0 && (
          <div className="docs-empty">
            <FileText size={32} />
            <p>No documents uploaded yet</p>
            <span>Your indexed clause data is in clauses.csv</span>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
