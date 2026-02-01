import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "ARC TECH didn't just build us a website; they transformed our digital presence. Their attention to detail is unmatched.",
        name: "Sarah Jenkins",
        role: "CTO, FinEdge",
    },
    {
        quote: "The team is professional, transparent, and incredibly talented. They delivered on time and exceeded expectations.",
        name: "Michael Chen",
        role: "Founder, GreenEnergy Co",
    },
    {
        quote: "Working with ARC TECH felt like having an in-house team. They cared about our success as much as we did.",
        name: "Elena Rodriguez",
        role: "Director of Product, RetailFlow",
    },
];

const Clients = () => {
    return (
        <div className="clients-page">
            <section className="section text-center">
                <div className="container">
                    <h1 style={{ marginBottom: '60px' }}>Trusted by Leaders</h1>

                    {/* Logo Grid Placeholder */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', marginBottom: '80px', opacity: 0.6 }}>
                        {['FinEdge', 'HealthHub', 'Google', 'Amazon', 'Stripe', 'Spotify'].map((brand, i) => (
                            <span key={i} style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section-bg">
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '60px' }}>What our clients say</h2>
                    <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <p style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '24px', color: 'var(--text-primary)' }}>"{t.quote}"</p>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{t.name}</div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{t.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Clients;
