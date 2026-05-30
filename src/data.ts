export interface Skill {
  name: string;
  category: 'programming' | 'frontend' | 'database' | 'systems' | 'other';
  level?: string;
  iconName?: string;
}

export interface Project {
  title: string;
  organization: string;
  platformOrContext: string;
  description: string[];
  techStack: string[];
}

export interface Experience {
  role: string;
  company: string;
  locationAndDuration: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degreeOrStatus: string;
  locationAndDuration: string;
  description?: string;
}

export interface Language {
  language: string;
  proficiency: string;
  details?: string;
}

export const personalInfo = {
  name: 'Rijad Čvorak',
  title: 'Computer Science & Mathematics Student',
  subTitle: 'Web & Game Developer • Problem Solver',
  email: 'rijad1403@gmail.com',
  phone: '+387 61 031 382',
  location: 'Sarajevo, Bosnia and Herzegovina',
  address: 'Bosanska 13, Sarajevo, BiH',
  dob: '14.03.2002',
  profile: 'I am a Computer Science and Mathematics student at the University of Sarajevo (Prirodno-Matematički Fakultet) with a strong foundation in software development, data structures, and algorithmic logic. I combine technical proficiency with extensive customer-facing and remote market research experience, and I am highly motivated to apply my analytical skills to remote, tech-driven roles.',
  github: 'https://github.com/rijadcvorak',
  linkedin: 'www.linkedin.com/in/rijad-čvorak',
  instagram: 'https://www.instagram.com/rijad.cvorak/'
};

export const skills: Skill[] = [
  { name: 'C++', category: 'programming' },
  { name: 'C#', category: 'programming' },
  { name: 'Lua', category: 'programming' },
  { name: 'Luau', category: 'programming' },
  { name: 'TypeScript', category: 'programming' },
  { name: 'Python', category: 'programming' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'MySQL', category: 'database' },
  { name: 'React.js', category: 'frontend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'Windows OS', category: 'systems' },
  { name: 'MS Office Suite', category: 'systems' },
  { name: 'Cloud Platforms', category: 'systems' }
];

export const projects: Project[] = [
  {
    title: 'Web Platform Developer',
    organization: 'Craftsmen Association of Canton Sarajevo',
    platformOrContext: 'Contract / Professional',
    description: [
      'Independently developed a comprehensive, responsive web platform designed to digitize the association\'s public services and administrative workflow.',
      'Created and polished a highly responsive, user-friendly user interface using standard HTML5, CSS3, and modern interactive JavaScript.',
      'Optimized layout performance and cross-device compatibility, ensuring full usability on mobile phones and tablets alike.'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX']
  },
  {
    title: 'Independent Game Development',
    organization: 'Roblox Platform',
    platformOrContext: 'Independent Project',
    description: [
      'Successfully conceptualized and programmatically started development on a 2D sprite-based biological-themed roguelike survival game.',
      'Engineered and wired custom rigid mechanics, stateful client-side health and shield systems, custom enemy pathfinding, and interactive logic.',
      'Implemented robust player statistics arrays, upgrade paths, and custom particle structures using performant scripting patterns.'
    ],
    techStack: ['Lua / Luau', 'Roblox Studio', '2D Sprite Systems', 'Game Mechanics', 'AI Enemy Logic']
  },
  {
    title: 'Algorithm & Animation Scripts',
    organization: 'Academic & Personal Development',
    platformOrContext: 'Portfolio & University Tasks',
    description: [
      'Programmed advanced sorting algorithms and modular data structures utilizing C++ templates, ensuring high reusability and type safety.',
      'Developed high-performance HTML5 Canvas interactive animations, system level event listeners, and procedural matrix generation using pure JavaScript.',
      'Explored various computational geometry problems, sorting visualizations, and mathematical rendering theories to bridge math with graphic animation.'
    ],
    techStack: ['C++', 'HTML5 Canvas', 'Data Structures', 'Algorithms', 'JavaScript']
  }
];

export const experiences: Experience[] = [
  {
    role: 'Online Interviewer (Market Research)',
    company: 'Ipsos',
    locationAndDuration: 'Remote | Student Contractor',
    bullets: [
      'Conducted rigorous, high-quality public market research and public opinion surveys, collecting scientific statistical data as a verified online "anketar".',
      'Managed all remote workspace channels with an exceptional standard of accuracy, professional telephone/web communication, and rapid data entry.',
      'Successfully input complex tabular surveys into backend structures under strict client deadlines.'
    ]
  },
  {
    role: 'Sales Promoter',
    company: 'Sarajevski Kiseljak d.o.o.',
    locationAndDuration: 'Sarajevo, BiH | 2 Years Part-Time',
    bullets: [
      'Actively engaged with a wide demographic of consumers directly in high-traffic retail environments to elevate brand equity and volume of conversion.',
      'Solved unexpected customer queries with outstanding poise, presenting active product benefits, and managing logistical showcase materials.',
      'Coordinated and compiled daily promotional reports for regional trade supervisors.'
    ]
  },
  {
    role: 'Marketing Representative',
    company: 'Boreas d.o.o.',
    locationAndDuration: 'Sarajevo, BiH | 4 Months Contract',
    bullets: [
      'Executed highly organized on-the-ground B2C and B2B marketing tactics, managing point-of-sale branding items and coordinate materials.',
      'Maintained exceptionally cohesive customer relationships and handled key account display setups with deep professional attention.'
    ]
  }
];

export const educationList: Education[] = [
  {
    institution: 'Prirodno-Matematički Fakultet',
    degreeOrStatus: 'Pursuing Core B.Sc. in Computer Science & Mathematics',
    locationAndDuration: 'Current | Univerzitet u Sarajevu (UNSA)',
    description: 'Immersing in advanced real analysis, discrete structures, vector algebra, analytical geometry, custom object architecture, logic programming, and robust template data structure designs.'
  },
  {
    institution: 'JU Gimnazija Dobrinja',
    degreeOrStatus: 'High School Diploma (General Gymnasium Science Stream)',
    locationAndDuration: 'Completed | Sarajevo, BiH',
    description: 'Graduated with high honors, focused on advanced science topics and mathematics, forming a fundamental base for university-level computational logic.'
  }
];

export const languages: Language[] = [
  { language: 'English', proficiency: 'C2', details: 'Fluent; precise expression for complex topics and mathematical writing.' },
  { language: 'German', proficiency: 'B2', details: 'Professional and independent working proficiency in writing and speaking.' },
  { language: 'French', proficiency: 'A1', details: 'Basic conversational understanding and survival vocabulary.' },
  { language: 'Spanish', proficiency: 'Learning', details: 'Actively learning for personal and academic growth.' }
];

export const coreQualities = [
  { title: 'Excellent Communication', text: 'I am capable of translating complex technical concepts or algorithmic math into clear, human explanations for developers and business stakeholders alike.' },
  { title: 'Strong Work Ethic & Discipline', text: 'I successfully managed intensive academic loads of Computer Science and Mathematics dual disciplines while consistently working remote and retail part-time jobs.' },
  { title: 'High Responsibility & Diligence', text: 'I have a proven record of accurate data capture at Ipsos and strict operational adherence safely across dynamic promotional environments.' },
  { title: 'Creative Problem-Solving', text: 'I excel at linking theoretical mathematical models (vector algebra, geometry) with practical, client-side software structures and graphical code execution.' }
];
