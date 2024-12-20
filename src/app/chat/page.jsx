'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send, Upload, FileText, Bot, User, X, Menu, CreditCard, Settings, LogOut } from 'lucide-react'
// import { useToast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const MAX_FILES = 5
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function PDFChatInterface() {
  const [files, setFiles] = useState([])
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const fileInputRef = useRef(null)
  const chatContainerRef = useRef(null)
  // const { toast } = useToast()

  // Mock user and plan data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png"
  }
  const plan = {
    name: "Pro",
    usedStorage: 3.5,
    totalStorage: 10
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files)
    const validFiles = uploadedFiles.filter(file => file.type === 'application/pdf' && file.size <= MAX_FILE_SIZE)

    if (validFiles.length + files.length > MAX_FILES) {
      // toast({
      //   title: "Upload limit reached",
      //   description: `You can only upload up to ${MAX_FILES} PDF files.`,
      //   variant: "destructive",
      // })
      return
    }

    if (validFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validFiles])
      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'bot', content: `Great! I've loaded ${validFiles.length} new PDF${validFiles.length > 1 ? 's' : ''}. What would you like to know about ${validFiles.length > 1 ? 'them' : 'it'}?` }
      ])
    } else {
      // toast({
      //   title: "Invalid files",
      //   description: "Please upload valid PDF files (max 10MB each).",
      //   variant: "destructive",
      // })
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || files.length === 0) return

    const userMessage = { type: 'user', content: inputMessage }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const botReply = { type: 'bot', content: `Here's a response about "${inputMessage}" from the PDF "${files[activeFileIndex].name}".` }
    setMessages(prev => [...prev, botReply])
    setIsLoading(false)
  }

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
    if (activeFileIndex === index) {
      setActiveFileIndex(0)
    } else if (activeFileIndex > index) {
      setActiveFileIndex(prev => prev - 1)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  }

  const UserProfile = () => (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Current Plan:</span>
          <Badge variant="secondary">{plan.name}</Badge>
        </div>
        <div className="space-y-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Account Settings</DialogTitle>
                <DialogDescription>
                  Manage your account settings and preferences.
                </DialogDescription>
              </DialogHeader>
              {/* Add account settings form here */}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input id="name" value={user.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input id="email" value={user.email} className="col-span-3" />
                </div>
              </div>
              <Button className="w-full">Save Changes</Button>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Billing Information</DialogTitle>
                <DialogDescription>
                  View and manage your billing details and subscription.
                </DialogDescription>
              </DialogHeader>
              {/* Add billing information and subscription management here */}
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center">
                  <span>Current Plan:</span>
                  <Badge variant="secondary">{plan.name}</Badge>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Storage Usage</label>
                  <Progress value={(plan.usedStorage / plan.totalStorage) * 100} className="w-full" />
                  <div className="text-xs text-muted-foreground">
                    {plan.usedStorage.toFixed(1)} GB / {plan.totalStorage} GB Used
                  </div>
                </div>
              </div>
              <Button className="w-full">Upgrade Plan</Button>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="w-full justify-start text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">Talk to PDF</h1>
        <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>User Profile</SheetTitle>
              <SheetDescription>
                View and manage your account details
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <UserProfile />
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex flex-col lg:flex-row flex-1 overflow-auto">
  {/* Left side - Chat Interface */}
  <div className="flex flex-col w-full lg:w-1/2 p-4 border-b lg:border-b-0 lg:border-r">
    <Card className="flex-grow flex flex-col overflow-auto">
      <CardContent className="flex-grow flex flex-col p-4">
        <ScrollArea className="flex-grow pr-4" ref={chatContainerRef}>
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`flex items-start ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{message.type === 'user' ? <User /> : <Bot />}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`mx-2 p-3 rounded-lg ${
                      message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
    <form onSubmit={handleSendMessage} className="mt-4 flex items-center">
      <Input
        type="text"
        placeholder="Ask a question about the PDF..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        className="flex-grow mr-2"
      />
      <Button type="submit" size="icon" disabled={files.length === 0 || isLoading}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </Button>
    </form>
  </div>

  {/* Right side - PDF Viewer */}
  <div className="flex flex-col w-full lg:w-1/2 p-4">
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload PDF</TabsTrigger>
        <TabsTrigger value="view" disabled={files.length === 0}>
          View PDF
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upload" className="mt-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
            {files.length > 0 ? (
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-4">Uploaded PDFs</h3>
                <ScrollArea className="h-[calc(100vh-24rem)]">
                  {files.map((file, index) => (
                    <motion.div
                      key={index}
                      {...fadeInUp}
                      className="flex items-center justify-between p-2 mb-2 bg-secondary rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 text-primary mr-2" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </ScrollArea>
                {files.length < MAX_FILES && (
                  <Button onClick={() => fileInputRef.current.click()} className="mt-4">
                    <Upload className="mr-2 h-4 w-4" /> Add More PDFs
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload your PDFs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF files up to 10MB are supported (max 5 files)
                </p>
                <Button onClick={() => fileInputRef.current.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Choose PDFs
                </Button>
              </div>
            )}
            <Input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              ref={fileInputRef}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="view" className="mt-4">
        <Card>
          <CardContent className="min-h-[calc(100vh-16rem)] p-0">
            {files.length > 0 && (
              <>
                <div className="flex justify-between items-center p-2 bg-secondary">
                  <div className="flex space-x-2">
                    {files.map((file, index) => (
                      <Button
                        key={index}
                        variant={index === activeFileIndex ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveFileIndex(index)}
                      >
                        PDF {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
                <iframe
                  src={URL.createObjectURL(files[activeFileIndex])}
                  title="PDF Viewer"
                  className="w-full h-[calc(100vh-20rem)] border-none"
                />
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</div>

      <footer className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
{/*             {plan.usedStorage.toFixed(1)} GB / {plan.totalStorage} GB Used */}
            10k Characters /20k charcters
          </div>
{/*           <Progress value={(plan.usedStorage / plan.totalStorage) * 100} className="w-1/2" /> */}
        </div>
      </footer>
    </div>
  )
}

