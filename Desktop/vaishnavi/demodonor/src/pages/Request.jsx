import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const RequestBlood = () => {
    const { requestBlood } = useAppContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: '',
        bloodGroup: '',
        hospital: '',
        location: '',
        urgency: 'Normal',
        contact: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        requestBlood(formData);
        navigate('/');
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="flex-center" style={{ padding: '40px 0', minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '30px' }}>
                <h2 style={{ color: 'var(--primary-red)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle /> Request Blood
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Patient Name</label>
                        <input name="patientName" type="text" className="input-field" onChange={handleChange} required />
                    </div>

                    <div className="grid-cols-2">
                        <div className="input-group">
                            <label className="input-label">Required Blood Group</label>
                            <select name="bloodGroup" className="input-field" onChange={handleChange} required>
                                <option value="">Select Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Urgency Level</label>
                            <select name="urgency" className="input-field" onChange={handleChange} required style={{ color: formData.urgency === 'Critical' ? 'red' : 'inherit' }}>
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Hospital Name</label>
                        <input name="hospital" type="text" className="input-field" onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Location / City</label>
                        <input name="location" type="text" className="input-field" onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Contact Number</label>
                        <input name="contact" type="tel" className="input-field" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', marginTop: '10px' }}>
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestBlood;
