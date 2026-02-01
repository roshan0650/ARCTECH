import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'FinEdge Banking App',
        category: 'Fintech',
        description: 'A complete overhaul of a legacy banking application with modern security and UX.',
        tech: ['React Native', 'Node.js', 'AWS'],
        details: 'This project involved migrating 5 million users to a new platform with zero downtime. Features include biometric login, real-time transaction tracking, and AI-driven insights.'
    },
    {
        id: 2,
        title: 'HealthHub Portal',
        category: 'Healthcare',
        description: 'Patient management system for a national hospital chain.',
        tech: ['Next.js', 'PostgreSQL', 'Docker'],
        details: 'Streamlined patient intake by 40%. compliant with HIPAA regulations. Integrated with legacy EMR systems.'
    },
    {
        id: 3,
        title: 'EcoTrack Dashboard',
        category: 'IoT / Energy',
        description: 'Real-time energy monitoring for industrial facilities.',
        tech: ['Vue.js', 'Python', 'InfluxDB'],
        details: 'Handles millions of data points per second. Provides predictive maintenance alerts using machine learning models.'
    },
    {
        id: 4,
        title: 'ShopScale E-commerce',
        category: 'Retail',
        description: 'Headless e-commerce solution for a fashion brand.',
        tech: ['Shopify Plus', 'React', 'GraphQL'],
        details: 'Increased conversion rate by 25% through improved performance and localized checkout experiences.'
    }
];

const Portfolio = () => {
    const [expandedId, setExpandedId] = useState(null);

    return (
        <div className="portfolio-page">
            <section className="section text-center">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Selected Works
                    </motion.h1>
                    <p>We build things that matter.</p>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '24px',
                                    padding: '32px',
                                    cursor: 'pointer',
                                    overflow: 'hidden'
                                }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div layout>
                                    <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
                                        {project.category}
                                    </span>
                                    <h3 style={{ margin: '8px 0 16px' }}>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                                        {project.tech.map(t => (
                                            <span key={t} style={{ fontSize: '12px', background: 'white', padding: '4px 12px', borderRadius: '12px', border: '1px solid var(--divider)' }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                <AnimatePresence>
                                    {expandedId === project.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--divider)' }}
                                        >
                                            <p style={{ fontSize: '14px' }}>{project.details}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
