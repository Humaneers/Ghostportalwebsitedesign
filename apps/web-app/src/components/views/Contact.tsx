import React, { useState, useEffect } from 'react';
import { PageTransition } from '../layout/PageTransition';
import { motion } from 'motion/react';
import { Feather, Eye } from 'lucide-react';
import { api } from '../../utils/api';

interface ContactProps {
  onNext: () => void;
  isDevMode?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ onNext, isDevMode }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [localTime, setLocalTime] = useState('');
  
  // Cookie Helpers
  const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
  };

  // Form State
  const [formData, setFormData] = useState(() => {
    // Try to load from cookies
    const saved = getCookie('sovereign_contact_draft');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Ignore parse errors
      }
    }
    return {
      designation: '',
      email: '',
      city: '',
      domain: '',
      bloodType: '',
      mandate: '',
      digitalShadow: '',
      influenceName: '',
      influenceType: '',
      burden: '',
      labor: '',
      pledge: false
    };
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (isDevMode) {
      setFormData({
        designation: "Test Subject Alpha",
        email: "test@sovereign.dev",
        city: "Phoenix, AZ",
        domain: "Software Engineering",
        bloodType: "O-Negative",
        mandate: "Lead Architect for distributed systems.",
        digitalShadow: "linkedin.com/in/test",
        influenceName: "Admin 1868",
        influenceType: "Referral Source",
        burden: "The silence of the machine.",
        labor: "Archive Preservation",
        pledge: true
      });
    }
  }, [isDevMode]);

  useEffect(() => {
    // Save to cookies whenever formData changes
    setCookie('sovereign_contact_draft', JSON.stringify(formData), 7);
  }, [formData]);

  useEffect(() => {
    // Set local time string once
    setLocalTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
  }, []);

  // Calculate Progress
  const calculateProgress = () => {
    const fields = ['designation', 'email', 'city', 'domain', 'bloodType', 'mandate', 'digitalShadow', 'influenceName', 'influenceType', 'burden', 'labor', 'pledge'];
    const filled = fields.filter(field => {
        if (field === 'pledge') return formData.pledge;
        return (formData as any)[field]?.toString().trim().length > 0;
    });
    return (filled.length / fields.length) * 100;
  };

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.designation.trim()) newErrors.designation = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid format';
    
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.domain.trim()) newErrors.domain = 'Required';
    if (!formData.bloodType.trim()) newErrors.bloodType = 'Required';
    if (!formData.mandate.trim()) newErrors.mandate = 'Required';
    if (!formData.influenceName.trim()) newErrors.influenceName = 'Required';
    if (!formData.influenceType.trim()) newErrors.influenceType = 'Required';
    if (!formData.burden.trim()) newErrors.burden = 'Required';
    if (!formData.pledge) newErrors.pledge = 'Acknowledgement required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsProcessing(true);
    
    // Map to API structure (backend now supports flexible schema, but let's be explicit)
    const payload = {
        ...formData,
        // Map required keys for backend compatibility if needed, though we updated backend to handle 'designation' etc.
        alias: formData.designation, 
        contact: formData.email,
        intent: `MANDATE: ${formData.mandate} || BURDEN: ${formData.burden} || BLOOD: ${formData.bloodType}`,
        referrer: `${formData.influenceName} [${formData.influenceType}]`
    };

    try {
      await api.submitContact(payload);
      setTimeout(() => {
        onNext();
      }, 1500);
    } catch (error) {
      console.error('Transmission failed', error);
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Helper for rendering inputs
  const renderInput = (label: string, name: keyof typeof formData, placeholder: string, hint?: string) => (
    <div className="w-full">
        <div className="flex justify-between items-baseline mb-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">{label}</label>
            {errors[name] && <span className="text-[#B87333] text-[9px] font-mono uppercase">{errors[name]}</span>}
        </div>
        <input 
            type="text"
            name={name}
            value={formData[name] as string}
            onChange={handleChange}
            className={`w-full bg-transparent border-b py-2 font-mono text-sm focus:outline-none transition-colors rounded-none placeholder:text-[#1A1A1B]/20 ${errors[name] ? 'border-[#B87333] text-[#B87333]' : 'border-[#1A1A1B]/30 focus:border-[#B87333]'}`}
            placeholder={placeholder}
        />
        {hint && <p className="mt-1.5 text-[10px] font-serif italic text-[#1A1A1B]/40">{hint}</p>}
    </div>
  );

  return (
    <PageTransition className="flex flex-col items-center min-h-screen bg-[#F5F2ED] relative pb-24">
      
      {/* Progress Line */}
      <div className="fixed top-0 left-0 h-[2px] bg-[#B87333] transition-all duration-700 ease-out z-50" style={{ width: `${calculateProgress()}%` }} />

      <div className="w-full max-w-3xl p-6 md:p-12 space-y-16 pt-24">
        
        {/* Header */}
        <div className="text-center space-y-4">
            <h2 className="font-mono text-xs tracking-[0.3em] text-[#B87333] uppercase">
                Step 3: Dossier Initiation
            </h2>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1B]">
                The Preliminary Inquiry
            </h1>
            <p className="font-mono text-xs text-[#1A1A1B]/50 uppercase tracking-widest mt-2">
                Subject Verification Required
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
            
            {/* I. Layer One: Core Intelligence */}
            <div className="space-y-8">
                <div className="border-b border-[#1A1A1B]/10 pb-2">
                    <h3 className="font-serif text-lg text-[#1A1A1B] italic">I. Core Intelligence</h3>
                </div>
                <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {renderInput('Designation', 'designation', 'FULL LEGAL NAME', 'The identity held behind the mask.')}
                        {renderInput('Secure Channel', 'email', 'PRIMARY EMAIL', 'Where the "Vanguard Welcome" will be sent.')}
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                         {renderInput('Geographic Coordinates', 'city', 'CITY, STATE', 'Priority given to Arizona residents. Exceptions are rare.')}
                         {renderInput('Professional Domain', 'domain', 'INDUSTRY', 'Your Theater of Command.')}
                         {renderInput('Blood Type', 'bloodType', 'TYPE (e.g. O+)', 'Safety protocols & faith verification.')}
                    </div>
                </div>
            </div>

            {/* II. Layer Two: Identify the Frequency */}
            <div className="space-y-8">
                <div className="border-b border-[#1A1A1B]/10 pb-2">
                    <h3 className="font-serif text-lg text-[#1A1A1B] italic">II. Identify the Frequency</h3>
                </div>
                <div className="space-y-8">
                    <div className="w-full">
                        <div className="flex justify-between items-baseline mb-1">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">The Mandate</label>
                            {errors.mandate && <span className="text-[#B87333] text-[9px] font-mono uppercase">{errors.mandate}</span>}
                        </div>
                        <textarea 
                            name="mandate"
                            value={formData.mandate}
                            onChange={handleChange}
                            rows={2}
                            className={`w-full bg-transparent border-b py-2 font-mono text-sm focus:outline-none transition-colors rounded-none placeholder:text-[#1A1A1B]/20 resize-none ${errors.mandate ? 'border-[#B87333] text-[#B87333]' : 'border-[#1A1A1B]/30 focus:border-[#B87333]'}`}
                            placeholder="Briefly describe the world you carry."
                        />
                        <p className="mt-1.5 text-[10px] font-serif italic text-[#1A1A1B]/40">A summary of your leadership role and the scale of your organization.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {renderInput('The Digital Shadow', 'digitalShadow', 'LINKEDIN / BIO', 'The starting point for the Protocol of Observation.')}
                        
                        <div className="w-full">
                            <div className="flex justify-between items-baseline mb-1">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">Connection Type</label>
                                {errors.influenceType && <span className="text-[#B87333] text-[9px] font-mono uppercase">{errors.influenceType}</span>}
                            </div>
                            <div className="relative">
                                <select
                                    name="influenceType"
                                    value={formData.influenceType}
                                    onChange={handleChange}
                                    className={`w-full bg-transparent border-b py-2 font-mono text-sm focus:outline-none transition-colors rounded-none appearance-none cursor-none ${errors.influenceType ? 'border-[#B87333] text-[#B87333]' : 'border-[#1A1A1B]/30 focus:border-[#B87333] text-[#1A1A1B]'}`}
                                >
                                    <option value="" disabled>Select Connection</option>
                                    <option value="Referral Source">Referral Source</option>
                                    <option value="Joint Candidate">Joint Candidate</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#1A1A1B]/40">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor">
                                        <path d="M1 1L5 5L9 1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            <p className="mt-1.5 text-[10px] font-serif italic text-[#1A1A1B]/40">How are they related to your entry?</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-1 gap-8">
                         {renderInput('Connection Identity', 'influenceName', 'FULL NAME', 'The name of another human who would speak well of you.')}
                    </div>
                </div>
            </div>

            {/* III. Layer Three: The Merit */}
            <div className="space-y-8">
                <div className="border-b border-[#1A1A1B]/10 pb-2">
                    <h3 className="font-serif text-lg text-[#1A1A1B] italic">III. The Merit</h3>
                </div>
                
                <div className="space-y-8">
                     <div className="w-full">
                        <div className="flex justify-between items-baseline mb-1">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">The Nature of the Burden</label>
                            {errors.burden && <span className="text-[#B87333] text-[9px] font-mono uppercase">{errors.burden}</span>}
                        </div>
                        <textarea 
                            name="burden"
                            value={formData.burden}
                            onChange={handleChange}
                            rows={2}
                            className={`w-full bg-transparent border-b py-2 font-mono text-sm focus:outline-none transition-colors rounded-none placeholder:text-[#1A1A1B]/20 resize-none ${errors.burden ? 'border-[#B87333] text-[#B87333]' : 'border-[#1A1A1B]/30 focus:border-[#B87333]'}`}
                            placeholder="Where do you find the most profound isolation?"
                        />
                        <p className="mt-1.5 text-[10px] font-serif italic text-[#1A1A1B]/40">The weight you carry alone.</p>
                    </div>

                    <div className="grid gap-4">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">Labor Alignment</label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {['Vineyard Restoration', 'Archive Preservation', 'Estate Maintenance'].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, labor: option }))}
                                    className={`px-4 py-3 border text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                                        formData.labor === option 
                                        ? 'border-[#B87333] bg-[#B87333]/10 text-[#B87333]' 
                                        : 'border-[#1A1A1B]/20 text-[#1A1A1B]/60 hover:border-[#B87333] hover:text-[#B87333]'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] font-serif italic text-[#1A1A1B]/40">Which form of Operational Immersion would serve as your cognitive reset?</p>
                    </div>

                    <div className="pt-6">
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className={`mt-1 w-4 h-4 border transition-colors flex items-center justify-center ${formData.pledge ? 'border-[#B87333] bg-[#B87333]' : 'border-[#1A1A1B]/30 group-hover:border-[#B87333]'}`}>
                                {formData.pledge && <Feather className="w-3 h-3 text-[#F5F2ED]" />}
                            </div>
                            <input 
                                type="checkbox" 
                                name="pledge"
                                checked={formData.pledge}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <span className={`font-serif text-sm leading-relaxed transition-colors ${errors.pledge ? 'text-[#B87333]' : 'text-[#1A1A1B]/80'}`}>
                                I acknowledge that the Vanguard Bond ($1,500) is a collateral of silence. I understand that my entry is contingent upon the observation of my character.
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Submit */}
            <div className="pt-8">
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-5 bg-[#1A1A1B] text-[#F5F2ED] font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#B87333] transition-colors duration-500 flex items-center justify-center gap-3 group"
                >
                  {isProcessing ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      Submit for Review
                      <Feather className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </button>
            </div>

            {/* Station Note */}
            <div className="border-t border-[#1A1A1B]/10 pt-8 text-center space-y-2">
                <p className="font-mono text-[10px] text-[#1A1A1B]/40 uppercase tracking-widest">
                    Station Note
                </p>
                <p className="font-serif text-xs text-[#1A1A1B]/60 leading-relaxed max-w-lg mx-auto">
                    Upon submission, the Archive will be locked. Your local time of entry [{localTime}] has been logged. Do not seek further updates. We will signal you when the merit is verified.
                </p>
            </div>

        </form>
      </div>
    </PageTransition>
  );
};
