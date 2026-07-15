/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "@/components/providers/Logo";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CircuitBackground from "./CircuitBackground";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function LandingPageClient() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden relative scroll-smooth selection:bg-indigo-500/30">
      {/* Animated PCB Circuit Background */}
      <CircuitBackground />

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex justify-between items-center border-b border-border/40 bg-background/60 backdrop-blur-md h-[70px] px-6 py-2 sticky top-0 z-50"
      >
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <SignedIn>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-semibold border-0 hover:opacity-90 transition-opacity">
                Dashboard
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="hidden sm:block">
              <Button variant="ghost" className="font-semibold">Log in</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-semibold border-0 hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </SignedOut>
        </div>
      </motion.nav>

      <main className="flex-grow flex flex-col items-center justify-center pt-20 pb-16 text-center z-10 w-full">

        {/* HERO SECTION */}
        <section className="px-4 max-w-4xl flex flex-col items-center gap-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 mb-4 backdrop-blur-sm"
          >
            <span className="mr-2">🚀</span> The ultimate form builder is here
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Build Forms at{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 text-transparent bg-clip-text drop-shadow-sm">
              Lightning Speed
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-4 leading-relaxed"
          >
            Create beautiful, powerful, and highly-customizable forms in minutes with our intuitive drag-and-drop designer. No coding required.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 mt-8 w-full sm:w-auto items-center justify-center"
          >
            <Link href="/sign-up" className="w-full sm:w-auto group">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background will-change-transform"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#8b5cf6_0%,#06b6d4_50%,#8b5cf6_100%)]" />
                <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-8 py-1 text-lg font-medium text-foreground transition-colors hover:bg-accent gap-2">
                  Get Started — It's Free
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </motion.button>
            </Link>
            
            <Link href="#features" className="w-full sm:w-auto group">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full border border-border/50 bg-accent/20 px-8 text-lg font-medium text-foreground backdrop-blur-xl transition-colors hover:bg-accent/40 gap-2 shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
              >
                Learn More
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* HERO MOCKUP */}
        <motion.section 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="px-4 w-full max-w-5xl mt-20 relative perspective-1000 z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 top-[50%]" />
          <motion.div 
            whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
            initial={{ rotateX: 12, rotateY: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative rounded-xl border border-border/50 bg-background/60 shadow-[0_20px_50px_rgba(8,-112,184,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden transform-gpu"
          >
            <div className="h-8 border-b border-border/50 bg-muted/50 flex items-center px-4 gap-2 backdrop-blur-md">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
            </div>
            <div className="p-8 bg-accent/10 flex flex-col items-center justify-start gap-4 h-[500px] overflow-hidden bg-[url(/rails.svg)] dark:bg-[url(/rails-dark.svg)] relative">
               {/* Fading bottom edge so it looks like it continues */}
               <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background/90 to-transparent z-10 pointer-events-none" />

               {/* Form Header */}
               <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-lg space-y-2">
                 <div className="h-12 w-full bg-background/80 backdrop-blur-sm rounded-md shadow-sm border border-border/50 flex items-center px-4 font-bold text-xl">Event Registration Form</div>
                 <div className="h-8 w-3/4 bg-background/60 backdrop-blur-sm rounded-md shadow-sm border border-border/50 flex items-center px-4 text-sm text-muted-foreground">Please fill out all the required details below.</div>
               </motion.div>

               {/* Separator */}
               <div className="w-full max-w-lg my-1 h-[1px] bg-border/50" /> 

               <div className="w-full max-w-lg grid grid-cols-2 gap-4">
                 {/* Text Input */}
                 <motion.div animate={{ y: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="h-12 bg-background/80 backdrop-blur-sm rounded-md shadow-sm border border-border/50 flex items-center px-4 text-sm gap-3 opacity-90"><div className="w-5 h-5 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-bold">T</div> Full Name</motion.div>
                 
                 {/* Number Field */}
                 <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="h-12 bg-background/80 backdrop-blur-sm rounded-md shadow-sm border border-border/50 flex items-center px-4 text-sm gap-3 opacity-90"><div className="w-5 h-5 rounded bg-green-500/20 text-green-500 flex items-center justify-center text-xs font-bold">#</div> Age</motion.div>

                 {/* Date Picker */}
                 <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="h-12 bg-background/80 backdrop-blur-sm rounded-md shadow-sm border border-border/50 flex items-center px-4 text-sm gap-3 opacity-90"><div className="w-5 h-5 rounded bg-purple-500/20 text-purple-500 flex items-center justify-center text-xs">📅</div> Date of Birth</motion.div>

                 {/* Select Field */}
                 <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="h-12 bg-background/80 backdrop-blur-sm rounded-md shadow-sm border border-border/50 flex items-center px-4 text-sm gap-3 opacity-90"><div className="w-5 h-5 rounded bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs">▼</div> T-Shirt Size</motion.div>
               </div>

               {/* Location Field */}
               <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-lg h-12 bg-background/80 backdrop-blur-sm rounded-md shadow-sm border border-border/50 flex items-center px-4 text-sm gap-3 opacity-90">
                 <div className="w-5 h-5 rounded bg-red-500/20 text-red-500 flex items-center justify-center text-xs">📍</div>
                 Location / Address
               </motion.div>

               {/* Textarea */}
               <motion.div animate={{ y: [0, 2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-lg h-24 bg-background/80 backdrop-blur-sm rounded-md shadow-sm border border-border/50 flex items-start p-4 text-sm gap-3 opacity-90">
                 <div className="w-5 h-5 rounded bg-pink-500/20 text-pink-500 flex items-center justify-center text-xs font-bold mt-1">¶</div>
                 <span className="mt-1 text-muted-foreground">Why do you want to attend this event?</span>
               </motion.div>

               {/* Voice Note */}
               <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-lg h-16 bg-background/80 backdrop-blur-sm rounded-md shadow-sm border border-violet-500/30 flex items-center justify-between px-4 opacity-90 z-20">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]">🎙️</div>
                   <div className="flex items-center gap-1">
                     <motion.div animate={{ height: [8, 20, 8] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-1 bg-violet-400 rounded-full" />
                     <motion.div animate={{ height: [12, 28, 12] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} className="w-1 bg-violet-400 rounded-full" />
                     <motion.div animate={{ height: [16, 32, 16] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }} className="w-1 bg-violet-400 rounded-full" />
                     <motion.div animate={{ height: [10, 24, 10] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} className="w-1 bg-violet-400 rounded-full" />
                     <motion.div animate={{ height: [14, 20, 14] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} className="w-1 bg-violet-400 rounded-full" />
                   </div>
                 </div>
                 <span className="text-xs text-violet-500 font-medium">Recording 00:12...</span>
               </motion.div>

               {/* Checkbox */}
               <motion.div className="w-full max-w-lg flex items-center gap-3 mt-1 z-20">
                 <div className="w-5 h-5 rounded border-2 border-violet-500 bg-violet-500/20 flex items-center justify-center text-violet-500 text-xs">✓</div>
                 <span className="text-sm font-medium">I agree to the terms and conditions</span>
               </motion.div>

               {/* Submit Button */}
               <motion.div 
                 animate={{ scale: [1, 1.02, 1] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="w-full max-w-lg h-14 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-md shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center text-white font-bold text-lg mt-2 z-20"
               >
                 Submit Registration
               </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* LOGO CLOUD (Marquee) */}
        <section className="w-full mt-32 px-4 flex flex-col items-center opacity-70 overflow-hidden relative">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by innovative teams worldwide</p>
          <div className="w-full max-w-7xl relative flex overflow-x-hidden group">
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex gap-16 md:gap-32 w-[200%] items-center"
            >
              <div className="flex gap-16 md:gap-32 w-1/2 justify-around items-center min-w-full">
                <span className="text-2xl font-bold text-muted-foreground">Acme Corp</span>
                <span className="text-2xl font-bold text-muted-foreground">GlobalTech</span>
                <span className="text-2xl font-bold text-muted-foreground">Innovate AI</span>
                <span className="text-2xl font-bold text-muted-foreground">Stark Ind.</span>
                <span className="text-2xl font-bold text-muted-foreground">Wayne Ent.</span>
              </div>
              <div className="flex gap-16 md:gap-32 w-1/2 justify-around items-center min-w-full">
                <span className="text-2xl font-bold text-muted-foreground">Acme Corp</span>
                <span className="text-2xl font-bold text-muted-foreground">GlobalTech</span>
                <span className="text-2xl font-bold text-muted-foreground">Innovate AI</span>
                <span className="text-2xl font-bold text-muted-foreground">Stark Ind.</span>
                <span className="text-2xl font-bold text-muted-foreground">Wayne Ent.</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="w-full max-w-6xl mt-32 px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Everything you need
            </motion.h2>
            <motion.p 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Our form builder is packed with features designed to save you time and boost your conversion rates.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard title="Drag & Drop" description="Visually construct your forms with a seamless drag and drop interface. Rearrange elements with ease." icon="🖱️" index={0} />
            <FeatureCard title="Instant Sharing" description="Publish your form with one click and share it anywhere. Accessible on all devices instantly." icon="🔗" index={1} />
            <FeatureCard title="Advanced Analytics" description="Track submissions in real-time. Gain insights into user interactions and data collection." icon="📊" index={2} />
            <FeatureCard title="Auto-Save" description="Never lose your work. Changes are saved instantly to your browser and synced to the cloud." icon="☁️" index={3} />
            <FeatureCard title="Customizable Styles" description="Make it yours. Adjust colors, fonts, and layouts to match your brand's unique identity." icon="🎨" index={4} />
            <FeatureCard title="Secure Data" description="Your data is encrypted and stored securely. We take privacy and compliance seriously." icon="🔒" index={5} />
            <FeatureCard title="Voice Recorder" description="Allow users to record and submit audio notes directly within your forms effortlessly." icon="🎙️" index={6} />
            <FeatureCard title="E-Signatures" description="Collect digital signatures seamlessly for contracts, agreements, and instant approvals." icon="✍️" index={7} />
            <FeatureCard title="Fast File Uploads" description="Accept documents, images, and large files with lightning-fast and secure uploading." icon="📁" index={8} />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="w-full max-w-6xl mt-32 px-4 flex flex-col items-center">
          <div className="text-center mb-16">
            <motion.h2 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              How it works
            </motion.h2>
            <motion.p 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Get your form up and running in three simple steps.
            </motion.p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl mx-auto">
            {/* Horizontal Timeline Connector for Desktop */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-violet-500/0 via-fuchsia-500/50 to-cyan-500/0 -z-10" />
            
            <StepCard step="1" title="Create" desc="Use our intuitive drag-and-drop designer to add fields and customize your form layout." index={0} />
            <StepCard step="2" title="Publish" desc="Click publish to make your form live. We'll generate a unique, secure URL for you." index={1} />
            <StepCard step="3" title="Collect" desc="Share the link with your audience and watch the submissions roll in instantly." index={2} />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="w-full mt-32 px-4 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/20 border-y border-border/50 -z-10" />
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Loved by creators
              </motion.h2>
              <motion.p 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
              >
                See what our community has to say about Formify.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialCard name="Sarah J." role="Marketing Manager" quote="Formify completely transformed how we collect leads. The UI is incredibly smooth and it takes literally seconds to build a form." index={0} />
              <TestimonialCard name="David Chen" role="Startup Founder" quote="I've used every form builder out there. Nothing comes close to the developer experience and beautiful designs of Formify." index={1} />
              <TestimonialCard name="Elena R." role="Event Coordinator" quote="The real-time analytics have saved me hours of manual data entry. My absolute favorite tool this year!" index={2} />
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="w-full max-w-3xl mt-32 px-4 text-left relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full bg-background/50 backdrop-blur-md rounded-2xl border border-border/50 p-6 shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">Is Formify completely free?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes! You can get started for free. Our free tier includes unlimited forms and up to 100 submissions per month.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Do I need coding skills?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Not at all. Our drag-and-drop builder is designed for anyone to use, regardless of technical background.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">Can I embed the forms on my website?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Absolutely. Once you publish a form, you can easily share the link or copy the embed code to place it directly on your site.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">Is my data secure?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                We take security seriously. All form submissions are encrypted and stored in secure cloud databases.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* BOTTOM CTA */}
        <section className="w-full max-w-5xl mt-32 mb-20 px-4 text-center">
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-[3rem] p-12 md:p-20 border border-indigo-500/30 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 bg-background/40 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent z-0 blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">Ready to upgrade your workflow?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join thousands of users who are already building forms faster and better with Formify.</p>
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto text-lg h-16 px-12 bg-primary text-primary-foreground shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all hover:scale-105 rounded-full font-bold">
                  Create Your First Form
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-12 px-6 bg-background/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Formify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon, index }: { title: string, description: string, icon: string, index: number }) {
  return (
    <motion.div 
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex flex-col items-center text-center p-8 rounded-3xl border border-border/50 bg-background/80 hover:bg-accent/40 transition-all shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-none relative overflow-hidden group will-change-transform"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-4xl mb-6 bg-muted p-5 rounded-2xl shadow-inner transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function StepCard({ step, title, desc, index }: { step: string, title: string, desc: string, index: number }) {
  return (
    <motion.div 
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="flex flex-col items-center text-center relative group"
    >
      <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
        {/* Glowing ambient shadow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 opacity-20 blur-md group-hover:opacity-60 group-hover:blur-xl transition-all duration-500 will-change-transform" />
        
        {/* Animated gradient ring */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#8b5cf6_0%,#d946ef_50%,#06b6d4_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-300 animate-[spin_4s_linear_infinite] z-0" />
        
        {/* Inner circle with text */}
        <div className="absolute inset-[3px] rounded-full bg-background z-10 flex items-center justify-center transition-colors group-hover:bg-background/90">
          <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-violet-400 to-cyan-400 drop-shadow-sm">
            {step}
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function TestimonialCard({ name, role, quote, index }: { name: string, role: string, quote: string, index: number }) {
  return (
    <motion.div 
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col p-8 rounded-3xl border border-border/50 bg-background/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all text-left relative overflow-hidden group"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
      <div className="flex gap-1 mb-6 text-yellow-500 text-lg">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <p className="italic text-muted-foreground flex-grow mb-8 text-lg">"{quote}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-400 to-teal-400" />
        <div>
          <h4 className="font-bold text-foreground">{name}</h4>
          <p className="text-sm text-indigo-400 font-medium">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}
