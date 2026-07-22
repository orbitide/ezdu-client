'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from './ui/card';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

export const Contact = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        alert('Thanks for reaching out! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="py-20 surface-section-muted">
            <div className="container mx-auto px-4" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                        Get in{' '}
                        <span className="text-primary">touch</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Have questions? We&apos;d love to hear from you
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                    >
                        <Card className="h-full">
                            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a message</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-muted-foreground mb-2">Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-muted-foreground mb-2">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-muted-foreground mb-2">Message</label>
                                    <Textarea
                                        placeholder="How can we help you?"
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full justify-center">
                                    Send Message
                                    <ChevronRight size={20} />
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        className="space-y-6"
                    >
                        <Card>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-muted border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-1">Email</h4>
                                    <p className="text-muted-foreground">hello@ezdu.net</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-muted border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-1">Phone</h4>
                                    <p className="text-muted-foreground">+880 1234 567890</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-muted border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-1">Location</h4>
                                    <p className="text-muted-foreground">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-primary/25 bg-card/50">
                            <h4 className="font-bold text-foreground mb-3">Follow us</h4>
                            <div className="flex gap-3">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary/40 hover:text-primary text-muted-foreground transition-all"
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};