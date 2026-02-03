import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { User, Droplet, MapPin, Clock } from 'lucide-react';

const Dashboard = () => {
    const { currentUser, requests } = useAppContext();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div style={{ padding: '40px 0' }}>
            <div className="container">
                <h1 style={{ marginBottom: '30px' }}>Dashboard</h1>

                <div className="grid-cols-3" style={{ alignItems: 'start' }}>

                    {/* Profile Card */}
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: '#e9ecef',
                            borderRadius: '50%',
                            margin: '0 auto 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <User size={50} color="var(--text-muted)" />
                        </div>
                        <h3>{currentUser.name}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{currentUser.role === 'admin' ? 'Administrator' : 'Donor'}</p>

                        {currentUser.role === 'donor' && (
                            <div style={{ textAlign: 'left', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span>Blood Group:</span>
                                    <span style={{ fontWeight: 'bold' }}>{currentUser.bloodGroup || 'O+'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Location:</span>
                                    <span>{currentUser.location || 'Unknown'}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action / Stats Area */}
                    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '30px' }}>

                        {/* Status */}
                        {currentUser.role === 'donor' && (
                            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to right, #457B9D, #1D3557)', color: 'white' }}>
                                <div>
                                    <h3>Availability Status</h3>
                                    <p style={{ opacity: 0.8 }}>You are currently marked as available to donate.</p>
                                </div>
                                <button className="btn" style={{ background: 'white', color: '#1D3557' }}>Change Status</button>
                            </div>
                        )}

                        {/* Requests Feed */}
                        <div>
                            <h2 style={{ marginBottom: '20px' }}>Recent Blood Requests</h2>
                            {requests.length === 0 ? (
                                <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <p>No recent requests in your area.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {requests.map(req => (
                                        <div key={req.id} className="card" style={{ borderLeft: `5px solid ${req.urgency === 'Critical' ? 'red' : 'green'}` }}>
                                            <div className="flex-between">
                                                <h4>{req.hospital}</h4>
                                                <span style={{
                                                    background: req.urgency === 'Critical' ? '#ffe5e5' : '#e5f9f6',
                                                    color: req.urgency === 'Critical' ? 'red' : 'green',
                                                    padding: '5px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {req.urgency}
                                                </span>
                                            </div>
                                            <p style={{ margin: '10px 0' }}>Patient: <strong>{req.patientName}</strong> requires <strong style={{ color: 'var(--primary-red)' }}>{req.bloodGroup}</strong></p>
                                            <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={14} /> {req.location}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> Just now</span>
                                            </div>
                                            <div style={{ marginTop: '15px' }}>
                                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Accept & Donate</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
