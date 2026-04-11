// constants/index.js
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  website,
  aviation,
  ecommerce,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  techavia,
  carrent,
  jobit,
  tripguide,
  threejs,
  python,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Website Development",
    icon: web,
    description: "Complete website creation from initial concept to final deployment. Professional, responsive websites that engage visitors and convert them into customers.",
    features: [
      "Custom Design & Development",
      "E-commerce Integration",
      "Mobile-First Approach",
      "SEO Optimization",
      "Fast Loading Speed",
      "Ongoing Maintenance"
    ]
  },
  {
    title: "Business Applications",
    icon: backend,
    description: "Custom software solutions that streamline your business operations, automate processes, and improve productivity across your organization.",
    features: [
      "Custom Software Development",
      "Workflow Automation",
      "Database Management",
      "API Integration",
      "Cloud Deployment",
      "Scalable Solutions"
    ]
  },
  {
    title: "UI/UX Design",
    icon: mobile,
    description: "Creating intuitive, user-friendly interfaces that provide exceptional experiences and drive engagement across all devices.",
    features: [
      "User Interface Design",
      "User Experience Strategy",
      "Interactive Prototypes",
      "Responsive Layouts",
      "User Testing",
      "Brand Consistency"
    ]
  },
  {
    title: "Digital Solutions",
    icon: creator,
    description: "Comprehensive digital services that enhance your online presence and help you connect with your target audience effectively.",
    features: [
      "Content Creation",
      "Digital Marketing Support",
      "Video Production",
      "Brand Development",
      "Social Media Assets",
      "Performance Analytics"
    ]
  }
];

export const nicheCategories = [
  {
    category: "E-commerce & Retail",
    niches: [
      "E-commerce stores",
      "Dropshipping stores",
      "Amazon sellers",
      "Print-on-demand shops",
      "Furniture retailers",
      "Clothing brands",
      "Jewelry ecom stores",
      "Pet supply shops",
      "Baby product retailers",
      "Electronics sellers",
      "Fashion boutiques",
      "Grocery delivery services",
      "Meal kit brands",
      "Supplement sellers",
      "Beauty product brands",
      "Etsy/Redbubble SEO listings"
    ]
  },
  {
    category: "Digital Marketing & Agencies",
    niches: [
      "Digital marketing agencies",
      "Social media agencies",
      "SEO agencies",
      "Email marketing agencies",
      "Performance ad agencies",
      "Content agencies",
      "Advertising agencies",
      "PR firms",
      "Influencer agencies"
    ]
  },
  {
    category: "Health & Wellness",
    niches: [
      "Healthcare providers",
      "Fitness coaches",
      "Nutritionists",
      "Yoga studios",
      "Mental health therapists",
      "Telehealth clinics",
      "Dental clinics",
      "Veterinary services",
      "Pharmacies",
      "Wellness retreats",
      "Spa chains",
      "Gym franchises",
      "Personal trainers",
      "Weight loss centers",
      "Cosmetic surgery practices"
    ]
  },
  {
    category: "Education & Coaching",
    niches: [
      "Online course creators",
      "Language tutors",
      "Career coaches",
      "Edtech startups",
      "Test prep academies",
      "Coaching businesses",
      "Business coaching programs",
      "Coding bootcamps",
      "Design schools",
      "Music schools",
      "Art academies",
      "Cooking classes",
      "Driving schools",
      "Schools",
      "Universities"
    ]
  },
  {
    category: "Professional Services & Finance",
    niches: [
      "Law firms",
      "Accounting firms",
      "Consulting firms",
      "Financial advisors",
      "Insurance agencies",
      "Mortgage brokers",
      "Human resources firms",
      "Recruitment agencies",
      "Executive search firms",
      "Payroll services",
      "Tax preparation services",
      "Bookkeeping agencies",
      "Virtual CFO firms"
    ]
  },
  {
    category: "Real Estate & Construction",
    niches: [
      "Real estate agencies",
      "Interior designers",
      "Architects",
      "Construction firms",
      "Property management",
      "Home renovation services",
      "Commercial real estate"
    ]
  },
  {
    category: "Tech & Software",
    niches: [
      "SaaS startups",
      "App developers",
      "Fintech apps",
      "Fintech startups",
      "Software development firms",
      "Software consultancies",
      "Gaming studios",
      "Tech startups",
      "B2B SaaS companies",
      "IT service providers"
    ]
  },
  {
    category: "Hospitality & Food",
    niches: [
      "Restaurants",
      "Hotels",
      "Wedding planners",
      "Event organizers",
      "Travel agencies",
      "Tourism boards",
      "Food delivery brands",
      "Craft beer breweries",
      "Coffee roasters",
      "Organic farms",
      "Food trucks",
      "Mobile catering services",
      "Wedding caterers"
    ]
  },
  {
    category: "Creative & Media",
    niches: [
      "YouTubers",
      "Podcasters",
      "Influencers",
      "Music artists",
      "Photographers",
      "Authors",
      "Book publishers",
      "Media companies",
      "Animation houses",
      "Event production companies"
    ]
  },
  {
    category: "Non-profits & Sustainability",
    niches: [
      "Non-profits",
      "Sustainability brands",
      "Nonprofit foundations",
      "Charity organizations",
      "Religious institutions",
      "Community centers",
      "Waste management services"
    ]
  },
  {
    category: "Other Services",
    niches: [
      "Salons",
      "Local businesses",
      "Engineering consultancies",
      "Automotive dealerships",
      "Automotive brands",
      "Taxi services",
      "Transportation logistics",
      "Logistics companies"
    ]
  }
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Python Developer",
    company_name: "Techavia IT Solutions Pvt.Ltd",
    icon: techavia,
    iconBg: "#383E56",
    date: "April 2024 - April 2025",
    points: [
      "Developed and maintained robust web applications using modern frameworks.",
      "Built secure and scalable APIs for seamless data integration between systems.",
      "Optimized application performance and improved database efficiency.",
      "Collaborated with teams to deliver reliable software solutions on schedule.",
    ],
  },
  // {
  //   title: "React Native Developer",
  //   company_name: "Tesla",
  //   icon: tesla,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2021 - Feb 2022",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "Web Developer",
  //   company_name: "Shopify",
  //   icon: shopify,
  //   iconBg: "#383E56",
  //   date: "Jan 2022 - Jan 2023",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "Full stack Developer",
  //   company_name: "Meta",
  //   icon: meta,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2023 - Present",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
];

const testimonials = [
  {
    testimonial: "Working with Rick was an absolute pleasure. The 3D portfolio he created exceeded all expectations and helped us secure major clients.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 5
  },
  {
    testimonial: "Rick's attention to detail is phenomenal. He transformed our boring corporate site into an interactive 3D experience that our customers love.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 5
  },
  {
    testimonial: "The 3D animations and smooth transitions Rick implemented increased our engagement by 300%. Simply outstanding work!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 5
  },
  {
    testimonial: "As a gaming company, we needed someone who understands 3D and interactivity. Rick delivered beyond our wildest dreams.",
    name: "Alex Johnson",
    designation: "Creative Director",
    company: "Nexus Games",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    rating: 4
  },
  {
    testimonial: "Rick's 3D portfolio design for our architecture firm was revolutionary. Clients can now walk through our designs virtually.",
    name: "Maria Garcia",
    designation: "Lead Architect",
    company: "Urban Design Co",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    rating: 5
  },
  {
    testimonial: "The 3D e-commerce experience Rick built increased our conversion rate by 45%. His work is truly transformative.",
    name: "David Kim",
    designation: "E-commerce Manager",
    company: "StyleHub",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    rating: 5
  }
];

const projects = [
  {
    name: "Hospital Job Management",
    description:
      "A comprehensive platform for managing healthcare recruitment and staff distribution. Streamlines the process of posting jobs, managing applications, assigning employees to hospitals, and handling client relationships with automated invoicing and reporting.",
    tags: [
      {
        name: "Web Development",
        color: "blue-text-gradient",
      },
      {
        name: "Database Design",
        color: "green-text-gradient",
      },
      {
        name: "Business Automation",
        color: "pink-text-gradient",
      },
      {
        name: "User Management",
        color: "orange-text-gradient",
      },
      {
        name: "Reporting System",
        color: "cyan-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/SB-Siba/job-management",
  },
  {
    name: "Institute Management System",
    description:
      "A complete educational platform for managing student enrollment, course administration, fee collection, and certificate generation. Provides separate interfaces for administrators, students, and faculty with automated processes and digital documentation.",
    tags: [
      {
        name: "Education Technology",
        color: "orange-text-gradient",
      },
      {
        name: "Administrative System",
        color: "indigo-text-gradient",
      },
      {
        name: "Digital Certification",
        color: "cyan-text-gradient",
      },
      {
        name: "Student Portal",
        color: "green-text-gradient",
      },
      {
        name: "Payment Processing",
        color: "blue-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/SB-Siba/institute_management",
  },
  {
    name: "Horticulture System",
    description:
      "An innovative platform for urban gardening and sustainable agriculture management. Connects rooftop gardeners with experts, tracks plant growth, manages vendor products, and implements a reward system for eco-friendly practices through a Green Coin mechanism.",
    tags: [
      {
        name: "Sustainability",
        color: "magenta-text-gradient",
      },
      {
        name: "Community Platform",
        color: "pink-text-gradient",
      },
      {
        name: "Agricultural Tech",
        color: "bronze-text-gradient",
      },
      {
        name: "Gamification",
        color: "blue-text-gradient",
      },
      {
        name: "Expert Network",
        color: "green-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/SB-Siba/CHES",
  },
  {
    name: "E-commerce Shopping Platform",
    description:
      "A fully-featured online shopping platform with category management, product listings, secure payment processing, and administrative controls. Includes customer accounts, shopping cart functionality, and order management for seamless online retail operations.",
    tags: [
      {
        name: "E-commerce",
        color: "blue-text-gradient",
      },
      {
        name: "Online Retail",
        color: "green-text-gradient",
      },
      {
        name: "Payment Integration",
        color: "pink-text-gradient",
      },
      {
        name: "Inventory Management",
        color: "orange-text-gradient",
      },
      {
        name: "Customer Experience",
        color: "cyan-text-gradient",
      },
    ],
    image: ecommerce,
    source_code_link: "https://github.com/SB-Siba/E-Commerce_SB",
  },
  {
    name: "Premier Aviation",
    description:
      "A modern, responsive website for aviation services featuring smooth animations, optimized performance, and professional presentation. Showcases services, company information, and contact details with an engaging user interface.",
    tags: [
      {
        name: "Website Design",
        color: "blue-text-gradient",
      },
      {
        name: "Responsive Layout",
        color: "cyan-text-gradient",
      },
      {
        name: "Performance Optimization",
        color: "green-text-gradient",
      },
      {
        name: "Corporate Website",
        color: "yellow-text-gradient",
      },
    ],
    image: aviation,
    source_code_link: "https://premieraviation.in/",
  },
  {
    name: "Portfolio Website",
    description:
      "A dynamic 3D portfolio website showcasing professional work with interactive elements, smooth animations, and modern design principles. Demonstrates capabilities in creating engaging digital experiences.",
    tags: [
      { 
        name: "3D Design", 
        color: "blue-text-gradient" 
      },
      { 
        name: "Interactive Experience", 
        color: "cyan-text-gradient" 
      },
      { 
        name: "Portfolio Design", 
        color: "green-text-gradient" 
      },
      { 
        name: "Modern Web Design", 
        color: "magenta-text-gradient" 
      },
    ],
    image: website,
    source_code_link: "#",
  },
];

export { services, technologies, experiences, testimonials, projects };