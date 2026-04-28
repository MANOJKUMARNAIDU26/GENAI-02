import { useState } from 'react';
import { GitCompare, AlertTriangle, Shield, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { sampleClauses } from '../data/sampleData';
import './ClauseComparator.css';

export default function ClauseComparator() {
  const [clauseA, setClauseA] = useState('');
  const [clauseB, setClauseB] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectA, setSelectA] = useState('');
  const [selectB, setSelectB] = useState('');

  const handleSelectA = (id) => {
    setSelectA(id);
    const c = sampleClauses.find(x => x.id === Number(id));
    if (c) setClauseA(c.text);
  };
  const handleSelectB = (id) => {
    setSelectB(id);
    const c = sampleClauses.find(x => x.id === Number(id));
    if (c) setClauseB(c.text);
  };

  const compare = async () => {
    if (!clauseA.trim() || !clauseB.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    const wordsA = new Set(clauseA.toLowerCase().split(/\s+/));
    const wordsB = new Set(clauseB.toLowerCase().split(/\s+/));
    const common = [...wordsA].filter(w => wordsB.has(w)).length;
    const similarity = Math.round((common / Math.max(wordsA.size, wordsB.size)) * 100);

    setResult({
      similarity,
      riskLevel: similarity > 70 ? 'Low' : similarity > 40 ? 'Medium' : 'High',
      differences: [
        { type: 'scope', desc: clauseA.length > clauseB.length ? 'Clause A has broader scope and more detailed language' : 'Clause B has broader scope and more detailed language' },
        { type: 'protection', desc: 'Different levels of party protection and obligation structure' },
        { type: 'enforcement', desc: 'Variation in enforcement mechanisms and remedies available' },
      ],
      missing: similarity < 60 ? ['Liability cap specification', 'Dispute resolution mechanism', 'Termination notice period'] : ['Minor formatting differences'],
    });
    setLoading(false);
  };

  return (
    <AnimatedPage>
      <div className="comparator-page">
        <div className="page-header">
          <h1>Clause Comparator</h1>
          <p>Compare two clauses side-by-side to identify differences and risks</p>
        </div>

        <div className="compare-grid">
          <div className="compare-panel">
            <div className="compare-panel-header">
              <h3>Clause A</h3>
              <select value={selectA} onChange={e => handleSelectA(e.target.value)} className="compare-select">
                <option value="">Select from library...</option>
                {sampleClauses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <textarea className="compare-textarea" placeholder="Paste or select a clause..." value={clauseA}
              onChange={e => setClauseA(e.target.value)} rows={8} />
          </div>

          <div className="compare-center">
            <button className="compare-btn" onClick={compare} disabled={loading || !clauseA.trim() || !clauseB.trim()}>
              {loading ? <span className="spinner" /> : <GitCompare size={20} />}
            </button>
          </div>

          <div className="compare-panel">
            <div className="compare-panel-header">
              <h3>Clause B</h3>
              <select value={selectB} onChange={e => handleSelectB(e.target.value)} className="compare-select">
                <option value="">Select from library...</option>
                {sampleClauses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <textarea className="compare-textarea" placeholder="Paste or select a clause..." value={clauseB}
              onChange={e => setClauseB(e.target.value)} rows={8} />
          </div>
        </div>

        {result && (
          <motion.div className="compare-results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="compare-summary">
              <div className="compare-stat">
                <span className="compare-stat-value">{result.similarity}%</span>
                <span className="compare-stat-label">Similarity</span>
              </div>
              <div className="compare-stat">
                <span className={`compare-risk badge badge-${result.riskLevel.toLowerCase()}`}>{result.riskLevel} Risk</span>
                <span className="compare-stat-label">Risk Level</span>
              </div>
            </div>

            <div className="compare-details">
              <div className="compare-detail-section">
                <h4><AlertTriangle size={16} /> Key Differences</h4>
                {result.differences.map((d, i) => (
                  <div key={i} className="compare-diff-item">
                    <span className="diff-type">{d.type}</span>
                    <p>{d.desc}</p>
                  </div>
                ))}
              </div>

              <div className="compare-detail-section">
                <h4><Shield size={16} /> Missing Protections</h4>
                <ul className="missing-list">
                  {result.missing.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
}
