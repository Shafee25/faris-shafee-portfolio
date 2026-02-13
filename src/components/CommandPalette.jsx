import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { 
  Home, FileText, Code, Briefcase, Mail, Github, Linkedin, 
  Terminal, Search, ExternalLink, Moon, Sun 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle with Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  // Fun Surprise
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <>
      {/* Floating Hint (Only visible on desktop) */}
      <div 
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-20 hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:border-highlight cursor-pointer transition-all z-40 group"
      >
        <span className="group-hover:text-highlight transition-colors">Command Mode</span>
        <kbd className="bg-white/10 px-1.5 rounded text-[10px] font-sans">Ctrl</kbd> 
        <span className="text-[10px]">+</span> 
        <kbd className="bg-white/10 px-1.5 rounded text-[10px] font-sans">K</kbd>
      </div>

      <Command.Dialog 
        open={open} 
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] bg-[#0A1619] border border-[#1F4E56] rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center border-b border-white/10 px-4">
          <Search size={20} className="text-gray-500 mr-2" />
          <Command.Input 
            placeholder="Type a command or search..."
            className="w-full bg-transparent py-4 text-white text-lg outline-none placeholder:text-gray-600 font-medium"
          />
          <div className="text-xs text-gray-600 font-mono border border-gray-800 px-1.5 rounded">ESC</div>
        </div>
        
        <Command.List className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
          <Command.Empty className="py-6 text-center text-gray-500 text-sm">No results found.</Command.Empty>

          <Command.Group heading="Navigation" className="text-xs font-bold text-gray-500 mb-2 px-2 mt-2">
            <Command.Item onSelect={() => runCommand(() => navigate('/'))} className="palette-item">
              <Home size={16} /> Home
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/blog'))} className="palette-item">
              <FileText size={16} /> Read Blog
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => { navigate('/'); setTimeout(() => document.getElementById('projects').scrollIntoView(), 100); })} className="palette-item">
              <Code size={16} /> View Projects
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => { navigate('/'); setTimeout(() => document.getElementById('about').scrollIntoView(), 100); })} className="palette-item">
              <Briefcase size={16} /> Experience & Skills
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Socials" className="text-xs font-bold text-gray-500 mb-2 px-2 mt-4">
            <Command.Item onSelect={() => runCommand(() => window.open('https://github.com/Shafee25', '_blank'))} className="palette-item">
              <Github size={16} /> GitHub
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => window.open('https://linkedin.com/in/shafee-ahamed', '_blank'))} className="palette-item">
              <Linkedin size={16} /> LinkedIn
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => window.location.href = 'mailto:shafeeahamed494@gmail.com')} className="palette-item">
              <Mail size={16} /> Send Email
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions" className="text-xs font-bold text-gray-500 mb-2 px-2 mt-4">
            <Command.Item onSelect={() => runCommand(() => navigate('/admin'))} className="palette-item">
              <Terminal size={16} /> Admin Dashboard
            </Command.Item>
            <Command.Item onSelect={() => runCommand(triggerConfetti)} className="palette-item text-highlight">
              <Sun size={16} /> Surprise Me! (Confetti)
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="border-t border-white/10 px-4 py-2 flex justify-between items-center text-[10px] text-gray-500 bg-black/20">
           <span>Use arrows to navigate, Enter to select</span>
           <span>Faris.Dev v1.0</span>
        </div>
      </Command.Dialog>

      <style>{`
        .palette-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #d1d5db;
          font-size: 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        /* Highlight state managed by cmdk */
        [cmdk-item][data-selected='true'] {
          background: #1F4E56;
          color: white;
        }
        [cmdk-group-heading] {
          padding-left: 8px;
          margin-bottom: 4px;
        }
      `}</style>
    </>
  );
};

export default CommandPalette;