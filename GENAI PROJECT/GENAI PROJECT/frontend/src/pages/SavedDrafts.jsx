import { FileText, Download, Trash2, Eye, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedPage from '../components/AnimatedPage';
import { sampleDrafts } from '../data/sampleData';
import './SavedDrafts.css';

export default function SavedDrafts() {
  const statusColors = { 'Final': 'low', 'Draft': 'info', 'Under Review': 'medium' };

  return (
    <AnimatedPage>
      <div className="saved-page">
        <div className="page-header">
          <h1>Saved Drafts</h1>
          <p>Manage your AI-generated agreement drafts</p>
        </div>

        <div className="drafts-list">
          {sampleDrafts.map((draft, i) => (
            <motion.div key={draft.id} className="draft-item glass-card"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="draft-item-left">
                <FileText size={20} className="draft-item-icon" />
                <div className="draft-item-info">
                  <h4>{draft.title}</h4>
                  <div className="draft-item-meta">
                    <span className={`badge badge-${statusColors[draft.status]}`}>{draft.status}</span>
                    <span className="badge badge-accent">{draft.type}</span>
                    <span className="draft-meta-text"><Clock size={11} /> {draft.createdDate}</span>
                  </div>
                  <p className="draft-parties">{draft.parties} · {draft.duration} · {draft.jurisdiction}</p>
                </div>
              </div>
              <div className="draft-item-actions">
                <button className="doc-action" title="Preview" onClick={() => toast.success('Opening preview...')}><Eye size={14} /></button>
                <button className="doc-action" title="Download" onClick={() => toast.success('Downloading...')}><Download size={14} /></button>
                <button className="doc-action doc-action-danger" title="Delete" onClick={() => toast.success('Draft deleted')}><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
