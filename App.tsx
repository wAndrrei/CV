
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import SkillBadge from './components/SkillBadge';
import ProjectCard from './components/ProjectCard';
import TimelineItem from './components/TimelineItem';
import ContactForm from './components/ContactForm';
import { CV_DATA } from './constants';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className="min-h-screen transition-theme">
      <Navbar onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Hero data={CV_DATA.personalInfo} />

        <Section title="Experiență" id="experience" icon="fa-briefcase">
          <div className="space-y-8">
            {CV_DATA.experiences.map((exp, idx) => (
              <TimelineItem key={idx} experience={exp} />
            ))}
          </div>
        </Section>

        <Section title="Abilități" id="skills" icon="fa-code">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(['Frontend', 'Backend', 'Tools', 'Soft Skills'] as const).map(category => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 text-blue-500">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CV_DATA.skills
                    .filter(skill => skill.category === category)
                    .map((skill, idx) => (
                      <SkillBadge key={idx} skill={skill} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Proiecte" id="projects" icon="fa-laptop-code">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CV_DATA.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </Section>

        <Section title="Contact" id="contact" icon="fa-paper-plane">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Sunt mereu deschis pentru a discuta proiecte noi, idei creative sau oportunități de a face parte din viziunile tale.
              </p>
              <div className="space-y-4">
                <ContactInfo icon="fa-envelope" label="Email" value={CV_DATA.personalInfo.email} />
                <ContactInfo icon="fa-phone" label="Telefon" value={CV_DATA.personalInfo.phone} />
                <ContactInfo icon="fa-location-dot" label="Locație" value={CV_DATA.personalInfo.location} />
              </div>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-200 dark:border-slate-900">
        © {new Date().getFullYear()} {CV_DATA.personalInfo.name}. Construit cu React & Tailwind CSS.
      </footer>
    </div>
  );
};

const ContactInfo: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
      <i className={`fas ${icon}`}></i>
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{label}</p>
      <p className="text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  </div>
);

export default App;
