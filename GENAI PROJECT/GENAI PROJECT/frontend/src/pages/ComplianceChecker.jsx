import { useState } from 'react';
import { ShieldCheck, Upload, AlertTriangle, CheckCircle, XCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import './ComplianceChecker.css';

export default function ComplianceChecker() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [stage, setStage] = useState('');

  const runCheck = async () => {
    if (!text.trim()) return;
    setLoading(true); setResult(null);
    const stages = ['Parsing agreement structure...', 'Scanning for mandatory clauses...', 'Analyzing risk language...', 'Generating compliance report...'];
    for (const s of stages) { setStage(s); await new Promise(r => setTimeout(r, 600)); }

    const hasConfidentiality = text.toLowerCase().includes('confidential');
    const hasTermination = text.toLowerCase().includes('terminat');
    const hasLiability = text.toLowerCase().includes('liab');
    const hasIndemnity = text.toLowerCase().includes('indemnif');
    const hasGoverning = text.toLowerCase().includes('governing law') || text.toLowerCase().includes('jurisdiction');
    const hasDispute = text.toLowerCase().includes('dispute') || text.toLowerCase().includes('arbitration');

    const checks = [
      { name: 'Confidentiality Clause', found: hasConfidentiality, mandatory: true },
      { name: 'Termination Clause', found: hasTermination, mandatory: true },
      { name: 'Liability Limitation', found: hasLiability, mandatory: true },
      { name: 'Indemnification', found: hasIndemnity, mandatory: true },
      { name: 'Governing Law', found: hasGoverning, mandatory: true },
      { name: 'Dispute Resolution', found: hasDispute, mandatory: false },
    ];

    const found = checks.filter(c => c.found).length;
    const score = Math.round((found / checks.length) * 100);

    const riskyWords = [];
    const risky = [
      { word: 'unlimited liability', risk: 'Exposes party to uncapped financial risk' },
      { word: 'sole discretion', risk: 'Unilateral decision-making without checks' },
      { word: 'waive all rights', risk: 'Broad waiver may be unenforceable' },
      { word: 'perpetual', risk: 'Indefinite obligations may be challenged' },
    ];
    risky.forEach(r => { if (text.toLowerCase().includes(r.word)) riskyWords.push(r); });

    setResult({ score, checks, riskyWords, wordCount: text.split(/\s+/).length });
    setLoading(false); setStage('');
  };

  const getScoreColor = (s) => s >= 80 ? 'var(--success)' : s >= 50 ? 'var(--warning)' : 'var(--danger)';
  const getScoreLabel = (s) => s >= 80 ? 'Compliant' : s >= 50 ? 'Needs Review' : 'Non-Compliant';

  return (
    <AnimatedPage>
      <div className="compliance-page">
        <div className="page-header">
          <h1>Compliance Checker</h1>
          <p>Scan agreements for missing mandatory clauses, risky wording, and compliance issues</p>
        </div>

        <div className="compliance-layout">
          <div className="compliance-input-panel">
            <h3><FileText size={18} /> Agreement Text</h3>
            <textarea className="compliance-textarea" rows={14} value={text} onChange={e => setText(e.target.value)}
              placeholder="Paste your agreement text here for compliance analysis...&#10;&#10;Tip: Include sections on confidentiality, termination, liability, indemnification, and governing law for best results." />
            <div className="compliance-input-footer">
              <span className="word-count">{text.split(/\s+/).filter(Boolean).length} words</span>
              <button className="auth-submit" onClick={runCheck} disabled={loading || !text.trim()} style={{ width: 'auto', padding: '0.7rem 1.5rem' }}>
                {loading ? <><span className="spinner" /> Scanning...</> : <><ShieldCheck size={16} /> Run Compliance Check</>}
              </button>
            </div>
            {loading && stage && (
              <div className="compliance-processing">
                <div className="pipeline-bar-container"><div className="pipeline-bar" /></div>
                <span className="pipeline-text">{stage}</span>
              </div>
            )}
          </div>

          {result && (
            <motion.div className="compliance-result-panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="compliance-score-card">
                <div className="score-circle" style={{ '--score-color': getScoreColor(result.score) }}>
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-color)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke={getScoreColor(result.score)} strokeWidth="8"
                      strokeDasharray={`${result.score * 3.27} 327`} strokeLinecap="round"
                      transform="rotate(-90 60 60)" style={{ transition: 'stroke-dasharray 1s ease' }} />
                  </svg>
                  <div className="score-text">
                    <span className="score-number" style={{ color: getScoreColor(result.score) }}>{result.score}</span>
                    <span className="score-label">{getScoreLabel(result.score)}</span>
                  </div>
                </div>
              </div>

              <div className="compliance-checks">
                <h4>Mandatory Clause Check</h4>
                {result.checks.map((c, i) => (
                  <div key={i} className={`check-item ${c.found ? 'check-pass' : 'check-fail'}`}>
                    {c.found ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    <span>{c.name}</span>
                    {c.mandatory && !c.found && <span className="badge badge-high">Required</span>}
                  </div>
                ))}
              </div>

              {result.riskyWords.length > 0 && (
                <div className="compliance-risks">
                  <h4><AlertTriangle size={16} /> Risky Wording Detected</h4>
                  {result.riskyWords.map((r, i) => (
                    <div key={i} className="risk-item">
                      <strong>"{r.word}"</strong>
                      <p>{r.risk}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
