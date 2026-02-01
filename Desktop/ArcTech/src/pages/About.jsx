import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-page">
            <section className="section text-center" style={{ paddingBottom: 0 }}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        About ARC TECH
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ maxWidth: '700px', margin: '24px auto', fontSize: '1.25rem' }}
                    >
                        We are a team of visionaries, engineers, and designers committed to building the digital future.
                    </motion.p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <motion.div
                            style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '24px' }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3>Our Mission</h3>
                            <p>To empower businesses with technology that is not just functional, but transformative. We strive to create software that enhances human potential.</p>
                        </motion.div>
                        <motion.div
                            style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '24px' }}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h3>Our Vision</h3>
                            <p>To be the global standard for software excellence, known for our integrity, innovation, and unwavering commitment to client success.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container text-center">
                    <h2 style={{ marginBottom: '60px' }}>Our Values</h2>
                    <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                        {['Innovation', 'Integrity', 'Excellence', 'Collaboration'].map((value, i) => (
                            <motion.div
                                key={value}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div style={{ width: 64, height: 64, background: 'var(--bg-secondary)', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* Icon placeholder */}
                                    <div style={{ width: 20, height: 20, background: 'var(--accent-blue)', borderRadius: '4px' }}></div>
                                </div>
                                <h3>{value}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section text-center">
                <div className="container">
                    <Link to="/history" className="btn btn-secondary" style={{ marginRight: '16px' }}>View Our History</Link>
                    <Link to="/portfolio" className="btn btn-primary">See Our Work</Link>
                </div>
            </section>
        </div>
    );
};

export default About;
