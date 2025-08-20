import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Admin.css";
import { useAuth } from "../hooks/useAuth";

const Admin: React.FC = () => {
    const { permissionLevel, logout, loading } = useAuth();

    if (loading) return (
      <div className="admin-loading" aria-label="Authorizing">
        <div className="simple-spinner" />
      </div>
    );

    // If no permission level after loading finished, the hook will have navigated away.
    // Return null to avoid flashing content.
    if (permissionLevel === null) return null;
    
  return (

    <div className="admin-page">
      <Navbar permissionLevel={permissionLevel} logout={logout} />
      <main className="admin-main">
        <div className="admin-grid">
          <section className="admin-card span-2">
            <h2 className="admin-card-title">
              <i className="bi bi-speedometer2" /> System Overview
            </h2>
            <div className="metrics-row">
              <div className="metric">
                <span className="metric-label">Uptime</span>
                <span className="metric-value">3d 14h</span>
              </div>
              <div className="metric">
                <span className="metric-label">API Latency</span>
                <span className="metric-value">122 ms</span>
              </div>
              <div className="metric">
                <span className="metric-label">Active Sessions</span>
                <span className="metric-value">2</span>
              </div>
              <div className="metric">
                <span className="metric-label">CPU Load</span>
                <span className="metric-value">18%</span>
              </div>
            </div>
          </section>

          <section className="admin-card">
            <h2 className="admin-card-title">
              <i className="bi bi-list-check" /> Quick Actions
            </h2>
            <div className="actions-list">
              <button className="action-btn">
                <i className="bi bi-arrow-repeat" /> Restart Service
              </button>
              <button className="action-btn">
                <i className="bi bi-hdd-network" /> Clear Cache
              </button>
              <button className="action-btn">
                <i className="bi bi-database-down" /> Backup DB
              </button>
              <button className="action-btn" disabled>
                <i className="bi bi-shield-lock" /> Rotate Keys
              </button>
            </div>
          </section>

            <section className="admin-card">
              <h2 className="admin-card-title">
                <i className="bi bi-clock-history" /> Recent Logs
              </h2>
              <ul className="logs-list">
                <li><span className="log-time">12:04:11</span> Auth success for user admin</li>
                <li><span className="log-time">11:58:02</span> Scheduled backup completed</li>
                <li><span className="log-time">11:40:33</span> Spotify sync ran (5 tracks)</li>
                <li><span className="log-time">11:05:17</span> New contact form submission</li>
                <li><span className="log-time">10:12:49</span> Health check OK</li>
              </ul>
            </section>

          <section className="admin-card span-2 chart-card">
            <h2 className="admin-card-title">
              <i className="bi bi-activity" /> Traffic (Mock)
            </h2>
            <div className="fake-chart">
              <div className="bar" style={{height: '35%'}} />
              <div className="bar" style={{height: '60%'}} />
              <div className="bar" style={{height: '50%'}} />
              <div className="bar" style={{height: '75%'}} />
              <div className="bar" style={{height: '40%'}} />
              <div className="bar" style={{height: '65%'}} />
              <div className="bar" style={{height: '55%'}} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
