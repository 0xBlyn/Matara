'use client'

import Image from 'next/image'
import { useState } from 'react'
import chevronleft from '@/images/Group 90.png'
import chevronright from '@/images/Group 91.png'

// Define the ranks data
const ranks = [
  {
    id: 1,
    name: "Cub Recruit",
    range: "0 - 99 $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    name: "Scout",
    range: "100 - 999 $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    name: "Warrior",
    range: "1,000 - 9,999 $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 4,
    name: "Sergeant",
    range: "10,000 - 99,999 $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 5,
    name: "Captain",
    range: "100,000 - 999,999 $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 6,
    name: "Lieutenant",
    range: "1,000,000 - 9,999,999 $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 7,
    name: "Commander",
    range: "10,000,000 - 99,999,999 $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 8,
    name: "General",
    range: "100,000,000+ $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 9,
    name: "Field Marshal",
    range: "1,000,000,000+ $MAT",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 10,
    name: "Champion of Matara",
    range: "10,000,000,000+ $MAT",
    image: "/placeholder.svg?height=120&width=120",
  }
]

export default function MRanks() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? ranks.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === ranks.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-[#001122] flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-gray-400 hover:text-green-400 transition-colors"
          aria-label="Previous rank"
        >
          <Image src={chevronleft} width={50} height={50} alt='' >
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-gray-400 hover:text-green-400 transition-colors"
          aria-label="Next rank"
        >
          <Image src={chevronright} width={50} height={50} alt='' >
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center space-y-4 p-8"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={ranks[currentIndex].image}
                alt={`${ranks[currentIndex].name} rank badge`}
                className="w-32 h-32 object-contain"
              />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-green-400"
            >
              {ranks[currentIndex].name}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-sm"
            >
              {ranks[currentIndex].range}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-4"
            >
              <Button 
                variant="outline" 
                className="bg-transparent border-green-500 text-green-400 hover:bg-green-500/10"
              >
                2500 $MAT
                <img
                  src="/placeholder.svg?height=24&width=24"
                  alt="Warrior icon"
                  className="ml-2 w-6 h-6"
                />
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

