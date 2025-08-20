"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SlideNavigation } from "./slide-navigation"

interface AtomicStructureLessonProps {
  onBack: () => void
}

export function AtomicStructureLesson({ onBack }: AtomicStructureLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [electrons, setElectrons] = useState([2])
  const [animationSpeed, setAnimationSpeed] = useState([50])
  const [showOrbits, setShowOrbits] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const slides = [
    {
      title: "Introduction to Atoms",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">What is an Atom?</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              An <span className="text-blue-400 font-semibold">atom</span> is the smallest unit of matter that retains
              the properties of an element. Everything around us is made up of atoms!
            </p>
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-blue-400 font-semibold mb-3">Key Facts:</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • Atoms are incredibly small - about <span className="text-green-400">0.1 nanometers</span>
                </li>
                <li>
                  • They consist of a <span className="text-red-400">nucleus</span> and{" "}
                  <span className="text-blue-400">electrons</span>
                </li>
                <li>
                  • The nucleus contains <span className="text-yellow-400">protons</span> and{" "}
                  <span className="text-purple-400">neutrons</span>
                </li>
                <li>
                  • Electrons orbit around the nucleus in <span className="text-cyan-400">energy levels</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Bohr's Atomic Model",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Bohr's Model of the Atom</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              Niels Bohr proposed that electrons move in fixed circular orbits around the nucleus.
            </p>
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">Bohr's Postulates:</h3>
              <ul className="space-y-2 text-sm">
                <li>• Electrons revolve in fixed orbits called energy levels</li>
                <li>• Each orbit has a specific energy</li>
                <li>• Electrons don't radiate energy while in these orbits</li>
                <li>• Energy is absorbed/emitted when electrons jump between orbits</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Interactive Atom Simulation",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Build Your Own Atom</h2>
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <label className="text-white font-medium mb-2 block">Number of Electrons: {electrons[0]}</label>
              <Slider value={electrons} onValueChange={setElectrons} max={18} min={1} step={1} className="mb-4" />
              <label className="text-white font-medium mb-2 block">Animation Speed: {animationSpeed[0]}%</label>
              <Slider value={animationSpeed} onValueChange={setAnimationSpeed} max={100} min={10} step={10} />
            </div>
          </div>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let angle = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw nucleus
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI)
      ctx.fill()

      // Draw nucleus label
      if (showLabels) {
        ctx.fillStyle = "#white"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Nucleus", centerX, centerY + 35)
      }

      // Draw electron orbits and electrons
      const orbits = [60, 100, 140]
      let electronCount = 0

      for (let i = 0; i < 3 && electronCount < electrons[0]; i++) {
        const radius = orbits[i]

        // Draw orbit
        if (showOrbits) {
          ctx.strokeStyle = "#475569"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
          ctx.stroke()
        }

        // Determine electrons in this shell (2, 8, 8 rule)
        const maxElectrons = i === 0 ? 2 : 8
        const electronsInShell = Math.min(maxElectrons, electrons[0] - electronCount)

        // Draw electrons
        for (let j = 0; j < electronsInShell; j++) {
          const electronAngle = angle + (j * 2 * Math.PI) / electronsInShell + i * 0.5
          const x = centerX + radius * Math.cos(electronAngle)
          const y = centerY + radius * Math.sin(electronAngle)

          ctx.fillStyle = "#3b82f6"
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, 2 * Math.PI)
          ctx.fill()
        }

        electronCount += electronsInShell
      }

      angle += animationSpeed[0] / 1000
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [electrons, animationSpeed, showOrbits, showLabels])

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl">
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">{slides[currentSlide].content}</div>
            </Card>
          </div>
        </div>

        {/* Right Side - Animation */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <div className="p-6 h-full flex flex-col">
              <h3 className="text-blue-400 text-lg font-semibold mb-4">
                {currentSlide === 2 ? "Interactive Atom Model" : "Atom Visualization"}
              </h3>
              {currentSlide === 2 && (
                <div className="mb-4 flex gap-2">
                  <Button
                    variant={showOrbits ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowOrbits(!showOrbits)}
                  >
                    {showOrbits ? "Hide" : "Show"} Orbits
                  </Button>
                  <Button
                    variant={showLabels ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowLabels(!showLabels)}
                  >
                    {showLabels ? "Hide" : "Show"} Labels
                  </Button>
                </div>
              )}
              <div className="flex-1 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  className="border border-slate-600 rounded-lg bg-slate-900 cursor-pointer"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onBack={onBack}
        slideTitle={slides[currentSlide].title}
      />
    </div>
  )
}
