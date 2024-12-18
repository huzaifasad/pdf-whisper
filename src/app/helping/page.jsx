import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Help Documentation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn the basics of our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-500 hover:underline flex items-center">
                  Creating an account <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-500 hover:underline flex items-center">
                  Setting up your profile <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-500 hover:underline flex items-center">
                  Navigating the dashboard <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-500 hover:underline flex items-center">
                  Updating personal information <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-500 hover:underline flex items-center">
                  Changing your password <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-500 hover:underline flex items-center">
                  Managing notifications <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I reset my password?</AccordionTrigger>
          <AccordionContent>
            To reset your password, click on the "Forgot Password" link on the login page. 
            Enter your email address, and we'll send you instructions to reset your password.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I change my username?</AccordionTrigger>
          <AccordionContent>
            Yes, you can change your username in the account settings. 
            Go to your profile, click on "Edit Profile," and you'll see an option to update your username.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I contact support?</AccordionTrigger>
          <AccordionContent>
            You can contact our support team by emailing support@example.com or by using the 
            contact form in the "Help" section of your dashboard. We aim to respond to all 
            inquiries within 24 hours.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <p className="mb-4">If you couldn't find the answer you were looking for, our support team is here to help.</p>
        <Button>Contact Support</Button>
      </div>
    </div>
  )
}

