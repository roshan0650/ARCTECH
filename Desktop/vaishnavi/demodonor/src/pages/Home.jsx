import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, Users, Search, ChevronRight, Phone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Home = () => {
    const { stats } = useAppContext();

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                padding: '100px 0',
                background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
                textAlign: 'center'
            }}>
                <div className="container animate-fade-in">
                    <span style={{
                        color: 'var(--primary-red)',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        background: 'rgba(230, 57, 70, 0.1)',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        marginBottom: '20px',
                        display: 'inline-block'
                    }}>
                        Lifesaving Connection
                    </span>
                    <h1 style={{ fontSize: '3.5rem', margin: '20px 0', color: 'var(--dark-blue)', letterSpacing: '-1px' }}>
                        Donate Blood, <span style={{ color: 'var(--primary-red)' }}>Save a Life</span>.
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px' }}>
                        Every drop counts. Join the DEMODONOR community to save lives or find blood in times of emergency. Simple, fast, and secure.
                    </p>
                    <div className="flex-center" style={{ gap: '20px' }}>
                        <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
                            Register as Donor <Heart size={20} style={{ marginLeft: '10px' }} />
                        </Link>
                        <Link to="/availability" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
                            Find Blood <Search size={20} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ padding: '60px 0', background: 'white' }}>
                <div className="container">
                    <div className="grid-cols-3">
                        <StatCard
                            icon={<Users size={30} color="var(--primary-blue)" />}
                            count={stats.donorsRegistered}
                            label="Donors Registered"
                        />
                        <StatCard
                            icon={<Activity size={30} color="var(--primary-red)" />}
                            count={stats.bloodUnits}
                            label="Blood Units Available"
                        />
                        <StatCard
                            icon={<Heart size={30} color="#D00000" />}
                            count={stats.livesImpacted}
                            label="Lives Impacted"
                        />
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '50px' }}>How It Works</h2>
                    <div className="grid-cols-3">
                        <StepCard
                            number="01"
                            title="Register"
                            desc="Sign up as a donor quickly. Enter your details and health status securey."
                        />
                        <StepCard
                            number="02"
                            title="Find / Donate"
                            desc="Search for blood availability or receive requests from those in need nearby."
                        />
                        <StepCard
                            number="03"
                            title="Connect & Save"
                            desc="Connect directly with the hospital or patient and perform the life-saving act."
                        />
                    </div>
                </div>
            </section>

            {/* Emergency Callout */}
            <section style={{ padding: '80px 0', backgroundColor: 'var(--primary-red)', color: 'white' }}>
                <div className="container text-center">
                    <h2 style={{ color: 'white', marginBottom: '20px' }}>In an Emergency?</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: '0.9' }}>
                        We are here to help. Request blood immediately and alert all nearby donors.
                    </p>
                    <div className="flex-center" style={{ gap: '20px' }}>
                        <Link to="/request" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary-red)' }}>
                            Request Blood Now
                        </Link>
                        <Link to="/contact" className="btn" style={{ border: '2px solid white', color: 'white' }}>
                            <Phone size={18} /> Contact Support
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper Components
const StatCard = ({ icon, count, label }) => (
    <div className="card text-center" style={{ padding: '40px 20px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ marginBottom: '15px' }}>{icon}</div>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '5px', color: 'var(--dark-blue)' }}>{count}+</h3>
        <p style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
);

const StepCard = ({ number, title, desc }) => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '4rem', opacity: '0.1', color: 'var(--dark-blue)', lineHeight: '1' }}>{number}</h1>
        <h3 style={{ margin: '-20px 0 15px', position: 'relative' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)' }}>{desc}</p>
    </div>
);

export default Home;
