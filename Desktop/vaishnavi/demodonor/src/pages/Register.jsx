import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Heart } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const { registerDonor, googleLogin } = useAppContext();

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        bloodGroup: '',
        mobile: '',
        email: '',
        city: '',
        lastDonation: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate validation
        if (formData.age < 18) {
            alert('You must be at least 18 years old to donate.');
            return;
        }
        registerDonor(formData);
        navigate('/dashboard');
    };

    const handleGoogleLogin = async () => {
        if (await googleLogin()) {
            navigate('/dashboard');
        }
    };

    return (
        <div style={{ padding: '40px 0', backgroundColor: '#f8f9fa' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card" style={{ padding: '40px' }}>
                    <div className="text-center" style={{ marginBottom: '30px' }}>
                        <h2 style={{ color: 'var(--primary-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <Heart fill="var(--primary-red)" /> Donor Registration
                        </h2>
                        <p style={{ color: 'var(--text-muted)' }}>Join our community of life savers.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid-cols-2">
                            <div className="input-group">
                                <label className="input-label">Full Name</label>
                                <input name="fullName" type="text" className="input-field" placeholder="John Doe" onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Age</label>
                                <input name="age" type="number" className="input-field" placeholder="25" onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Blood Group</label>
                                <select name="bloodGroup" className="input-field" onChange={handleChange} required defaultValue="">
                                    <option value="" disabled>Select Group</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Mobile Number</label>
                                <input name="mobile" type="tel" className="input-field" placeholder="+1 234 567 890" onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Email Address</label>
                                <input name="email" type="email" className="input-field" placeholder="email@example.com" onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">City / Location</label>
                                <input name="city" type="text" className="input-field" placeholder="New York" onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Last Donation Date (Optional)</label>
                                <input name="lastDonation" type="date" className="input-field" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Create Password</label>
                                <input name="password" type="password" className="input-field" placeholder="Strong password" onChange={handleChange} required />
                            </div>
                        </div>

                        <div style={{ margin: '20px 0', padding: '15px', background: '#e9ecef', borderRadius: '8px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox" required style={{ width: '18px', height: '18px' }} />
                                <span style={{ fontSize: '0.9rem' }}>I confirm that I am in good health and eligible to donate blood.</span>
                            </label>
                        </div>

                        <div className="flex-between">
                            <Link to="/" style={{ color: 'var(--text-muted)' }}>Cancel</Link>
                            <button type="submit" className="btn btn-primary" style={{ padding: '10px 40px' }}>Register</button>
                        </div>
                    </form>

                    <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
                        <hr style={{ border: 'none', borderTop: '1px solid #e9ecef' }} />
                        <span style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'white',
                            padding: '0 10px',
                            color: 'var(--text-muted)',
                            fontSize: '0.9rem'
                        }}>
                            OR
                        </span>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            className="btn btn-outline"
                            style={{ borderColor: '#dadce0', color: '#3c4043', padding: '10px 20px' }}
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                            Sign up with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
