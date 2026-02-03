import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MapPin, Droplet, Clock, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Availability = () => {
    const { bloodStock } = useAppContext();
    const [filterGroup, setFilterGroup] = useState('');
    const [filterLocation, setFilterLocation] = useState('');

    const filteredStock = bloodStock.filter(item => {
        return (
            (filterGroup === '' || item.type === filterGroup) &&
            (filterLocation === '' || item.location.toLowerCase().includes(filterLocation.toLowerCase()))
        );
    });

    return (
        <div style={{ padding: '40px 0' }}>
            <div className="container">
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h1>Real-time Blood Availability</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Check current stock levels at various locations.</p>
                </div>

                {/* Filters */}
                <div className="card" style={{ marginBottom: '40px', padding: '20px' }}>
                    <div className="grid-cols-3" style={{ alignItems: 'end' }}>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="input-label">Filter by Blood Group</label>
                            <select className="input-field" value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)}>
                                <option value="">All Groups</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="input-label">Search Location</label>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. City Hospital"
                                    style={{ paddingLeft: '35px' }}
                                    value={filterLocation}
                                    onChange={(e) => setFilterLocation(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                                onClick={() => { setFilterGroup(''); setFilterLocation(''); }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="grid-cols-3">
                    {filteredStock.map(item => (
                        <div key={item.id} className="card animate-fade-in" style={{ borderTop: `4px solid ${item.count > 5 ? 'var(--success-color)' : 'var(--error-color)'}` }}>
                            <div className="flex-between" style={{ marginBottom: '15px' }}>
                                <span style={{
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    color: 'var(--primary-red)',
                                    background: '#ffe5e5',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {item.type}
                                </span>
                                <span className={`badge ${item.count > 5 ? 'text-green' : 'text-red'}`} style={{ fontWeight: '600' }}>
                                    {item.count > 0 ? 'Available' : 'Out of Stock'}
                                </span>
                            </div>

                            <h3 style={{ marginBottom: '10px' }}>{item.count} Units</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MapPin size={16} /> {item.location}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Clock size={16} /> Updated: {item.lastUpdated}
                                </div>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <Link to="/request" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                                    Request This
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredStock.length === 0 && (
                    <div className="text-center" style={{ padding: '40px', color: 'var(--text-muted)' }}>
                        <h3>No blood stock found matching your criteria.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Availability;
