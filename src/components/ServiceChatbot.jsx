// F:\Web Technology\VS CODE\Static\3D Portfolio\src\components\ServiceChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MessageCircle, Check, ArrowRight, 
  Phone, Mail, Briefcase, Users,
  TrendingUp, Globe, Palette, Zap,
  Send, Sparkles, Bot, ChevronRight,
  Building2, Smartphone, Monitor,
  Cpu, MessageSquare, Zap as Lightning,
  Brain, Cpu as CpuIcon, ExternalLink
} from 'lucide-react';

const ServiceChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [chatState, setChatState] = useState('welcome');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "",
      type: 'bot',
      options: [],
      isTyping: true
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(true);
  const [pulseColor, setPulseColor] = useState('cyan');
  
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Reset chat when opened
  useEffect(() => {
    if (isOpen && !isClosing) {
      // Reset to initial state if this is a fresh open (not reopening after close animation)
      const initialMessage = "Hi there! 👋 I'm SIBANANDA's assistant. Ready to discover how I can help your business grow? Let's start by exploring services tailored for you.";
      
      setMessages([{
        id: 1,
        text: "",
        type: 'bot',
        options: [],
        isTyping: true
      }]);
      
      // Start typing animation
      let i = 0;
      const typeWriter = () => {
        if (i < initialMessage.length) {
          setMessages(prev => [{
            ...prev[0],
            text: initialMessage.substring(0, i + 1),
            isTyping: true
          }]);
          i++;
          setTimeout(typeWriter, 30);
        } else {
          setMessages(prev => [{
            ...prev[0],
            isTyping: false,
            options: [
              { text: '🚀 Explore Services', action: 'showServices', variant: 'primary' },
              { text: '💬 Quick Chat', action: 'contactDirect', variant: 'secondary' }
            ]
          }]);
          setIsTyping(false);
        }
      };
      
      setTimeout(() => {
        typeWriter();
      }, 500);
      
      // Reset other states
      setSelectedServices([]);
      setSelectedNiches([]);
      setChatState('welcome');
    }
  }, [isOpen, isClosing]);

  // Prevent body scroll when chatbot is open
  useEffect(() => {
    if (isOpen && !isClosing) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width)';
      // Change pulse color when opening
      const colors = ['cyan', 'purple', 'pink', 'magenta'];
      let index = 0;
      const interval = setInterval(() => {
        setPulseColor(colors[index]);
        index = (index + 1) % colors.length;
      }, 2000);
      
      return () => clearInterval(interval);
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    };
  }, [isOpen, isClosing]);

  // Calculate scrollbar width
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);

  // Services data
  const services = {
    'Digital Marketing': {
      icon: TrendingUp,
      subServices: ['Facebook Ads', 'Google Ads', 'SEO', 'Social Media'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10'
    },
    'Web Development': {
      icon: Globe,
      subServices: ['Website Creation', 'E-commerce', 'Web Apps', 'WordPress'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-r from-purple-500/10 to-pink-500/10'
    },
    'Design & Creative': {
      icon: Palette,
      subServices: ['Graphic Design', 'Video Editing', 'UI/UX', 'Branding'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-r from-orange-500/10 to-red-500/10'
    },
    'Business Support': {
      icon: Briefcase,
      subServices: ['Virtual Assistant', 'Customer Support', 'Project Management', 'Automation'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-r from-green-500/10 to-emerald-500/10'
    },
    'AI & Automation': {
      icon: Cpu,
      subServices: ['AI Agents', 'Chatbots', 'Process Automation', 'AI Integration'],
      color: 'from-indigo-500 to-violet-500',
      bgColor: 'bg-gradient-to-r from-indigo-500/10 to-violet-500/10'
    }
  };

  const nichesByService = {
    'Digital Marketing': ['E-commerce', 'Agencies', 'Health & Wellness', 'Tech Startups'],
    'Web Development': ['SaaS', 'E-commerce', 'Healthcare', 'Education'],
    'Design & Creative': ['Creative Agencies', 'Fashion', 'Food & Beverage', 'Technology'],
    'Business Support': ['Startups', 'E-commerce', 'Consulting', 'Professional Services'],
    'AI & Automation': ['Tech Startups', 'SaaS', 'E-commerce', 'Fintech']
  };

  const allNiches = [
    'E-commerce', 'Startups', 'Healthcare', 'Education',
    'Real Estate', 'Technology', 'Food & Beverage', 'Fashion',
    'Finance', 'Travel', 'Entertainment', 'Manufacturing'
  ];

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add typing animation for bot messages
  const addBotMessage = (text, type = 'text', options = []) => {
    // Clear any existing typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setIsTyping(true);
    
    // Add typing indicator message
    const typingMessage = {
      id: Date.now(),
      text: '',
      type: 'typing',
      isTyping: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, typingMessage]);
    
    // Simulate typing after a delay
    typingTimeoutRef.current = setTimeout(() => {
      // Remove typing indicator
      setMessages(prev => prev.filter(m => m.type !== 'typing'));
      
      // Add actual message with typing effect
      const actualMessage = {
        id: Date.now() + 1,
        text: '',
        type,
        options: [],
        isTyping: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, actualMessage]);
      
      // Type out the message
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.type === type) {
              lastMessage.text = text.substring(0, i + 1);
              lastMessage.isTyping = true;
            }
            return newMessages;
          });
          i++;
          setTimeout(typeWriter, 20);
        } else {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.type === type) {
              lastMessage.isTyping = false;
              lastMessage.options = options;
            }
            return newMessages;
          });
          setIsTyping(false);
        }
      };
      
      setTimeout(typeWriter, 300);
    }, 800);
  };

  const closeAndRedirect = (url) => {
    // Start closing animation
    setIsClosing(true);
    
    // Close chat with animation
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      
      // Redirect after chat is closed
      setTimeout(() => {
        window.open(url, '_blank');
      }, 100);
    }, 500);
  };

  const handleOptionClick = (action, value = null) => {
    // Add user selection to messages
    if (value) {
      const userMessage = {
        id: Date.now(),
        text: value,
        type: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
    }
    
    switch(action) {
      case 'showServices':
        setChatState('services');
        addBotMessage("Here are my core service offerings. Select one or multiple services that match your needs:", 'servicesList');
        break;
      
      case 'selectService':
        if (value) {
          const isSelected = selectedServices.includes(value);
          if (isSelected) {
            setSelectedServices(prev => prev.filter(s => s !== value));
          } else {
            setSelectedServices(prev => [...prev, value]);
          }
        }
        break;
      
      case 'continueToNiches':
        if (selectedServices.length === 0) {
          addBotMessage("Please select at least one service to continue.", 'error');
        } else {
          setChatState('niches');
          const nicheMessage = selectedServices.length === 1 
            ? `Perfect choice! For **${selectedServices[0]}**, here are relevant industries. Select yours:`
            : `Great selections! Now let's match these with your industry. Choose from below:`;
          addBotMessage(nicheMessage, 'nichesList');
        }
        break;
      
      case 'selectNiche':
        if (value) {
          const isSelected = selectedNiches.includes(value);
          if (isSelected) {
            setSelectedNiches(prev => prev.filter(n => n !== value));
          } else {
            setSelectedNiches(prev => [...prev, value]);
          }
        }
        break;
      
      case 'continueToContact':
        if (selectedNiches.length === 0) {
          addBotMessage("Please select at least one industry to continue.", 'error');
        } else {
          setChatState('contact');
          const serviceText = selectedServices.join(', ');
          const nicheText = selectedNiches.join(', ');
          addBotMessage(`Perfect match! **Services:** ${serviceText}\n**Industry:** ${nicheText}\n\nNow, connect with SIBANANDA using your preferred method:`, 'contactOptions');
        }
        break;
      
      case 'contactDirect':
        setChatState('contact');
        addBotMessage("Connect directly with SIBANANDA. Choose how you'd like to reach out:", 'contactOptions');
        break;
      
      case 'startOver':
        setSelectedServices([]);
        setSelectedNiches([]);
        setChatState('welcome');
        addBotMessage("Let's start fresh! Ready to explore how SIBANANDA can help your business grow?", 'text', [
          { text: '🚀 Explore Services', action: 'showServices', variant: 'primary' },
          { text: '💬 Quick Chat', action: 'contactDirect', variant: 'secondary' }
        ]);
        break;
      
      case 'whatsapp':
        const serviceText = selectedServices.length > 0 
          ? `Services: ${selectedServices.join(', ')}. `
          : '';
        const nicheText = selectedNiches.length > 0 
          ? `Industry: ${selectedNiches.join(', ')}. `
          : '';
        const message = `Hi SIBANANDA! I'm interested in your services. ${serviceText}${nicheText}Let's discuss how you can help my business!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919692199548?text=${encodedMessage}`;
        
        // Add confirmation message
        addBotMessage("Perfect! Redirecting you to WhatsApp to connect with SIBANANDA...", 'redirect', [
          { text: '🎉 Open WhatsApp Now', action: 'confirmWhatsapp', variant: 'primary' }
        ]);
        
        // Set timeout for automatic redirect
        setTimeout(() => {
          closeAndRedirect(whatsappUrl);
        }, 2000);
        break;
      
      case 'confirmWhatsapp':
        const whatsappServiceText = selectedServices.length > 0 
          ? `Services: ${selectedServices.join(', ')}. `
          : '';
        const whatsappNicheText = selectedNiches.length > 0 
          ? `Industry: ${selectedNiches.join(', ')}. `
          : '';
        const whatsappFinalMessage = `Hi SIBANANDA! I'm interested in your services. ${whatsappServiceText}${whatsappNicheText}Let's discuss how you can help my business!`;
        const encodedWhatsappMessage = encodeURIComponent(whatsappFinalMessage);
        const finalWhatsappUrl = `https://wa.me/919692199548?text=${encodedWhatsappMessage}`;
        closeAndRedirect(finalWhatsappUrl);
        break;
      
      case 'email':
        const subject = selectedServices.length > 0 
          ? `Service Inquiry: ${selectedServices.join(', ')}`
          : 'Service Inquiry';
        const body = `
Services Interested: ${selectedServices.join(', ') || 'Not specified'}
Industry: ${selectedNiches.join(', ') || 'Not specified'}

Hello SIBANANDA,

I visited your portfolio and I'm interested in your services. Please get back to me at your earliest convenience.

Best regards`;
        const encodedBody = encodeURIComponent(body.trim());
        const emailUrl = `mailto:work.sibananda@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
        
        // Add confirmation message
        addBotMessage("Great! Opening your email client to send a message to SIBANANDA...", 'redirect', [
          { text: '📧 Open Email Now', action: 'confirmEmail', variant: 'primary' }
        ]);
        
        // Set timeout for automatic redirect
        setTimeout(() => {
          closeAndRedirect(emailUrl);
        }, 2000);
        break;
      
      case 'confirmEmail':
        const emailSubject = selectedServices.length > 0 
          ? `Service Inquiry: ${selectedServices.join(', ')}`
          : 'Service Inquiry';
        const emailBody = `
Services Interested: ${selectedServices.join(', ') || 'Not specified'}
Industry: ${selectedNiches.join(', ') || 'Not specified'}

Hello SIBANANDA,

I visited your portfolio and I'm interested in your services. Please get back to me at your earliest convenience.

Best regards`;
        const encodedEmailBody = encodeURIComponent(emailBody.trim());
        const finalEmailUrl = `mailto:work.sibananda@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodedEmailBody}`;
        closeAndRedirect(finalEmailUrl);
        break;
    }
  };

  const renderServices = () => {
    return (
      <div className="grid grid-cols-1 gap-3 mt-3">
        {Object.entries(services).map(([service, data]) => {
          const Icon = data.icon;
          const isSelected = selectedServices.includes(service);
          
          return (
            <motion.button
              key={service}
              onClick={() => handleOptionClick('selectService', service)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative p-4 rounded-xl border transition-all duration-300 ${
                isSelected 
                  ? `border-transparent ${data.bgColor} border-l-4 border-cyan-400 shadow-lg`
                  : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20' : 'bg-slate-700/30 group-hover:bg-slate-700/50'}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`} />
                  </div>
                  <div className="text-left">
                    <h4 className={`font-semibold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {service}
                    </h4>
                    <p className="text-xs opacity-70 mt-1">
                      {data.subServices.slice(0, 2).join(' • ')}...
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-cyan-500/20 px-2 py-1 rounded text-cyan-300">Selected</span>
                    <Check className="w-4 h-4 text-cyan-300" />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
        
        <motion.button
          onClick={() => handleOptionClick('continueToNiches')}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 py-3.5 px-6 bg-gradient-to-r from-cyan-500 via-magenta-500 to-blue-600 rounded-xl text-white font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all"
        >
          <span>Continue to Industries</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    );
  };

  const renderNiches = () => {
    let relevantNiches = [];
    if (selectedServices.length === 1) {
      relevantNiches = nichesByService[selectedServices[0]] || [];
    } else {
      selectedServices.forEach(service => {
        if (nichesByService[service]) {
          relevantNiches = [...new Set([...relevantNiches, ...nichesByService[service]])];
        }
      });
    }
    
    const displayNiches = relevantNiches.length > 0 ? relevantNiches : allNiches.slice(0, 8);

    return (
      <div className="mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {displayNiches.map((niche) => {
            const isSelected = selectedNiches.includes(niche);
            
            return (
              <motion.button
                key={niche}
                onClick={() => handleOptionClick('selectNiche', niche)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg text-sm transition-all flex items-center justify-center ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-lg'
                    : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
              >
                <span className="truncate">{niche}</span>
                {isSelected && <Check className="w-3 h-3 ml-2 flex-shrink-0" />}
              </motion.button>
            );
          })}
        </div>
        
        <div className="flex gap-3 mt-6">
          <motion.button
            onClick={() => handleOptionClick('continueToContact')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3.5 bg-gradient-to-r from-cyan-500 via-magenta-500 to-blue-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all"
          >
            Continue
          </motion.button>
          
          <button
            onClick={() => handleOptionClick('contactDirect')}
            className="px-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:border-slate-600 hover:bg-slate-800/80 transition-all"
          >
            Skip
          </button>
        </div>
      </div>
    );
  };

  const renderContactOptions = () => {
    return (
      <div className="mt-4 space-y-4">
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group"
        >
          <button
            onClick={() => handleOptionClick('whatsapp')}
            className="w-full p-5 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-2xl text-white text-left hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 border border-green-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg">WhatsApp Chat</h4>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </div>
                <p className="text-sm opacity-90 mt-1">Instant conversation with SIBANANDA</p>
                <div className="mt-3 text-xs bg-white/10 rounded-lg px-3 py-2 inline-block">
                  Pre-filled with your selections
                </div>
              </div>
            </div>
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group"
        >
          <button
            onClick={() => handleOptionClick('email')}
            className="w-full p-5 bg-gradient-to-br from-cyan-500 via-blue-600 to-magenta-500 rounded-2xl text-white text-left hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 border border-cyan-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                <Monitor className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg">Professional Email</h4>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </div>
                <p className="text-sm opacity-90 mt-1">Detailed inquiry with full context</p>
                <div className="mt-3 text-xs bg-white/10 rounded-lg px-3 py-2 inline-block">
                  Structured template ready
                </div>
              </div>
            </div>
          </button>
        </motion.div>

        <button
          onClick={() => handleOptionClick('startOver')}
          className="w-full py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:border-slate-600 hover:bg-slate-800/80 transition-all group"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Start New Journey</span>
          </div>
        </button>
      </div>
    );
  };

  const renderRedirectMessage = () => {
    const isWhatsapp = messages[messages.length - 1]?.text?.includes('WhatsApp');
    
    return (
      <div className="mt-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl border border-cyan-400/30 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg">
              <ExternalLink className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">Redirecting you...</h4>
              <p className="text-sm text-cyan-300">Chat will close automatically</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => handleOptionClick(isWhatsapp ? 'confirmWhatsapp' : 'confirmEmail')}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Open Now
            </button>
            
            <button
              onClick={() => handleOptionClick('startOver')}
              className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:border-slate-600 hover:bg-slate-800/80 transition-all"
            >
              Cancel
            </button>
          </div>
          
          <div className="mt-4">
            <div className="h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "linear" }}
                onAnimationComplete={() => {
                  // Auto-redirect when animation completes
                  const isWhatsapp = messages[messages.length - 1]?.text?.includes('WhatsApp');
                  if (isWhatsapp) {
                    handleOptionClick('confirmWhatsapp');
                  } else {
                    handleOptionClick('confirmEmail');
                  }
                }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">Auto-redirect in 2 seconds</p>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderSelectionSummary = () => {
    if (selectedServices.length === 0 && selectedNiches.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-gradient-to-r from-slate-800/40 to-slate-900/40 rounded-xl border border-slate-700/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-3">
          <Check className="w-4 h-4 text-cyan-400" />
          <h4 className="font-semibold text-slate-200">Your Selections</h4>
        </div>
        
        {selectedServices.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-slate-400 mb-2">Selected Services</p>
            <div className="flex flex-wrap gap-2">
              {selectedServices.map(service => (
                <span key={service} className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm text-cyan-300 flex items-center gap-2">
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {selectedNiches.length > 0 && (
          <div>
            <p className="text-xs text-slate-400 mb-2">Target Industries</p>
            <div className="flex flex-wrap gap-2">
              {selectedNiches.map(niche => (
                <span key={niche} className="px-3 py-1.5 bg-magenta-500/10 border border-magenta-500/30 rounded-lg text-sm text-magenta-300 flex items-center gap-2">
                  <Building2 className="w-3 h-3" />
                  {niche}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // Render typing indicator
  const renderTypingIndicator = () => (
    <div className="flex items-start gap-3 mb-4">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-magenta-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md animate-gradient">
          <Brain className="w-4 h-4 text-white" />
        </div>
        {/* Animated dot */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-slate-900 animate-pulse"></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-magenta-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-xs text-cyan-400 mt-2">Assistant is typing...</p>
        </div>
      </div>
    </div>
  );

  const getPulseColorClass = () => {
    switch(pulseColor) {
      case 'cyan': return 'border-cyan-400';
      case 'purple': return 'border-purple-400';
      case 'pink': return 'border-pink-400';
      case 'magenta': return 'border-magenta-400';
      default: return 'border-cyan-400';
    }
  };

  // Animated gradient bot icon component
  const AnimatedBotIcon = () => (
    <div className="relative">
      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-magenta-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg animate-gradient">
        <Brain className="w-6 h-6 text-white" />
      </div>
      {/* Animated glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-magenta-400/20 to-blue-400/20 rounded-xl animate-pulse"></div>
      {/* Animated dot */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
    </div>
  );

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-magenta-500 to-blue-500 rounded-full"></div>
        
        <motion.div
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <MessageSquare className="w-6 h-6 text-white relative z-10" />
        </motion.div>
        
        {/* Animated pulse ring with gradient */}
        <motion.div
          className="absolute inset-0 border-2 border-cyan-400/50 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Gradient pulse ring */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-full"
          style={{
            background: 'linear-gradient(45deg, #06b6d4, #ec4899, #3b82f6)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner glow */}
        <div className="absolute inset-2 bg-cyan-400/10 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Overlay to prevent homepage scroll */}
      <AnimatePresence>
        {(isOpen && !isClosing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99]"
            onClick={() => {
              setIsClosing(true);
              setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
              }, 500);
            }}
          />
        )}
      </AnimatePresence>

      {/* Chat Window - Fixed for desktop mode */}
      <AnimatePresence>
        {(isOpen && !isClosing) && (
          <motion.div
            ref={chatbotRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 20,
              transition: { duration: 0.3 }
            }}
            className="fixed inset-0 sm:inset-auto sm:top-24 sm:right-6 z-[100] 
                       w-full sm:w-[500px] h-full sm:h-[700px] 
                       bg-slate-900/95 backdrop-blur-xl 
                       border border-cyan-400/20 shadow-2xl shadow-cyan-500/10
                       flex flex-col overflow-hidden
                       sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed position for desktop */}
            <div className="relative z-20 bg-gradient-to-r from-cyan-500/20 via-magenta-500/20 to-blue-500/20 p-4 border-b border-cyan-400/20 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AnimatedBotIcon />
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">SIBANANDA's Service Assistant</h3>
                    <p className="text-cyan-300 text-sm">Always Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsClosing(true);
                      setTimeout(() => {
                        setIsOpen(false);
                        setIsClosing(false);
                      }, 500);
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-4 pt-6 chat-scrollbar"
              style={{ height: 'calc(100% - 160px)' }}
            >
              <div className="space-y-4 pb-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: message.type === 'user' ? 10 : -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="message-container"
                    >
                      {message.type === 'typing' ? (
                        renderTypingIndicator()
                      ) : message.type === 'user' ? (
                        // User message
                        <div className="flex items-start gap-3 justify-end mb-4">
                          <div className="flex-1 min-w-0 max-w-[85%]">
                            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 border border-cyan-400/30 backdrop-blur-sm">
                              <p className="text-white leading-relaxed text-sm">
                                {message.text}
                              </p>
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ) : message.type === 'redirect' ? (
                        // Redirect message
                        <div className="flex items-start gap-3 mb-4">
                          <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-magenta-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md animate-gradient">
                              <Brain className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
                              <p className="text-slate-100 leading-relaxed whitespace-pre-line text-sm">
                                {message.text}
                              </p>
                              {renderRedirectMessage()}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Bot message
                        <div className="flex items-start gap-3 mb-4">
                          <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-magenta-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md animate-gradient">
                              <Brain className="w-4 h-4 text-white" />
                            </div>
                            {/* Animated dot */}
                            {message.isTyping && (
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-slate-900 animate-pulse"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
                              <p className="text-slate-100 leading-relaxed whitespace-pre-line text-sm">
                                {message.text}
                                {message.isTyping && (
                                  <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-0.5 animate-pulse align-middle"></span>
                                )}
                              </p>
                              
                              {message.isTyping ? (
                                <div className="mt-2">
                                  <div className="flex items-center space-x-1">
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                                    <div className="w-1.5 h-1.5 bg-magenta-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                  </div>
                                </div>
                              ) : message.options && message.options.length > 0 && (
                                <div className="space-y-2 mt-3">
                                  {message.options.map((option, idx) => (
                                    <motion.button
                                      key={idx}
                                      onClick={() => handleOptionClick(option.action, option.value)}
                                      whileHover={{ scale: 1.02, y: -1 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${
                                        option.variant === 'primary'
                                          ? 'bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border-cyan-500/30 text-white hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-magenta-500/30'
                                          : 'bg-slate-800/30 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm">{option.text.split(' ')[0]}</span>
                                        <span className="text-xs">{option.text.split(' ').slice(1).join(' ')}</span>
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>
                              )}
                              
                              {message.type === 'servicesList' && renderServices()}
                              {message.type === 'nichesList' && renderNiches()}
                              {message.type === 'contactOptions' && renderContactOptions()}
                              
                              {message.type === 'error' && (
                                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
                                  <div className="flex items-center gap-2">
                                    <X className="w-3 h-3" />
                                    <span>{message.text}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Current typing indicator */}
                {isTyping && messages[messages.length - 1]?.type !== 'typing' && (
                  renderTypingIndicator()
                )}
                
                {renderSelectionSummary()}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Progress & Actions Footer */}
            <div className="px-4 py-3 border-t border-cyan-400/20 bg-slate-900/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-400">
                    {chatState === 'welcome' && 'Introduction'}
                    {chatState === 'services' && 'Select Services'}
                    {chatState === 'niches' && 'Choose Industry'}
                    {chatState === 'contact' && 'Connect Now'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-cyan-400">{selectedServices.length} services</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-magenta-400">{selectedNiches.length} industries</span>
                </div>
              </div>
              
              <div className="h-1 bg-slate-800/50 rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-magenta-500 to-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: chatState === 'welcome' ? '25%' :
                           chatState === 'services' ? '50%' :
                           chatState === 'niches' ? '75%' :
                           '100%'
                  }}
                  transition={{ duration: 0.5, type: "spring" }}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleOptionClick('contactDirect')}
                  className="flex-1 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-xs hover:border-slate-600 hover:bg-slate-800/80 transition-all flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  Quick Chat
                </button>
                <button
                  onClick={() => handleOptionClick('startOver')}
                  className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-xs hover:border-slate-600 hover:bg-slate-800/80 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx="true" global="true">{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .chat-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 3px;
        }
        
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #ec4899, #3b82f6);
          border-radius: 3px;
        }
        
        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #db2777, #2563eb);
        }
        
        /* Gradient animation */
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        /* Prevent body scroll when chatbot is open */
        body.no-scroll {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        }
        
        /* Typing animation */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .fixed.inset-0 {
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
            margin: 0 !important;
          }
          
          .message-container .bg-slate-800\/40 {
            background: rgba(30, 41, 59, 0.8);
          }
          
          .message-container {
            margin-bottom: 12px;
          }
          
          .p-4 {
            padding: 12px;
          }
          
          /* Ensure header is properly aligned on mobile */
          .bg-gradient-to-r.from-cyan-500\/20 {
            padding: 12px !important;
          }
        }
        
        /* Desktop optimizations - FIXED for header visibility */
        @media (min-width: 641px) {
          .fixed.sm\\:top-24 {
            top: 96px !important; /* 24 * 4px = 96px - enough space below navbar */
          }
          
          .fixed.sm\\:right-6 {
            right: 24px !important;
          }
          
          .fixed.sm\\:w-\\[500px\\] {
            width: 500px !important;
            max-width: 500px !important;
          }
          
          .fixed.sm\\:h-\\[700px\\] {
            height: 700px !important;
            max-height: 700px !important;
          }
          
          .sm\\:rounded-3xl {
            border-radius: 1.5rem !important;
          }
          
          .chat-scrollbar {
            padding-right: 4px;
          }
          
          /* Ensure header is visible in desktop */
          .relative.z-20 {
            position: relative !important;
            z-index: 20 !important;
          }
        }
        
        /* Custom magenta color */
        .bg-magenta-500 {
          background-color: #ec4899;
        }
        
        .text-magenta-300 {
          color: #f472b6;
        }
        
        .border-magenta-400 {
          border-color: #f472b6;
        }
        
        .bg-magenta-500\/10 {
          background-color: rgba(236, 72, 153, 0.1);
        }
        
        .border-magenta-500\/30 {
          border-color: rgba(236, 72, 153, 0.3);
        }
        
        .text-magenta-400 {
          color: #f472b6;
        }
        
        .from-magenta-500 {
          --tw-gradient-from: #ec4899;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(236, 72, 153, 0));
        }
        
        .via-magenta-500 {
          --tw-gradient-stops: var(--tw-gradient-from), #ec4899, var(--tw-gradient-to, rgba(236, 72, 153, 0));
        }
        
        .to-magenta-500 {
          --tw-gradient-to: #ec4899;
        }
        
        .from-magenta-500\/20 {
          --tw-gradient-from: rgba(236, 72, 153, 0.2);
        }
        
        .to-magenta-500\/20 {
          --tw-gradient-to: rgba(236, 72, 153, 0.2);
        }
      `}</style>
    </>
  );
};

export default ServiceChatbot;