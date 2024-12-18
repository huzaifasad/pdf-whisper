'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Loader2, Mail, Lock, User, Github, Chrome } from 'lucide-react'

const TypewriterText = ({ texts, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (charIndex < texts[textIndex].length) {
        setDisplayText((prev) => prev + texts[textIndex][charIndex])
        setCharIndex((prev) => prev + 1)
      } else {
        clearInterval(timer)
        setTimeout(() => {
          setDisplayText('')
          setCharIndex(0)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }, 2000) // Pause before starting the next text
      }
    }, delay)

    return () => clearInterval(timer)
  }, [texts, delay, textIndex, charIndex])

  return <span>{displayText}</span>
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm()
  const { register: registerSignup, handleSubmit: handleSubmitSignup, formState: { errors: errorsSignup } } = useForm()

  const onSubmitLogin = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsLoading(false)
  }

  const onSubmitSignup = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsLoading(false)
  }

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

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-primary text-primary-foreground p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Welcome to Talk to PDF
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl mb-8 text-center"
        >
          <TypewriterText 
            texts={[
              "Unlock the power of your documents.",
              "Ask questions, get summaries.",
              "Interact with your PDFs using natural language."
            ]}
          />
        </motion.div>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <motion.div variants={fadeInUp}>
                <CardTitle>Welcome to Talk to PDF</CardTitle>
                <CardDescription>Sign in to your account or create a new one</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="space-y-4 mt-4">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          className="pl-8"
                          {...registerLogin("email", { 
                            required: "Email is required",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Invalid email address",
                            }
                          })}
                        />
                      </div>
                      {errorsLogin.email && <p className="text-sm text-destructive">{errorsLogin.email.message}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          className="pl-8"
                          {...registerLogin("password", { 
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            }
                          })}
                        />
                      </div>
                      {errorsLogin.password && <p className="text-sm text-destructive">{errorsLogin.password.message}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Log in
                      </Button>
                    </motion.div>
                  </form>
                </TabsContent>
                <TabsContent value="signup">
                  <form onSubmit={handleSubmitSignup(onSubmitSignup)} className="space-y-4 mt-4">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="pl-8"
                          {...registerSignup("name", { 
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            }
                          })}
                        />
                      </div>
                      {errorsSignup.name && <p className="text-sm text-destructive">{errorsSignup.name.message}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          className="pl-8"
                          {...registerSignup("email", { 
                            required: "Email is required",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Invalid email address",
                            }
                          })}
                        />
                      </div>
                      {errorsSignup.email && <p className="text-sm text-destructive">{errorsSignup.email.message}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          className="pl-8"
                          {...registerSignup("password", { 
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            }
                          })}
                        />
                      </div>
                      {errorsSignup.password && <p className="text-sm text-destructive">{errorsSignup.password.message}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Sign up
                      </Button>
                    </motion.div>
                  </form>
                </TabsContent>
              </Tabs>
              <motion.div variants={fadeInUp} className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </motion.div>
            </CardContent>
            <CardFooter>
              <motion.p variants={fadeInUp} className="text-sm text-center w-full text-muted-foreground">
                By signing up, you agree to our{' '}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </motion.p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

