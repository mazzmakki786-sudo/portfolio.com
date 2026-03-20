/**
 * MUAZ MAKI — PORTFOLIO DATA
 * Edit this file to update website content.
 * No database, no backend. GitHub = CMS.
 */

window.PORTFOLIO_DATA = {
    // 1. OWNER INFORMATION
    owner: {
        nameLine1: 'MUHAMMAD',
        nameLine2: 'MUAZ MAKI',
        brand: 'Muaz.Dev',
        city: 'Faisalabad, Pakistan',
        whatsapp: '+923146325823',
        email: 'mazzmakki786@gmail.com',
        footerName: 'Muaz .Dev',
        footerRight: 'MUAZ MAKI'
    },

    // 2. HERO CONFIGURATION
    hero: {
        rotatingTags: [
            'Available for Work',
            'Pakistan ka Web Developer',
            'Hire Me Now',
            'Building Digital Pakistan',
            'Website Designer',
            'Your Vision My Code',
            'Apka Naam Hamara Kaam'
        ],
        typedPhrases: [
            'Web Developer',
            'Website Designer',
            'UI Designer',
            'Problem Solver',
            'Vibe Coder'
        ],
        buttons: [
            { label: 'Explore Work', link: '#projects', class: 'btn-p' },
            { label: 'Contact Me', link: 'https://wa.me/923146325823', class: 'btn-white', target: '_blank' }
        ]
    },

    // 3. ABOUT SECTION
    about: {
        title: 'Crafting Digital Experiences',
        image: 'sourses/muaz maki.jpg',
        bioLines: [
            "I build fast, clean websites for Pakistani businesses...",
            "Based in Faisalabad — I turn your business idea into reality.",
            "I help local Pakistani businesses go online with professional sites."
        ],
        stats: [
            { label: 'Experience', value: '3+ Years' },
            { label: 'Satisfaction', value: '100%' },
            { label: 'Support', value: '24/7' },
            { label: 'Mission', value: '∞ Success' }
        ],
        location: 'Faisalabad, Pakistan'
    },

    // 4. SKILLS SECTION
    skills: [
        { name: 'HTML / CSS', level: 80 },
        { name: 'JavaScript', level: 75 },
        { name: 'Hostinger Setup', level: 70 },
        { name: 'SEO Basics', level: 65 },
        { name: 'Responsive Design', level: 100 },
        { name: 'React', level: 80 },
        { name: 'Vibe Coding / AI', level: 95 },
        { name: 'Python', level: 75 },
        { name: 'Frontend Dev', level: 100 },
        { name: 'Backend Dev', level: 100 }
    ],

    // 5. PROJECTS SECTION
    projects: [
        {
            id: '01',
            name: 'Doctor Teeth Clinic',
            type: 'Clinic Website',
            link: 'https://doctorteethclinic.com',
            tags: ['HTML', 'CSS', 'JS']
        },
        {
            id: '02',
            name: 'Implant & Dental Art',
            type: 'Medical Clinic',
            link: 'https://idart.org.pk',
            tags: ['HTML', 'CSS', 'JS']
        },
        {
            id: '03',
            name: 'Dento Correct Clinic',
            type: 'Dental Clinic',
            link: 'https://dentocorrect.pk',
            tags: ['HTML', 'CSS', 'JS']
        }
    ],

    // 6. SERVICES SECTION
    services: [
        { name: 'BASIC', price: 'Rs. 28,000' },
        { name: 'STANDARD', price: 'Rs. 45,000' },
        { name: 'PREMIUM', price: 'Rs. 70,000' },
        { name: 'BASIC MONTHLY', price: 'Rs. 3,000/mo × 5' },
        { name: 'STANDARD MONTHLY', price: 'Rs. 3,000/mo × 8' },
        { name: 'PREMIUM MONTHLY', price: 'Rs. 4,000/mo × 10' }
    ],


    // 8. PRICING PLANS
    pricing: {
        onetime: [
            { name: 'BASIC', price: '28,000', setup: '18,000', popular: false },
            { name: 'STANDARD', price: '45,000', setup: '20,000', popular: true },
            { name: 'PREMIUM', price: '70,000', setup: '40,000', popular: false }
        ],
        monthly: [
            { name: 'BASIC MONTHLY', price: '3,000', duration: '5 Months', setup: '18,000', popular: false },
            { name: 'STANDARD MONTHLY', price: '3,000', duration: '8 Months', setup: '20,000', popular: true },
            { name: 'PREMIUM MONTHLY', price: '4,000', duration: '10 Months', setup: '40,000', popular: false }
        ]
    },

    // 9. TESTIMONIALS
    testimonials: [
        {
            stars: 4,
            text: "Nice work! Very professional website delivered on time.",
            name: "Doctor Teeth Clinic",
            role: "Dental Clinic, Faisalabad"
        }
    ],

    // 10. CONTACT SECTION
    contact: {
        titles: [
            "Let's Build Something Great",
            "Got a Project? Let's Talk",
            "Ready to Go Online?",
            "Start Your Digital Journey"
        ],
        description: "Let's discuss your project. I'm available on WhatsApp anytime.",
        whatsapp: '+923146325823',
        email: 'mazzmakki786@gmail.com',
        location: 'Faisalabad, Pakistan'
    }
};
