// src/pages/Contact.jsx
import { useState } from "react";
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaCopy, FaCheck } from "react-icons/fa";
import PageLayout from "../layouts/page-layout.jsx";

const contactInfo = [
    {
        icon: FaEnvelope,
        label: "E‑mail",
        text: "auciellostefano1@gmail.com",
        link: "mailto:auciellostefano1@gmail.com",
        copyable: true,
    },
    {
        icon: FaMapMarkerAlt,
        label: "Location",
        text: "Peschiera Borromeo (MI), Italy",
        link: "https://www.google.com/maps/search/?api=1&query=Peschiera+Borromeo+MI+Italy",
        copyable: false,
    },
    {
        icon: FaLinkedin,
        label: "LinkedIn",
        text: "stefano‑auciello",
        link: "https://www.linkedin.com/in/stefano-auciello",
        copyable: false,
    },
];

function Contact() {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PageLayout 
            title="Contact" 
            subtitle="Let's connect! Get in touch via email or LinkedIn."
        >
            <div className="max-w-2xl mx-auto mt-8">
                <div className="flex flex-col gap-4">
                    {contactInfo.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.text}
                                className="glass-card p-5 flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                            >
                                <div className="p-3 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-xl mt-1">
                                    <Icon size={20} />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                                        {item.label}
                                    </span>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                                            rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                            className="font-bold text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-450 transition text-sm sm:text-base break-words block mt-1"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base break-words block mt-1">
                                            {item.text}
                                        </span>
                                    )}
                                </div>
                                {item.copyable && (
                                    <button
                                        onClick={() => handleCopy(item.text)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition self-center cursor-pointer"
                                        title="Copy email to clipboard"
                                        aria-label="Copy email address to clipboard"
                                    >
                                        {copied ? <FaCheck className="text-emerald-500" size={14} /> : <FaCopy size={14} />}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-8 glass-card p-5 text-center bg-slate-50/50 dark:bg-slate-900/30">
                    <p className="text-sm text-slate-550 dark:text-slate-400">
                        Based in the Milan area, Italy. Available for remote collaboration and cloud transformation engineering roles.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}

export default Contact;
