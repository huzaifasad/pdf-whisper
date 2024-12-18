'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { FileText, MessageSquare, Zap, Shield, ArrowRight, Menu, X, Check, Upload, Search, Clock, Users, BookOpen } from 'lucide-react'
import {loadStripe} from '@stripe/stripe-js';
export default function TalkToPDFLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const handlepayment = async () => {
    try {
      const response = await fetch('/api/stripe');
      
      if (!response.ok) {
        throw new Error('Failed to create Stripe session');
      }
  
      // Extract the Stripe URL from the response JSON
      const data = await response.json();
      const stripeCheckoutUrl = data.url; // Extract the URL from the response body
  
      console.log('Stripe Checkout URL:', stripeCheckoutUrl);
  
      // Navigate to the Stripe Checkout page
      window.location.href = stripeCheckoutUrl;
    } catch (error) {
      console.error('Error during payment process:', error.message);
    }
  };
  
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const testimonials = [
    { name: "John Doe", role: "Researcher", quote: "Talk to PDF has revolutionized the way I interact with academic papers." },
    { name: "Jane Smith", role: "Business Analyst", quote: "This tool saves me hours of work every week. It's like having a personal assistant for all my PDF documents." },
    { name: "Alex Johnson", role: "Student", quote: "I can't imagine studying without Talk to PDF now. It helps me understand complex texts so much faster." }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX }}
      />
      <header className={`fixed top-0 left-0 right-0 z-40 px-4 lg:px-6 h-16 flex items-center transition-all duration-200 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : ''}`}>
        <Link className="flex items-center justify-center" href="#">
          <FileText className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold text-primary">Talk to PDF</span>
        </Link>
        <nav className={`ml-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex gap-4 sm:gap-6 absolute md:relative top-16 md:top-0 left-0 right-0 bg-background md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none flex-col md:flex-row items-center`}>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">Features</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">How It Works</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">Pricing</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#testimonials">Testimonials</Link>
          <Link href="/login">
            <Button className="w-full md:w-auto" variant="outline">Sign In</Button>
          </Link>
          <Link href="/chat">
            <Button className="w-full md:w-auto">Get Started</Button>
          </Link>
        </nav>
        <button className="ml-auto md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <motion.div className="container px-4 md:px-6" {...fadeInUp}>
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h1 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Talk to Your PDFs Like Never Before
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Unlock the power of your documents. Ask questions, get summaries, and interact with your PDFs using natural language.
              </motion.p>
              <motion.div 
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Get Started for Free
                </Button>
                <Button variant="outline" className="h-11 px-8">Learn More</Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div 
            className="container px-4 md:px-6" 
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              variants={fadeInUp}
            >
              Key Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-6 h-6 mr-2 text-primary" />
                      Interactive Conversations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Engage in natural language conversations with your PDFs. Ask questions and get accurate answers instantly.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-6 h-6 mr-2 text-primary" />
                      Quick Summaries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Get concise summaries of lengthy documents, saving you time and enhancing comprehension.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-primary" />
                      Secure and Private
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Your documents are encrypted and processed securely. We prioritize your privacy and data protection.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <motion.div 
            className="container px-4 md:px-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              variants={fadeInUp}
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div className="flex flex-col items-center text-center" variants={fadeInUp}>
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Upload Your PDF</h3>
                <p className="text-muted-foreground">Simply drag and drop your PDF into our secure platform.</p>
              </motion.div>
              <motion.div className="flex flex-col items-center text-center" variants={fadeInUp}>
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Ask Questions</h3>
                <p className="text-muted-foreground">Type your questions or prompts in natural language.</p>
              </motion.div>
              <motion.div className="flex flex-col items-center text-center" variants={fadeInUp}>
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Get Instant Answers</h3>
                <p className="text-muted-foreground">Receive accurate responses and insights from your document.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div 
            className="container px-4 md:px-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              variants={fadeInUp}
            >
              Simple Pricing
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                    <CardDescription>For occasional use</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$9.99</p>
                    <p className="text-muted-foreground">per month</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Up to 50 pages per PDF</li>
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> 10 PDFs per month</li>
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Basic support</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Choose on Plan</Button>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="transition-all duration-200 hover:shadow-lg border-primary">
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For regular users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$24.99</p>
                    <p className="text-muted-foreground">per month</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Up to 100 pages per PDF</li>
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Unlimited PDFs</li>
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Priority support</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full"   onClick={handlepayment}>Choose Plan</Button>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>For large organizations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">Custom</p>
                    <p className="text-muted-foreground">Contact us for pricing</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Unlimited pages and PDFs</li>
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Advanced security features</li>
                      <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Dedicated account manager</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Contact Sales</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <motion.div 
            className="container px-4 md:px-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              variants={fadeInUp}
            >
              What Our Users Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full transition-all duration-200 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle>{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="italic">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <motion.div 
            className="container px-4 md:px-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-5xl"
                variants={fadeInUp}
              >
                Ready to Talk to Your PDFs?
              </motion.h2>
              <motion.p 
                className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl"
                variants={fadeInUp}
              >
                Start extracting valuable insights from your documents today. No credit card required to get started.
              </motion.p>
              <motion.div 
                className="space-x-4"
                variants={fadeInUp}
              >
                <Button className="inline-flex h-11 items-center justify-center rounded-md bg-background px-8 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Get Started for Free
                </Button>
                <Button variant="outline" className="h-11 px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Talk to PDF. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

