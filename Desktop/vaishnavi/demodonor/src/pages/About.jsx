import React from 'react';

const About = () => {
    return (
        <div style={{ padding: '60px 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 className="text-center" style={{ marginBottom: '40px' }}>About DEMODONOR</h1>

                <div className="card" style={{ padding: '40px', lineHeight: '1.8' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                        <strong>DEMODONOR</strong> is a next-generation blood donation management platform designed to solve the critical issue of blood unavailability during emergencies.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        Our mission is simple: <strong>Bridge the gap between donors and recipients.</strong> By leveraging technology, we create a real-time network where finding a life-saving match takes minutes, not hours.
                    </p>

                    <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Why We Exist</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '30px' }}>
                        <li>To reduce response time in medical emergencies.</li>
                        <li>To create a transparent and verified database of voluntary donors.</li>
                        <li>To raise awareness about the safety and importance of blood donation.</li>
                    </ul>

                    <h3 style={{ marginBottom: '15px' }}>Our Impact</h3>
                    <p>
                        Since our inception, we have facilitated thousands of connections, ensuring that hospitals and patients get the support they need when it matters most. We believe in a future where no life is lost due to a lack of blood.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
