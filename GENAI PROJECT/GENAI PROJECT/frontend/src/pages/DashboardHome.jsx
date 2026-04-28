import { Search, Upload, ArrowRight, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import './DashboardHome.css';

export default function DashboardHome() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('lexiclause-auth') || '{}');

  const quickActions = [
    { label: 'Search Clauses', icon: Search, path: '/search', desc: 'Search your clause dataset using semantic similarity' },
    { label: 'Upload Document', icon: Upload, path: '/documents', desc: 'Upload legal documents for analysis' },
  ];

  return (
    <AnimatedPage>
      <div className="dashboard-home">
        <div className="dashboard-welcome">
          <div>
            <h1>Welcome, {user.name || 'User'}</h1>
            <p>Your legal clause retrieval workspace is ready.</p>
          </div>
        </div>

        <div className="about-card glass-card">
          <div className="about-header">
            <Scale size={24} className="about-icon" />
            <h2>LexiClause AI — Legal Drafting Intelligence System</h2>
          </div>
          <p className="about-desc">
            An organization stores contract templates and legal clause libraries in text documents. 
            Legal teams need to quickly retrieve relevant clauses while drafting new agreements. 
            This system indexes legal clause documents and generates responses grounded <strong>only in retrieved clauses</strong> 
            using semantic search and vector embeddings.
          </p>
          <div className="tech-badges">
            <span className="badge badge-accent">Python</span>
            <span className="badge badge-accent">FastAPI</span>
            <span className="badge badge-accent">FAISS Vector DB</span>
            <span className="badge badge-accent">Sentence Transformers</span>
            <span className="badge badge-accent">React.js</span>
          </div>
          <div className="how-it-works">
            <h3>How It Works</h3>
            <div className="steps">
              <div className="step"><span className="step-num">1</span><div><strong>Index</strong><p>Legal clauses from clauses.csv are encoded into vector embeddings using Sentence Transformers</p></div></div>
              <div className="step"><span className="step-num">2</span><div><strong>Search</strong><p>User enters a natural language query which is encoded into the same vector space</p></div></div>
              <div className="step"><span className="step-num">3</span><div><strong>Retrieve</strong><p>FAISS finds the top 3 closest clauses using L2 distance similarity</p></div></div>
              <div className="step"><span className="step-num">4</span><div><strong>Analyze</strong><p>Results are ranked, compared, and the best match is highlighted with analysis</p></div></div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Get Started</h2>
          <div className="quick-actions-grid">
            {quickActions.map((a, i) => (
              <motion.button key={i} className="quick-action-card glass-card" onClick={() => navigate(a.path)}
                whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <div className="qa-icon"><a.icon size={22} /></div>
                <div className="qa-info">
                  <h4>{a.label}</h4>
                  <p>{a.desc}</p>
                </div>
                <ArrowRight size={16} className="qa-arrow" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
