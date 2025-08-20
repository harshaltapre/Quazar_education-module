"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SlideNavigation } from "./slide-navigation"

interface OpticsLessonProps {
  onBack: () => void
}

export function OpticsLesson({ onBack }: OpticsLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [rayAngle, setRayAngle] = useState([30])
  const [refractiveIndex, setRefractiveIndex] = useState([1.5])
  const [lensType, setLensType] = useState<"convex" | "concave">("convex")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const slides = [
    {
      title: "Introduction to Optics",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">What is Optics?</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              <span className="text-blue-400 font-semibold">Optics</span> is the branch of physics that studies
              <span className="text-yellow-400 font-semibold"> light</span> and its behavior. It explains how we see and
              how optical instruments work.
            </p>
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/30">
              <h3 className="text-yellow-400 font-semibold mb-3">Properties of Light:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-blue-400 font-semibold">Rectilinear</div>
                  <div className="text-sm text-slate-300">Travels in straight lines</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-green-400 font-semibold">Speed</div>
                  <div className="text-sm text-slate-300">3 × 10⁸ m/s in vacuum</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-purple-400 font-semibold">Wavelength</div>
                  <div className="text-sm text-slate-300">Determines color</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-red-400 font-semibold">Energy</div>
                  <div className="text-sm text-slate-300">E = hf (Planck's equation)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Reflection of Light",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Laws of Reflection</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">When light hits a surface, it bounces back following specific laws.</p>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/30">
                <div className="text-blue-400 font-semibold mb-2">First Law:</div>
                <div className="text-white">The incident ray, reflected ray, and normal all lie in the same plane</div>
              </div>
              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-500/30">
                <div className="text-green-400 font-semibold mb-2">Second Law:</div>
                <div className="text-white">Angle of incidence = Angle of reflection</div>
                <div className="text-sm text-slate-400 mt-1">∠i = ∠r</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Refraction of Light",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Snell's Law of Refraction</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              When light passes from one medium to another, it bends due to change in speed.
            </p>
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
              <div className="text-purple-400 font-semibold mb-2">Snell's Law:</div>
              <div className="text-xl font-mono text-white">n₁ sin θ₁ = n₂ sin θ₂</div>
              <div className="text-sm text-slate-400 mt-2">where n = refractive index, θ = angle with normal</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <label className="text-white font-medium mb-2 block">Incident Angle: {rayAngle[0]}°</label>
              <Slider value={rayAngle} onValueChange={setRayAngle} max={80} min={10} step={5} className="mb-3" />
              <label className="text-white font-medium mb-2 block">Refractive Index: {refractiveIndex[0]}</label>
              <Slider value={refractiveIndex} onValueChange={setRefractiveIndex} max={2.5} min={1.0} step={0.1} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Lenses and Mirrors",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Optical Instruments</h2>
          <div className="space-y-4 text-slate-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-500/30">
                <h3 className="text-blue-400 font-semibold mb-2">Convex Lens</h3>
                <ul className="text-sm space-y-1">
                  <li>• Converges light rays</li>
                  <li>• Forms real/virtual images</li>
                  <li>• Used in cameras, eyes</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-lg p-4 border border-red-500/30">
                <h3 className="text-red-400 font-semibold mb-2">Concave Lens</h3>
                <ul className="text-sm space-y-1">
                  <li>• Diverges light rays</li>
                  <li>• Forms virtual images</li>
                  <li>• Used in telescopes</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex gap-2 mb-3">
                <Button
                  variant={lensType === "convex" ? "default" : "outline"}
                  onClick={() => setLensType("convex")}
                  className="flex-1"
                >
                  Convex Lens
                </Button>
                <Button
                  variant={lensType === "concave" ? "default" : "outline"}
                  onClick={() => setLensType("concave")}
                  className="flex-1"
                >
                  Concave Lens
                </Button>
              </div>
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (currentSlide === 1) {
        // Reflection simulation
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Draw mirror
        ctx.strokeStyle = "#64748b"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(centerX, centerY - 100)
        ctx.lineTo(centerX, centerY + 100)
        ctx.stroke()

        // Draw normal
        ctx.strokeStyle = "#475569"
        ctx.lineWidth = 1
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(centerX - 50, centerY)
        ctx.lineTo(centerX + 50, centerY)
        ctx.stroke()
        ctx.setLineDash([])

        // Draw incident ray
        const angle = (rayAngle[0] * Math.PI) / 180
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX - 80 * Math.cos(angle), centerY - 80 * Math.sin(angle))
        ctx.lineTo(centerX, centerY)
        ctx.stroke()

        // Draw reflected ray
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + 80 * Math.cos(angle), centerY - 80 * Math.sin(angle))
        ctx.stroke()

        // Labels
        ctx.fillStyle = "#3b82f6"
        ctx.font = "12px Arial"
        ctx.fillText("Incident Ray", centerX - 120, centerY - 50)
        ctx.fillStyle = "#ef4444"
        ctx.fillText("Reflected Ray", centerX + 50, centerY - 50)
      } else if (currentSlide === 2) {
        // Refraction simulation
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Draw interface
        ctx.strokeStyle = "#64748b"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, centerY)
        ctx.lineTo(canvas.width, centerY)
        ctx.stroke()

        // Draw media labels
        ctx.fillStyle = "#94a3b8"
        ctx.font = "14px Arial"
        ctx.fillText("Air (n=1.0)", 20, 30)
        ctx.fillText(`Glass (n=${refractiveIndex[0]})`, 20, canvas.height - 20)

        // Calculate refracted angle using Snell's law
        const incidentAngle = (rayAngle[0] * Math.PI) / 180
        const refractedAngle = Math.asin(Math.sin(incidentAngle) / refractiveIndex[0])

        // Draw incident ray
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX - 80 * Math.sin(incidentAngle), centerY - 80 * Math.cos(incidentAngle))
        ctx.lineTo(centerX, centerY)
        ctx.stroke()

        // Draw refracted ray
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + 80 * Math.sin(refractedAngle), centerY + 80 * Math.cos(refractedAngle))
        ctx.stroke()
      } else if (currentSlide === 3) {
        // Lens simulation
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        if (lensType === "convex") {
          // Draw convex lens
          ctx.strokeStyle = "#64748b"
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.arc(centerX - 30, centerY, 60, -Math.PI / 3, Math.PI / 3)
          ctx.arc(centerX + 30, centerY, 60, (2 * Math.PI) / 3, (4 * Math.PI) / 3)
          ctx.stroke()

          // Draw converging rays
          ctx.strokeStyle = "#3b82f6"
          ctx.lineWidth = 2
          for (let i = -2; i <= 2; i++) {
            ctx.beginPath()
            ctx.moveTo(50, centerY + i * 20)
            ctx.lineTo(centerX, centerY + i * 10)
            ctx.lineTo(centerX + 100, centerY)
            ctx.stroke()
          }
        } else {
          // Draw concave lens
          ctx.strokeStyle = "#64748b"
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.arc(centerX + 30, centerY, 60, Math.PI / 3, -Math.PI / 3, true)
          ctx.arc(centerX - 30, centerY, 60, (-2 * Math.PI) / 3, (-4 * Math.PI) / 3, true)
          ctx.stroke()

          // Draw diverging rays
          ctx.strokeStyle = "#ef4444"
          ctx.lineWidth = 2
          for (let i = -2; i <= 2; i++) {
            ctx.beginPath()
            ctx.moveTo(50, centerY + i * 20)
            ctx.lineTo(centerX, centerY + i * 10)
            ctx.lineTo(centerX + 80, centerY + i * 30)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [currentSlide, rayAngle, refractiveIndex, lensType])

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
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl">
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">{slides[currentSlide].content}</div>
            </Card>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <div className="p-6 h-full flex flex-col">
              <h3 className="text-blue-400 text-lg font-semibold mb-4">
                {currentSlide === 0 && "Light Properties"}
                {currentSlide === 1 && "Reflection Simulation"}
                {currentSlide === 2 && "Refraction Simulation"}
                {currentSlide === 3 && "Lens Ray Diagrams"}
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={300}
                  className="border border-slate-600 rounded-lg bg-slate-900"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

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
