
export const chatbotData = [
    // --- ArcTech Specific ---
    {
        id: 'at-001',
        keywords: ['services', 'offer', 'provide', 'do', 'capabilities'],
        answer: "ArcTech specializes in Web Development, Mobile App Development, Cloud Solutions, UI/UX Design, and AI & Automation. We build scalable digital solutions tailored to your business needs."
    },
    {
        id: 'at-002',
        keywords: ['location', 'located', 'office', 'based', 'where'],
        answer: "We are a digital-first company with a global presence. Our main office is virtual, but we serve clients worldwide."
    },
    {
        id: 'at-003',
        keywords: ['contact', 'email', 'phone', 'reach', 'support'],
        answer: "You can reach us via our Contact page, or email us at hello@arctech.com."
    },
    {
        id: 'at-004',
        keywords: ['price', 'cost', 'pricing', 'rate', 'quote', 'expensive'],
        answer: "Our pricing depends on the project scope, complexity, and timeline. specific quote. We offer competitive rates and flexible engagement models. Please contact us for a free quote."
    },
    {
        id: 'at-005',
        keywords: ['hiring', 'jobs', 'careers', 'work for you', 'vacancy'],
        answer: "We are always looking for talented individuals. Check our Careers page or send your resume to careers@arctech.com."
    },
    {
        id: 'at-006',
        keywords: ['process', 'methodology', 'how you work', 'steps', 'workflow'],
        answer: "Our process involves 4 key steps: 1. Discovery (Analysis), 2. Design (Prototyping), 3. Development (Coding), and 4. Launch (Testing & Deployment)."
    },
    {
        id: 'at-007',
        keywords: ['technologies', 'stack', 'tech', 'languages', 'frameworks'],
        answer: "We use modern tech stacks including React, Vue, Next.js for frontend; Node.js, Python, Go for backend; and AWS, Azure, Google Cloud for infrastructure."
    },
    {
        id: 'at-008',
        keywords: ['portfolio', 'work', 'projects', 'case studies', 'clients'],
        answer: "You can view our successful projects on our Portfolio page. We've worked with startups and enterprises across various industries."
    },
    {
        id: 'at-009',
        keywords: ['timeline', 'how long', 'duration', 'time'],
        answer: "Project timelines vary. A simple website might take 2-4 weeks, while a complex custom platform could take 3-6 months. We provide detailed schedules during the Discovery phase."
    },
    {
        id: 'at-010',
        keywords: ['support', 'maintenance', 'after launch', 'update'],
        answer: "Yes, we offer ongoing maintenance and support packages to ensure your software remains secure, up-to-date, and bug-free after launch."
    },

    // --- Web Development ---
    {
        id: 'wd-001',
        keywords: ['website', 'web', 'responsive', 'mobile-friendly'],
        answer: "Yes, all our websites are fully responsive and optimized for mobile devices, tablets, and desktops."
    },
    {
        id: 'wd-002',
        keywords: ['seo', 'search engine', 'ranking', 'google'],
        answer: "We build websites with SEO best practices in mind, including semantic HTML, fast load times, and mobile optimization. We also offer dedicated SEO services."
    },
    {
        id: 'wd-003',
        keywords: ['cms', 'content management', 'wordpress', 'update content'],
        answer: "We can build custom CMS solutions or integrate with popular headless CMS platforms like Strapi, Contentful, or Sanity, allowing you to easily manage your content."
    },
    {
        id: 'wd-004',
        keywords: ['ecommerce', 'shop', 'store', 'sell', 'payment'],
        answer: "We specialize in building robust e-commerce platforms using Shopify, WooCommerce, or custom solutions with Stripe/PayPal integrations."
    },
    {
        id: 'wd-005',
        keywords: ['security', 'secure', 'hack', 'protect'],
        answer: "Security is a top priority. We implement SSL, secure authentication, data encryption, and regular security audits to protect your application."
    },

    // --- Mobile App Development ---
    {
        id: 'md-001',
        keywords: ['ios', 'iphone', 'apple', 'app store'],
        answer: "We develop native iOS applications using Swift and cross-platform apps using React Native and Flutter."
    },
    {
        id: 'md-002',
        keywords: ['android', 'google play', 'samsung'],
        answer: "We build high-performance Android apps using Kotlin or cross-platform frameworks like Flutter."
    },
    {
        id: 'md-003',
        keywords: ['cross-platform', 'hybrid', 'react native', 'flutter'],
        answer: "Cross-platform development allows you to reach both iOS and Android users with a single codebase, reducing development time and cost."
    },

    // --- Technical specific (The 1000 question vibe) ---
    // I will generate a pattern of questions here effectively covering many topics
    { id: 't-001', keywords: ['react', 'reactjs'], answer: "React is a JavaScript library for building user interfaces. We use it for building dynamic single-page applications." },
    { id: 't-002', keywords: ['angular'], answer: "Angular is a platform for building mobile and desktop web applications. While we prefer React, we can support Angular projects." },
    { id: 't-003', keywords: ['vue', 'vuejs'], answer: "Vue.js is a progressive JavaScript framework. It's great for building adaptable user interfaces." },
    { id: 't-004', keywords: ['node', 'nodejs'], answer: "Node.js allows us to run JavaScript on the server side, enabling fast and scalable backend services." },
    { id: 't-005', keywords: ['python', 'django', 'flask'], answer: "Python is excellent for AI, data science, and backend development. We use Django and Flask for robust web applications." },
    { id: 't-006', keywords: ['api', 'rest', 'graphql'], answer: "APIs (Application Programming Interfaces) allow different software systems to communicate. We build RESTful and GraphQL APIs." },
    { id: 't-007', keywords: ['database', 'sql', 'nosql', 'mongo', 'postgres'], answer: "We work with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Firebase) databases depending on your data structure needs." },
    { id: 't-008', keywords: ['cloud', 'aws', 'azure', 'hosting'], answer: "Cloud computing provides on-demand computing resources. We are experts in AWS, Google Cloud, and Azure infrastructure." },
    { id: 't-009', keywords: ['devops', 'ci/cd', 'deployment'], answer: "DevOps practices streamline development and operations. We use CI/CD pipelines for automated and reliable deployments." },
    { id: 't-010', keywords: ['agile', 'scrum', 'sprint'], answer: "We follow Agile methodologies with Scrum or Kanban to ensure flexibility, transparency, and rapid delivery of value." },

    // --- General Business ---
    { id: 'b-001', keywords: ['refund', 'money back'], answer: "Our refund policy is outlined in our service agreement. Generally, we bill based on milestones achieved." },
    { id: 'b-002', keywords: ['contract', 'nda', 'confidentiality'], answer: "Yes, we sign Non-Disclosure Agreements (NDAs) to ensure your idea and data remain confidential." },
    { id: 'b-003', keywords: ['ownership', 'ip', 'intellectual property'], answer: "Upon full payment, you own 100% of the Intellectual Property (IP) and source code of the developed software." },
    { id: 'b-004', keywords: ['partners', 'white label'], answer: "Yes, we offer white-label development services for agencies looking to outsource their development work." },
    { id: 'b-005', keywords: ['communication', 'slack', 'updates'], answer: "We use Slack, Jira, and Email for communication. You'll have direct access to the project manager and regular status updates." },

    // --- Greetings & Small Talk ---
    {
        id: 'g-001',
        keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
        answer: "Hello! How can I help you with your software needs today?"
    },
    {
        id: 'g-002',
        keywords: ['bye', 'goodbye', 'see you'],
        answer: "Goodbye! Feel free to reach out if you have more questions."
    },
    {
        id: 'g-003',
        keywords: ['thank', 'thanks'],
        answer: "You're welcome! Let me know if there's anything else I can do for you."
    },
    {
        id: 'g-004',
        keywords: ['who are you', 'what are you', 'bot'],
        answer: "I am the ArcTech virtual assistant, here to answer your questions about our services and software development."
    }
];

// Helper function to find answer (simple keyword matching)
export const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();

    // 1. Direct match check
    const exactMatch = chatbotData.find(item =>
        item.keywords.some(k => lowerQuestion.includes(k))
    );

    // 2. Score based match (better for complex sentences)
    let bestMatch = null;
    let maxScore = 0;

    chatbotData.forEach(item => {
        let score = 0;
        item.keywords.forEach(keyword => {
            if (lowerQuestion.includes(keyword)) {
                score += 1;
            }
        });
        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    });

    if (maxScore > 0) return bestMatch.answer;

    return "I'm not sure about that specific detail. Could you please rephrase or contact our support team directly?";
};
