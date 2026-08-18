'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const contactInfo = [
    {
        icon: Mail,
        title: 'Email',
        value: 'hello@ezdu.net',
        description: 'Reach out anytime for support or inquiries',
    },
    {
        icon: Phone,
        title: 'Phone',
        value: '+880 1639 577494',
        description: 'Call us during business hours',
    },
    {
        icon: MapPin,
        title: 'Location',
        value: 'Rangpur, Bangladesh',
        description: 'Visit us at our office',
    },
    {
        icon: Clock,
        title: 'Response Time',
        value: '24-48 Hours',
        description: 'We typically respond within a day',
    },
];


export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen surface-page overflow-hidden">
            <div
                className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
                aria-hidden
            >
                <div className="absolute top-1/2 left-1/2 h-[min(100vw,640px)] w-[min(100vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-3xl" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 px-4 pb-16 pt-ez-below-nav sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="badge-live inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-2 mb-6"
                    >
                        <span className="live-dot" aria-hidden>
                            <span className="live-dot-inner" />
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">Get in touch</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight"
                    >
                        Contact{' '}
                        <span className="text-primary">us</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Have questions or feedback? We&apos;d love to hear from you. Reach out to our team and we&apos;ll get back to you as soon as possible.
                    </motion.p>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-xl surface-raised surface-raised-hover text-center"
                                >
                                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                                    <p className="text-primary font-medium mb-2">{info.value}</p>
                                    <p className="text-muted-foreground text-sm">{info.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-xl surface-raised"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-foreground">
                            Send us a message
                        </h2>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 mx-auto mb-4 flex items-center justify-center">
                                    <Send className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h3>
                                <p className="text-muted-foreground">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-card/80 border border-border text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-card/80 border border-border text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-card/80 border border-border text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                                        placeholder="What is this about?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg bg-card/80 border border-border text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none transition-colors resize-none"
                                        placeholder="Tell us what&apos;s on your mind..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary text-white rounded-lg font-semibold transition-all border border-primary/30 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 group"
                                >
                                    Send Message
                                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

        </div>
    );
}