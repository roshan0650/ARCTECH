import { motion } from 'framer-motion';

const milestones = [
    { year: '2020', title: 'ARC TECH Founded', desc: 'Started in a small garage with a vision to change software development.' },
    { year: '2021', title: 'First Major Client', desc: 'Partnered with a leading fintech startup to revolutionize their banking app.' },
    { year: '2022', title: 'Global Expansion', desc: 'Opened offices in London and Singapore. Team grew to 50+ engineers.' },
    { year: '2023', title: 'Award Winning', desc: 'Recognized as Top Software Agency by TechWeek.' },
    { year: '2024', title: 'AI Integration', desc: 'Launched dedicated AI division to serve enterprise needs.' },
];

const History = () => {
    return (
        <div className="history-page">
            <section className="section text-center">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Journey
                    </motion.h1>
                    <p style={{ maxWidth: '600px', margin: '20px auto' }}>From humble beginnings to global impact.</p>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ position: 'relative', borderLeft: '2px solid var(--divider)', paddingLeft: '40px', marginLeft: '20px' }}>
                        {milestones.map((item, index) => (
                            <motion.div
                                key={index}
                                style={{ marginBottom: '60px', position: 'relative' }}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: '-49px',
                                    top: '0',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-blue)',
                                    border: '4px solid white',
                                    boxShadow: '0 0 0 2px var(--divider)'
                                }}></div>

                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>
                                    {item.year}
                                </span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default History;
