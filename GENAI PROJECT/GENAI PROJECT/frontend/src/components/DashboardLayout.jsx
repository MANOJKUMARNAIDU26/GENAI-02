import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import './DashboardLayout.css';

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <TopNavbar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
