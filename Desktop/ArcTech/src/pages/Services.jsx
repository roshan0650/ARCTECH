import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
    {
        title: 'Web Development',
        desc: 'Bespoke web applications built for speed, scalability, and performance. We use modern frameworks like React and Vue to deliver responsive experiences.',
        features: ['Custom Web Apps', 'E-commerce Platforms', 'Progressive Web Apps (PWA)', 'API Integration']
    },
    {
        title: 'Mobile App Development',
        desc: 'Native and cross-platform mobile solutions that engage users. From iOS to Android, we build apps that feel premium and robust.',
        features: ['iOS & Android', 'React Native / Flutter', 'App Store Optimization', 'Maintenance & Support']
    },
    {
        title: 'Cloud Solutions',
        desc: 'Secure, scalable, and cost-effective cloud infrastructure. We help you migrate, manage, and optimize your digital assets.',
        features: ['AWS / Azure / Google Cloud', 'DevOps Automation', 'Serverless Architecture', 'Database Management']
    },
    {
        title: 'UI/UX Design',
        desc: 'User-centric design that converts. We craft intuitive interfaces that delight users and simplify complex workflows.',
        features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing']
    },
    {
        title: 'AI & Automation',
        desc: 'Leverage the power of Artificial Intelligence to streamline operations and gain predictive insights.',
        features: ['Machine Learning Models', 'Chatbots & Assistants', 'Process Automation', 'Data Analytics']
    }
];

const process = [
    { step: '01', title: 'Discovery', desc: 'We dive deep into your business goals, user needs, and technical requirements.' },
    { step: '02', title: 'Design', desc: 'We create interactive prototypes and visual systems to align on the look and feel.' },
    { step: '03', title: 'Development', desc: 'Our engineers write clean, scalable code using the latest technologies.' },
    { step: '04', title: 'Launch', desc: 'We deploy your product with rigorous testing and provide ongoing support.' }
];

const Services = () => {
    return (
        <div className="services-page">
            {/* Hero */}
            <section className="section text-center">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Expertise
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ maxWidth: '700px', margin: '24px auto', fontSize: '1.25rem' }}
                    >
                        We provide end-to-end digital solutions tailored to your unique business challenges.
                    </motion.p>
                </div>
            </section>

            {/* Services List */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '24px' }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 style={{ marginBottom: '16px' }}>{service.title}</h3>
                                <p style={{ marginBottom: '24px' }}>{service.desc}</p>
                                <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                                    {service.features.map((f, i) => (
                                        <li key={i} style={{ marginBottom: '8px' }}>{f}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section section-bg">
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '60px' }}>How We Work</h2>
                    <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        {process.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="text-center"
                            >
                                <div style={{ fontSize: '4rem', fontWeight: '700', color: 'rgba(0,0,0,0.05)', marginBottom: '-30px' }}>{p.step}</div>
                                <h3 style={{ position: 'relative' }}>{p.title}</h3>
                                <p style={{ fontSize: '14px', marginTop: '16px' }}>{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section text-center">
                <div className="container">
                    <h2>Have a project in mind?</h2>
                    <div style={{ marginTop: '32px' }}>
                        <Link to="/contact" className="btn btn-primary">Start a Conversation</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
