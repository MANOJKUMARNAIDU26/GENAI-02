import { Users, UserPlus, Shield, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedPage from '../components/AnimatedPage';
import { sampleUsers } from '../data/sampleData';
import './TeamAccess.css';

export default function TeamAccess() {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Legal Associate');

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail(''); setShowInvite(false);
  };

  const roleColors = { 'Admin': 'high', 'Legal Associate': 'info', 'Compliance Officer': 'medium' };

  return (
    <AnimatedPage>
      <div className="team-page">
        <div className="page-header">
          <div>
            <h1>Team Access</h1>
            <p>Manage team members and permissions</p>
          </div>
          <button className="invite-btn" onClick={() => setShowInvite(!showInvite)}>
            <UserPlus size={16} /> Invite Member
          </button>
        </div>

        {showInvite && (
          <motion.form className="invite-form glass-card" onSubmit={handleInvite}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="invite-fields">
              <div className="invite-field">
                <Mail size={16} className="input-icon" />
                <input type="email" placeholder="colleague@lawfirm.com" value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)} style={{ paddingLeft: '2.4rem' }} />
              </div>
              <select value={inviteRole} onChange={e => setInviteRole(e.target.value)}>
                <option>Legal Associate</option>
                <option>Compliance Officer</option>
                <option>Admin</option>
              </select>
              <button type="submit" className="auth-submit" style={{ width: 'auto', padding: '0.6rem 1.25rem' }}>Send Invite</button>
            </div>
          </motion.form>
        )}

        <div className="team-grid">
          {sampleUsers.map((user, i) => (
            <motion.div key={user.id} className="team-card glass-card"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="team-card-top">
                <div className="team-avatar">{user.avatar}</div>
                <span className={`badge badge-${user.status === 'Active' ? 'low' : 'medium'}`}>{user.status}</span>
              </div>
              <h4>{user.name}</h4>
              <p className="team-email">{user.email}</p>
              <div className="team-card-meta">
                <span className={`badge badge-${roleColors[user.role]}`}><Shield size={10} /> {user.role}</span>
                <span className="team-dept">{user.department}</span>
              </div>
              <span className="team-last-active">Last active: {user.lastActive}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
