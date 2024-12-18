'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Github, Linkedin, Twitter, ChevronDown, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas'

const teamMembers = [
  {
    name: "Huzaifa Saad",
    role: "Volunteer",
    image: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7b48621dea9e5a1ae667cdc398002ac2-1692004885294/8f2d0260-c96f-455d-bd6b-66cc888acffc.png",
    bio: "I'm interested in solving technical problems in everything...\nI'm currently working on Next.js AWS Blockchain ...\nI'm looking to collaborate free on some great ideas ...",
    github: "https://github.com/huzaifasad",
    linkedin: "https://linkedin.com/in/huzaifasad",
    twitter: "https://twitter.com/huzaifasad"
  },
  {
    name: "Muhammad Fasseh",
    role: "Full Stack Developer",
    image: "https://scontent.flhe7-2.fna.fbcdn.net/v/t39.30808-1/284955840_726440375060889_6674528969495452991_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFSshdv_wd7My4CjFmRhyr4ubDEFFkb5ou5sMQUWRvmi2m-pdwNgqG199kkYund7-iCa2nN7SPxKBDXt4PrPU2o&_nc_ohc=kPh7AEpNaFoQ7kNvgFYJuoD&_nc_zt=24&_nc_ht=scontent.flhe7-2.fna&_nc_gid=Agi9JmkdQYUcdlrl6UqIZmA&oh=00_AYDA-Z0MwkOcfw06ahzoVxgXXV2tEyaBlEAZIUysbqeWcw&oe=6768D405",
    bio: "Passionate Full Stack Developer with expertise in modern web technologies.",
    github: "https://github.com/muhammadfasseh",
    linkedin: "https://linkedin.com/in/muhammadfasseh",
    twitter: "https://twitter.com/muhammadfasseh"
  },
]

const MotionCard = motion(Card)

export default function MeetMembers() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const cardRefs = useRef({})

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const downloadImage = async (imageUrl, memberName) => {
    const image = await fetch(imageUrl)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    
    const link = document.createElement('a')
    link.href = imageURL
    link.download = `${memberName.replace(' ', '_')}_profile.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadCard = async (memberName) => {
    const cardElement = cardRefs.current[memberName]
    if (!cardElement) return

    const scale = 2
    const canvas = await html2canvas(cardElement, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: null,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(`card-${memberName.replace(' ', '-')}`)
        if (clonedElement) {
          clonedElement.style.transform = 'none'
          clonedElement.style.borderRadius = '24px'
          clonedElement.style.overflow = 'hidden'
        }
      }
    })

    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = `${memberName.replace(' ', '_')}_card.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Meet Our Stellar Team
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
          <AnimatePresence>
            {isLoaded && teamMembers.map((member, index) => (
              <MotionCard 
                key={member.name}
                className="overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 bg-gradient-to-br from-purple-950 to-indigo-950 w-full max-w-md relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                ref={el => cardRefs.current[member.name] = el}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <svg className="absolute -right-24 -top-24 w-96 h-96 text-red-500/20" viewBox="0 0 100 100">
                    <path d="M100,0 C60,20 40,40 20,100" stroke="currentColor" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
                
                <CardContent className="p-8 relative" id={`card-${member.name.replace(' ', '-')}`}>
                  <div className="text-center mb-8">
                    <div className="relative w-48 h-48 mx-auto mb-6 group">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-white to-yellow-300 opacity-75 blur-md animate-pulse" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600" />
                      <div className="relative rounded-full overflow-hidden border-4 border-white h-full">
                       <img
                          src={member.image}
                          alt={member.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        onClick={() => downloadImage(member.image, member.name)}
                        className="absolute bottom-0 right-0 rounded-full p-2 bg-purple-500 hover:bg-purple-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {member.name}
                    </h2>
                    <p className="text-lg text-purple-300 mb-4">{member.role}</p>
                    <p className="text-gray-300 whitespace-pre-line mb-6">{member.bio}</p>
                    <div className="flex justify-center space-x-4 mb-6">
                      <SocialButton href={member.github} icon={<Github className="h-5 w-5" />} />
                      <SocialButton href={member.linkedin} icon={<Linkedin className="h-5 w-5" />} />
                      <SocialButton href={member.twitter} icon={<Twitter className="h-5 w-5" />} />
                    </div>
                    <div className="flex space-x-4">
                      <Button 
                        onClick={() => setSelectedMember(member)} 
                        variant="outline" 
                        className="flex-1 bg-purple-500/10 backdrop-blur-sm hover:bg-purple-500/20 text-purple-300 border-purple-500 hover:border-pink-500 transition-colors duration-300"
                      >
                        Learn More
                      </Button>
                      <Button
                        onClick={() => downloadCard(member.name)}
                        variant="outline"
                        className="bg-purple-500/10 backdrop-blur-sm hover:bg-purple-500/20 text-purple-300 border-purple-500 hover:border-pink-500 transition-colors duration-300"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={selectedMember !== null} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-purple-950 to-indigo-950 text-white border-purple-500">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {selectedMember.name}
              </DialogTitle>
              <DialogDescription className="text-lg text-purple-300">
                {selectedMember.role}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-white to-yellow-300 opacity-75 blur-md animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600" />
                <div className="relative rounded-full overflow-hidden border-4 border-white h-full">
                 <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-center text-gray-300 whitespace-pre-line">
                {selectedMember.bio}
              </p>
              <div className="flex justify-center space-x-4">
                <SocialButton href={selectedMember.github} icon={<Github className="h-5 w-5" />} />
                <SocialButton href={selectedMember.linkedin} icon={<Linkedin className="h-5 w-5" />} />
                <SocialButton href={selectedMember.twitter} icon={<Twitter className="h-5 w-5" />} />
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <ChevronDown className="w-8 h-8 text-purple-400 animate-bounce" />
      </motion.div>
    </div>
  )
}

function SocialButton({ href, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500 hover:border-pink-500 transition-colors duration-300"
      >
        {icon}
      </Button>
    </a>
  )
}

