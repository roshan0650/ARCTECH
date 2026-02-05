import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data initializer
// Mock data initializer
const INITIAL_USERS = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Member', status: 'Active', joinedAt: '2023-10-15T10:00:00Z' },
    { id: 2, name: 'Alice Smith', email: 'alice@company.com', role: 'Editor', status: 'Active', joinedAt: '2023-12-01T14:30:00Z' },
    { id: 3, name: 'Bob Johnson', email: 'bob@test.com', role: 'Member', status: 'Inactive', joinedAt: new Date(Date.now() - 43200000).toISOString() }, // 12 hours ago (New)
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Member' });

    useEffect(() => {
        // Auth Check
        const isAdmin = localStorage.getItem('adminLoggedIn');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }

        // Load users from local storage or init with defaults
        const savedUsers = localStorage.getItem('adminUsers');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        } else {
            setUsers(INITIAL_USERS);
            localStorage.setItem('adminUsers', JSON.stringify(INITIAL_USERS));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        navigate('/admin');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
            localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
        }
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        const user = {
            id: Date.now(),
            ...newUser,
            status: 'Active',
            joinedAt: new Date().toISOString()
        };
        const updatedUsers = [...users, user];
        setUsers(updatedUsers);
        localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
        setIsAddModalOpen(false);
        setNewUser({ name: '', email: '', role: 'Member' });
    };

    return (
        <div style={{ padding: '40px', background: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <div className="container">
                {/* Header */}
                <div className="flex justify-between items-center" style={{ marginBottom: '40px' }}>
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Manage users and system settings</p>
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="btn"
                            style={{ background: 'white', color: '#d32f2f', border: '1px solid #ffcdcd' }}
                        >
                            But logout
                        </button>
                    </div>
                </div>

                {/* Main Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                >
                    <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                        <h3>Registered Users</h3>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="btn btn-primary"
                        >
                            + Add User
                        </button>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--bg-secondary)', textAlign: 'left' }}>
                                    <th style={{ padding: '16px', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
                                    <th style={{ padding: '16px', fontWeight: '600', color: 'var(--text-secondary)' }}>Email</th>
                                    <th style={{ padding: '16px', fontWeight: '600', color: 'var(--text-secondary)' }}>Role</th>
                                    <th style={{ padding: '16px', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                                    <th style={{ padding: '16px', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid var(--bg-secondary)' }}>
                                        <td style={{ padding: '16px', fontWeight: '500' }}>
                                            {user.name}
                                            {/* New User Badge Logic */}
                                            {new Date(user.joinedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                                                <span style={{
                                                    marginLeft: '8px',
                                                    background: 'var(--accent-violet)',
                                                    color: 'white',
                                                    padding: '2px 8px',
                                                    borderRadius: '8px',
                                                    fontSize: '10px',
                                                    verticalAlign: 'middle',
                                                    fontWeight: '700'
                                                }}>
                                                    NEW
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{user.email}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                background: user.role === 'Admin' ? '#e3f2fd' : 'var(--bg-secondary)',
                                                color: user.role === 'Admin' ? '#1976d2' : 'var(--text-primary)',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px'
                                            }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                color: user.status === 'Active' ? '#2e7d32' : 'var(--text-secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                fontSize: '14px'
                                            }}>
                                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: user.status === 'Active' ? '#4ade80' : '#9ca3af' }}></div>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                style={{ color: '#ef4444', marginRight: '8px' }}
                                                className="btn-text"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ background: 'white', padding: '32px', borderRadius: '24px', width: '400px' }}
                    >
                        <h2 style={{ marginBottom: '24px' }}>Add New User</h2>
                        <form onSubmit={handleAddUser}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
                                <input
                                    required
                                    type="text"
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--divider)' }}
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
                                <input
                                    required
                                    type="email"
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--divider)' }}
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Role</label>
                                <select
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--divider)' }}
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option>Member</option>
                                    <option>Editor</option>
                                    <option>Viewer</option>
                                </select>
                            </div>
                            <div className="flex gap-4 justify-end">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">Add User</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
