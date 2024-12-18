'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Github, Linkedin, Twitter, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function MeetMembers() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
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
                className="overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 bg-gray-800 w-full max-w-md"
                initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <CardContent className="p-0 relative group">
                  <div className="overflow-hidden  ">
                    <img
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
                    <p className="text-lg text-purple-300 mb-4">{member.role}</p>
                    <Button onClick={() => setSelectedMember(member)} variant="outline" className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-purple-500 hover:border-pink-500 transition-colors duration-300">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </MotionCard>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={selectedMember !== null} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white border-purple-500">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{selectedMember.name}</DialogTitle>
              <DialogDescription className="text-lg text-purple-300">{selectedMember.role}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full animate-spin-slow" />
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={200}
                  height={200}
                  className="absolute inset-1 w-46 h-46 rounded-full object-cover border-4 border-white"
                />
              </div>
              <p className="text-center text-gray-300 whitespace-pre-line ">{selectedMember.bio}</p>
              <div className="flex justify-center space-x-4">
                <a href={selectedMember.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full bg-purple-500 hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-300">
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
                <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full  bg-purple-500 hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-300">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
                <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full bg-purple-500 hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-300">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </a>
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

