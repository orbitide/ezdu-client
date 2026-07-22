'use client';


import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Pricing = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {once: true});
    const [activeTab, setActiveTab] = useState('মাসিক');


    const plans = {
        free: {
            name: 'ফ্রি',
            price: '৳০',
            subPrice:null,
            description: 'শুরু করতে যা দরকার',
            features: [
                'প্রতিদিন ৩টি প্র্যাকটিস',
                'বেসিক ব্যাখ্যা',
                'ডেইলি টেস্ট',
                'লিডারবোর্ড',
                'বেসিক প্রোগ্রেস ট্র্যাকিং',
            ],
            popular: false,
            period: activeTab === 'মাসিক' ? '/মাস' : '/বছর',
            savings: null,
        },
        premium: {
            name: 'প্রিমিয়াম',
            price: activeTab === 'মাসিক' ? '৳১৬০' : '৳১০৫০',
            period: activeTab === 'মাসিক' ? '/মাস' : '/বছর',
            subPrice: activeTab === 'মাসিক' ? null : {
                original: '৳১৬০',
                discounted: '৳৮৮',
            },
            description: 'তোমার পুরো সম্ভাবনা আনলক করো',
            features: [
                'আনলিমিটেড প্র্যাকটিস',
                'বিস্তারিত ব্যাখ্যা ও সমাধান',
                'সব ধরনের টেস্ট',
                'অফলাইন মোড',
                'ভুলের রিভিউ—আগের ভুল থেকে শেখা',
                'উন্নত বিশ্লেষণ ও রিপোর্ট',
                'বিজ্ঞাপনমুক্ত অভিজ্ঞতা',
                'নতুন ফিচারে আগে ব্যবহারের সুযোগ',
                'অগ্রাধিকার সহায়তা',
            ],
            popular: true,
            savings: activeTab === 'মাসিক' ? null : { badge: '৪৫% ছাড়' }
        }
    };

    return (
        <section id="pricing" className="py-20">
            <div className="container mx-auto px-4" ref={ref}>
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={isInView ? {opacity: 1, y: 0} : {}}
                    className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        শেখা সবার জন্য,{' '}
                        <span className="text-primary">ফ্রিতেই শুরু করো</span>
                    </h2>
                    <p className=" text-muted-foreground mb-8">
                        প্র্যাকটিস ও লেসন সবসময়{' '}
                        <span className="text-foreground font-semibold">বিনামূল্যে।</span>
                        {' '}প্রিমিয়াম নাও যখন আরো বেশি চাও
                    </p>

                    <div className="flex justify-center mb-12">
                        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as string)}>
                            <TabsList>
                                <TabsTrigger value="মাসিক">মাসিক</TabsTrigger>
                                <TabsTrigger value="বার্ষিক">বার্ষিক</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {Object.entries(plans).map(([key, plan], index) => (
                        <motion.div
                            key={key}
                            initial={{opacity: 0, y: 30}}
                            animate={isInView ? {opacity: 1, y: 0} : {}}
                            transition={{delay: index * 0.2}}
                        >
                            <Card
                                className={`h-full relative ${plan.popular ? 'border-primary/50 ring-1 ring-primary/30' : ''}`}>

                                {/* Most Popular Badge — shows savings % when yearly */}
                                {plan.period == '/বছর' && plan.popular && (
                                    <div className="ribbon-live absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/40 bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-primary/30">
                                <span className="live-dot live-dot-sm live-dot-on-light" aria-hidden>
                                    <span className="live-dot-inner"/>
                                </span>
                                        {plan.savings?.badge}
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                                    <p className="text-muted-foreground mb-4">{plan.description}</p>

                                    {/* Price */}
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                                        {plan.period && (
                                            <span className="text-muted-foreground">{plan.period}</span>
                                        )}
                                    </div>


                                    {plan.subPrice && (
                                        <div className="mt-1.5 flex items-center justify-center gap-1.5">
                                            <span className="text-sm text-muted-foreground line-through">{plan.subPrice.original}/মাস</span>
                                            <span className="text-sm text-foreground font-medium">{plan.subPrice.discounted}/মাস</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <Check className="text-primary flex-shrink-0 mt-1" size={20}/>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant={plan.popular ? 'default' : 'outline'}
                                    className="w-full justify-center">
                                    {plan.popular ? 'প্রিমিয়াম নাও' : 'ফ্রিতে শুরু করো'}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};