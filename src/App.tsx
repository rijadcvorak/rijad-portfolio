import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  Printer,
  Github,
  Linkedin,
  Instagram,
  Filter,
  Code,
  Award,
  GraduationCap,
  Briefcase,
  Layers,
  CheckCircle2,
  ChevronRight,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Eye,
  Terminal,
  FileText
} from 'lucide-react';
import {
  personalInfo,
  skills,
  projects,
  experiences,
  educationList,
  languages,
  coreQualities,
  Project,
  Experience
} from './data';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<'email' | 'phone' | 'address' | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'technical'>('all');

  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterCompany, setRecruiterCompany] = useState('');
  const [meetingType, setMeetingType] = useState<'interview' | 'chemistry' | 'custom'>('interview');
  const [customMessage, setCustomMessage] = useState('');

  const copyToClipboard = (text: string, type: 'email' | 'phone' | 'address') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const getPrecomposedEmail = () => {
    const defaultSubject = `Job Opportunity for Rijad Čvorak`;
    let body = `Dear Rijad,\n\n`;
    
    if (meetingType === 'interview') {
      body += `This is ${recruiterName || 'a recruitment manager'} from ${recruiterCompany || 'our team'}. We reviewed your impressive Computer Science and Mathematics portfolio and would highly like to invite you for a technical interview.\n\n`;
    } else if (meetingType === 'chemistry') {
      body += `This is ${recruiterName || 'a recruiter'} from ${recruiterCompany || 'our company'}. We discovered your profile and would love to schedule a friendly 15-minute introductory coffee chat to explore mutual roles.\n\n`;
    } else {
      body += `${customMessage || 'I was highly impressed with your live sorting visualizer and HTML5 canvas portfolio website!'}\n\n`;
    }

    body += `Please let us know your availability index next week.\n\nBest regards,\n${recruiterName || 'Recruitment Team'}\n${recruiterCompany || ''}`;
    
    return `mailto:${personalInfo.email}?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(body)}`;
  };

  const isProjectMatchingFilter = (project: Project) => {
    if (!selectedSkill) return true;
    const skillLower = selectedSkill.toLowerCase();
    
    return project.techStack.some((tech) => {
      const techLower = tech.toLowerCase();
      return techLower.includes(skillLower) || skillLower.includes(techLower);
    });
  };

  const isExperienceMatchingFilter = (exp: Experience) => {
    if (!selectedSkill) return true;
    const skillLower = selectedSkill.toLowerCase();
    
    return (
      exp.role.toLowerCase().includes(skillLower) ||
      exp.company.toLowerCase().includes(skillLower) ||
      exp.bullets.some((b) => b.toLowerCase().includes(skillLower))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600/10 selection:text-blue-700 antialiased" id="portfolio-app">
      
      <nav className="no-print sticky top-0 z-40 h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 shadow-sm" id="main-navigation">
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              R
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 font-display">
              RIJAD ČVORAK
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <div className="hidden sm:flex items-center gap-6 text-xs md:text-sm font-semibold text-slate-500 mr-2">
              <a href="#projects-section" className="hover:text-blue-600 transition-all">Projects</a>
              <a href="#education-section" className="hover:text-blue-600 transition-all">Education</a>
              <a href="#experience-section" className="hover:text-blue-600 transition-all">Experience</a>
            </div>

            <div className="flex bg-slate-100/90 rounded-full p-0.5 border border-slate-200 text-xs">
              <button
                id="view-mode-all"
                onClick={() => setViewMode('all')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
                  viewMode === 'all'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Include retail and research job records to show dual performance"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Standard CV</span>
              </button>
              <button
                id="view-mode-technical"
                onClick={() => setViewMode('technical')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
                  viewMode === 'technical'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Isolate programming experience only for fast screening"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Dev Isolated</span>
              </button>
            </div>

            <button
              id="action-print"
              onClick={handlePrint}
              className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs hover:bg-slate-800 transition-all cursor-pointer font-semibold flex items-center gap-1 shadow-sm"
              title="Prints beautiful custom two-page resume format matching my original template style"
            >
              <Printer className="w-3 h-3" />
              <span>Print CV</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8" id="main-content">
        
        <header className="print-head bg-slate-950 text-white rounded-2xl p-6 sm:p-10 mb-8 sm:mb-12 shadow-md relative overflow-hidden" id="cv-header">
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="no-print inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-400/30 rounded-full text-xs font-semibold tracking-wide text-blue-300">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>University of Sarajevo Student</span>
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-normal text-white">
                {personalInfo.name.toUpperCase()}
              </h1>
              <p className="font-display font-medium text-lg text-sky-400 tracking-wide">
                {personalInfo.title}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed font-sans max-w-xl">
                {personalInfo.subTitle} • I am a Sarajevo-born Developer eager to leverage my analytical mathematical frameworks into technical remote roles.
              </p>
            </div>

            <div className="bg-slate-900/45 border border-slate-800/80 rounded-xl p-4 sm:p-5 md:min-w-[280px] space-y-3.5 shadow-inner" id="header-contact-details">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                Coordinates / Contact
              </h4>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between group">
                  <a 
                    href={`mailto:${personalInfo.email}`} 
                    className="flex items-center gap-2 text-slate-300 hover:text-sky-300 transition-colors"
                    title="Send immediate draft"
                  >
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="font-mono">{personalInfo.email}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(personalInfo.email, 'email')}
                    className="no-print text-slate-500 hover:text-white p-1 rounded hover:bg-slate-850 transition-all opacity-80 group-hover:opacity-100"
                    title="Copy Email Address"
                  >
                    {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between group">
                  <a 
                    href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} 
                    className="flex items-center gap-2 text-slate-300 hover:text-sky-300 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="font-mono">{personalInfo.phone}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                    className="no-print text-slate-500 hover:text-white p-1 rounded hover:bg-slate-850 transition-all opacity-80 group-hover:opacity-100"
                    title="Copy Phone Number"
                  >
                    {copiedText === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{personalInfo.address}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personalInfo.address, 'address')}
                    className="no-print text-slate-500 hover:text-white p-1 rounded hover:bg-slate-850 transition-all opacity-80 group-hover:opacity-100"
                    title="Copy Address"
                  >
                    {copiedText === 'address' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>DOB: {personalInfo.dob}</span>
                </div>
              </div>

              <div className="no-print pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3">
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-sky-400" />
                  <span>GitHub</span>
                </a>
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href={personalInfo.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-sky-400" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="print-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="cv-grid-container">
          
          <aside className="lg:col-span-4 space-y-6 print-full-width">
            
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card" id="profile-section">
              <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full mb-4 border-4 border-blue-100 flex items-center justify-center text-xl font-extrabold font-display shadow-inner">
                RČ
              </div>
              <h1 className="text-xl font-bold leading-tight mb-2 text-slate-900 font-display">
                Profile Summary
              </h1>
              <p className="text-slate-600 text-xs leading-relaxed font-sans text-justify mb-4">
                {personalInfo.profile}
              </p>
              
              <div className="flex gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-1.5" />
                <div className="text-[11px] text-slate-500 font-medium">
                  Status: Open to Remote Internships & Developer Positions
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card" id="skills-section">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span>Technical Skills</span>
                </h3>
                {selectedSkill && (
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="no-print text-[10px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors flex items-center gap-0.5"
                    title="Clear highlights filter"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Clear Filter</span>
                  </button>
                )}
              </div>
              <p className="no-print text-[11px] text-slate-400 leading-normal mb-4 font-sans">
                Click on any system tag below to filter/highlight corresponding projects and work history instances.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Languages & Core Scripting
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.filter((s) => s.category === 'programming').map((s) => {
                      const isActive = selectedSkill === s.name;
                      return (
                        <button
                          key={s.name}
                          onClick={() => setSelectedSkill(isActive ? null : s.name)}
                          className={`cursor-pointer px-2.5 py-1 text-xs rounded-md font-mono font-semibold border transition-all ${
                            isActive
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                              : 'bg-blue-50/50 border-slate-200 text-blue-700 hover:bg-blue-50'
                          }`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Frontend & Structured Web
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.filter((s) => s.category === 'frontend').map((s) => {
                      const isActive = selectedSkill === s.name;
                      return (
                        <button
                          key={s.name}
                          onClick={() => setSelectedSkill(isActive ? null : s.name)}
                          className={`cursor-pointer px-2.5 py-1 text-xs rounded-md font-mono font-semibold border transition-all ${
                            isActive
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                              : 'bg-green-50/50 border-slate-200 text-green-700 hover:bg-green-50'
                          }`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Systems, Databases & Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.filter((s) => s.category === 'database' || s.category === 'systems').map((s) => {
                      const isActive = selectedSkill === s.name;
                      return (
                        <button
                          key={s.name}
                          onClick={() => setSelectedSkill(isActive ? null : s.name)}
                          className={`cursor-pointer px-2.5 py-1 text-xs rounded-md font-mono font-semibold border transition-all ${
                            isActive
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                              : 'bg-purple-50/50 border-slate-200 text-purple-700 hover:bg-purple-50'
                          }`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card" id="languages-section">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Languages</span>
              </h3>
              
              <div className="space-y-4">
                {languages.map((l) => (
                  <div key={l.language} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-850">{l.language}</span>
                      <span className="font-mono text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {l.proficiency}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{
                          width: l.proficiency === 'C2' ? '100%' : l.proficiency === 'B2' ? '75%' : l.proficiency === 'A1' ? '25%' : '12%'
                        }}
                      />
                    </div>
                    {l.details && (
                      <p className="text-[10px] text-slate-400 italic">
                        {l.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card" id="qualities-section">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Core Qualities</span>
              </h3>

              <div className="space-y-4">
                {coreQualities.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-semibold text-slate-800">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed leading-snug">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </aside>

          <section className="lg:col-span-8 space-y-8 print-full-width">
            
            <div className="no-print space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-slate-400" />
                  <span>Interactive Proof Sandbox</span>
                </span>
                <span className="text-[10px] bg-sky-50 text-sky-600 font-semibold px-2 py-0.5 rounded border border-sky-100">
                  Live Execution
                </span>
              </div>
              <AlgorithmVisualizer />
            </div>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm print-card print-border-top" id="projects-section">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Projects & Technical Experience</span>
                </h3>
                <span className="no-print text-[11px] font-mono font-medium text-slate-400">
                  Interactive Live Focus
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj, idx) => {
                  const matchesFilter = isProjectMatchingFilter(proj);
                  const isFiltered = selectedSkill !== null;
                  
                  return (
                    <article 
                      key={proj.title}
                      className={`group rounded-xl border p-4 sm:p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${
                        isFiltered
                          ? matchesFilter
                            ? 'bg-blue-50/20 border-blue-300 ring-2 ring-blue-500/10 scale-100'
                            : 'opacity-30 border-slate-200 scale-98 pointer-events-none'
                          : 'bg-white border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      <div>
                        <div className="no-print h-32 bg-slate-950 rounded-lg mb-4 p-3 flex flex-col justify-between overflow-hidden relative border border-slate-800 shadow-inner">
                          <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />

                          {idx === 0 && (
                            <div className="w-full h-full flex flex-col justify-between relative z-10">
                              <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono pb-1 border-b border-slate-800">
                                <div className="flex gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <span className="text-[8px] italic text-slate-500 truncate max-w-[120px]">craftsmen-association.ba/admin</span>
                              </div>
                              <div className="flex-1 flex items-center justify-center py-2">
                                <div className="w-full max-w-[140px] space-y-1.5">
                                  <div className="h-2 bg-blue-500/30 rounded w-full animate-pulse" />
                                  <div className="h-1.5 bg-slate-800 rounded w-3/4" />
                                  <div className="h-1.5 bg-slate-850 rounded w-5/6" />
                                </div>
                              </div>
                              <div className="text-[8px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded w-fit border border-cyan-900/40">
                                UI STATUS: RESPONSIVE ONLINE
                              </div>
                            </div>
                          )}

                          {idx === 1 && (
                            <div className="w-full h-full flex flex-col justify-between relative z-10">
                              <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                                <span>Engine: Roblox Platform</span>
                                <span className="text-emerald-400 animate-pulse">● PLAYING</span>
                              </div>
                              <div className="flex-1 flex gap-2 items-center justify-center">
                                <div className="w-7 h-7 bg-red-500/20 border border-red-500/40 rounded flex items-center justify-center">
                                  <span className="text-[10px] text-red-400 font-bold">☠</span>
                                </div>
                                <div className="space-y-1 flex-1">
                                  <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                                    <span>HP: 92%</span>
                                    <span>XP: Lv.4</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[92%]" />
                                  </div>
                                </div>
                              </div>
                              <div className="text-[8px] font-mono text-purple-400 bg-purple-950/40 px-1.5 py-0.5 rounded w-fit border border-purple-900/40">
                                2D ROGUELIKE VECTOR ALGEBRA
                              </div>
                            </div>
                          )}

                          {idx === 2 && (
                            <div className="w-full h-full flex flex-col justify-between relative z-10">
                              <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                                <span>Geometry canvas.js</span>
                                <span className="text-amber-400">FPS: 60</span>
                              </div>
                              <div className="flex items-end justify-center gap-1.5 h-10 py-1">
                                <div className="w-1.5 bg-slate-800 rounded-t h-[40%]" />
                                <div className="w-1.5 bg-slate-800 rounded-t h-[65%]" />
                                <div className="w-1.5 bg-blue-500 rounded-t h-[90%] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                <div className="w-1.5 bg-slate-800 rounded-t h-[30%]" />
                                <div className="w-1.5 bg-slate-800 rounded-t h-[75%]" />
                              </div>
                              <div className="text-[8px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded w-fit border border-amber-900/40">
                                MATRIX SORT PROOFS: ACTIVE
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-start justify-between gap-2.5 mb-2.5">
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 flex-wrap font-display">
                              <span>{proj.title}</span>
                              {isFiltered && matchesFilter && (
                                <span className="inline-flex items-center gap-0.5 text-[8px] bg-blue-600 text-white font-mono font-extrabold px-1.5 py-0.2 rounded-full h-fit animate-pulse">
                                  Matches Focus
                                </span>
                              )}
                            </h4>
                            <p className="text-xs text-slate-400 font-medium">
                              {proj.organization}
                            </p>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-500 mb-4 list-none pl-0 leading-relaxed">
                          {proj.description.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-2 items-start text-justify">
                              <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0 mt-2" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                        {proj.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                              selectedSkill && tech.toLowerCase().includes(selectedSkill.toLowerCase())
                                ? 'bg-blue-600 text-white shadow-xs font-bold'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm print-card print-border-top" id="education-section">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Education</span>
              </h3>

              <div className="space-y-6">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-200 space-y-1.5">
                    <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 font-display">
                        {edu.institution}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">
                        {edu.locationAndDuration}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 font-semibold font-display">
                      {edu.degreeOrStatus}
                    </p>
                    {edu.description && (
                      <p className="text-xs text-slate-500 leading-relaxed font-sans text-justify">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm print-card print-border-top" id="experience-section">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Professional Work History</span>
                </h3>
              </div>

              {viewMode === 'technical' && (
                <div className="mb-4 bg-blue-50/50 rounded-xl p-3 border border-blue-100 text-xs text-slate-600 leading-relaxed">
                  <strong>Dev Mode Active:</strong> Hiding non-technical / service roles (Sarajevski Kiseljak) to focus screens purely on technical support and remote analysis roles (Ipsos Market surveys are still visible). Switch back to <strong>"Standard CV"</strong> in the top menu to view my full work ethic and multi-tasking details.
                </div>
              )}

              <div className="space-y-4">
                {experiences
                  .filter((exp) => {
                    if (viewMode === 'technical') {
                      return exp.company.toLowerCase().includes('ipsos');
                    }
                    return true;
                  })
                  .map((exp) => {
                    const matchesFilter = isExperienceMatchingFilter(exp);
                    const isFiltered = selectedSkill !== null;
                    const monogram = exp.company.substring(0, 2).toUpperCase();
                    
                    return (
                      <div 
                        key={exp.role} 
                        className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                          isFiltered
                            ? matchesFilter
                              ? 'bg-blue-50/10 border-blue-150 ring-1 ring-blue-400/20'
                              : 'opacity-40 border-transparent scale-98'
                            : 'border-transparent hover:bg-slate-50'
                        }`}
                      >
                        <div className="no-print shrink-0 w-10 h-10 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-extrabold text-slate-600 shadow-inner font-display">
                          {monogram}
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4 className="text-xs font-extrabold text-slate-900 font-display">
                              {exp.role}
                            </h4>
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              {exp.locationAndDuration}
                            </span>
                          </div>
                          
                          <p className="text-xs text-blue-600 font-semibold mb-1">
                            {exp.company}
                          </p>

                          <ul className="space-y-1 text-xs text-slate-500 list-none pl-0 leading-relaxed">
                            {exp.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="flex gap-2 items-start text-justify">
                                <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0 mt-2" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>

            <section className="no-print bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800" id="recruiter-toolkit">
              
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1 px-2.5 bg-sky-500/10 border border-sky-500/30 rounded-lg text-xs font-mono text-sky-400 h-fit self-center">
                  Recruiter Tool
                </span>
                <h3 className="font-display font-bold text-base text-white">
                  Get In Touch / Schedule Interactive Meet
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Fill in your recruitment coordinates to generate a custom pre-composed email draft sending directly to me. Fast, structured, and friction-free.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Contact Name
                  </label>
                  <input
                    id="input-recruiter-name"
                    type="text"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-100 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Company / Organization
                  </label>
                  <input
                    id="input-recruiter-company"
                    type="text"
                    value={recruiterCompany}
                    onChange={(e) => setRecruiterCompany(e.target.value)}
                    placeholder="e.g. Tech Corp"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-100 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3.5 mb-6">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  Meeting Goal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    id="meet-type-interview"
                    type="button"
                    onClick={() => setMeetingType('interview')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      meetingType === 'interview'
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Invitation for Interview
                  </button>
                  <button
                    id="meet-type-chemistry"
                    type="button"
                    onClick={() => setMeetingType('chemistry')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      meetingType === 'chemistry'
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    15 Min Chat
                  </button>
                  <button
                    id="meet-type-custom"
                    type="button"
                    onClick={() => setMeetingType('custom')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      meetingType === 'custom'
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Custom Note
                  </button>
                </div>

                {meetingType === 'custom' && (
                  <textarea
                    id="textarea-custom-message"
                    rows={2.5}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Write a custom paragraph describing your opening..."
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-100 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                )}
              </div>

              <a 
                href={getPrecomposedEmail()}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg text-xs font-semibold shadow-xs transition-all text-center"
                id="btn-recruiter-mail-trigger"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Precomposed Email Client</span>
              </a>
            </section>

          </section>

        </div>

      </main>

      <footer className="no-print mt-16 bg-white border-t border-slate-200 h-16 flex flex-col sm:flex-row items-center justify-between px-8 py-4 text-xs text-slate-400 shrink-0" id="footer-section">
        <div>
          <span className="font-semibold text-slate-600 font-display">{personalInfo.name}</span> @ {new Date().getFullYear()}
        </div>
        
        <div className="flex gap-4 uppercase tracking-wider font-semibold items-center text-[10px] mt-2 sm:mt-0 font-mono">
          <span>Optimized for PDF Printing</span>
          <span className="text-slate-200">|</span>
          <span className="flex items-center gap-1 text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span> Live Status: Active</span>
          </span>
        </div>
      </footer>

    </div>
  );
}
