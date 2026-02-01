import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        style={{ maxWidth: '800px' }}
                    >
                        <h1 style={{ marginBottom: '24px' }}>Software Innovation.<br />Trust. Growth.</h1>
                        <p style={{ fontSize: '24px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px' }}>
                            We build premium digital solutions that empower businesses to scale and dominate their markets.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/portfolio" className="btn btn-primary">View Our Work</Link>
                            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="section section-bg">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-center">Who We Are</h2>
                        <p className="text-center" style={{ maxWidth: '700px', margin: '0 auto 40px' }}>
                            ARC TECH is a forward-thinking software development company dedicated to crafting exceptional digital experiences. We bridge the gap between complex technology and human-centric design.
                        </p>
                        <div className="flex justify-center">
                            <Link to="/about" className="btn btn-text">Learn more about us &rarr;</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section">
                <div className="container">
                    <motion.h2 variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">Our Services</motion.h2>
                    <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '60px' }}>
                        {[
                            { title: 'Web Development', desc: 'Scalable, high-performance websites built with modern frameworks.' },
                            { title: 'App Development', desc: 'Native and cross-platform mobile applications that users love.' },
                            { title: 'Cloud Solutions', desc: 'Secure and efficient cloud infrastructure for growing businesses.' },
                            { title: 'UI/UX Design', desc: 'Intuitive, accessible, and beautiful interfaces.' }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{ padding: '32px', borderRadius: '24px', background: 'var(--bg-secondary)' }}
                            >
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center" style={{ marginTop: '48px' }}>
                        <Link to="/services" className="btn btn-secondary">View All Services</Link>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="section text-center" style={{ padding: '120px 24px' }}>
                <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2 style={{ fontSize: '3rem' }}>Ready to start?</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>Let's build something amazing together.</p>
                    <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
