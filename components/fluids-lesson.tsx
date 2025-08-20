"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SlideNavigation } from "./slide-navigation"

interface FluidsLessonProps {
  onBack: () => void
}

export function FluidsLesson({ onBack }: FluidsLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [objectDensity, setObjectDensity] = useState([0.8])
  const [fluidDensity, setFluidDensity] = useState([1.0])
  const [pressure, setPressure] = useState([1])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const slides = [
    {
      title: "Introduction to Fluids",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">What are Fluids?</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              <span className="text-blue-400 font-semibold">Fluids</span> are substances that can flow and take the
              shape of their container. This includes both <span className="text-cyan-400 font-semibold">liquids</span>{" "}
              and <span className="text-purple-400 font-semibold">gases</span>.
            </p>
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-blue-400 font-semibold mb-3">Key Properties:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-green-400 font-semibold">Density (ρ)</div>
                  <div className="text-sm text-slate-300">Mass per unit volume</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-purple-400 font-semibold">Pressure (P)</div>
                  <div className="text-sm text-slate-300">Force per unit area</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-yellow-400 font-semibold">Viscosity</div>
                  <div className="text-sm text-slate-300">Resistance to flow</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-red-400 font-semibold">Buoyancy</div>
                  <div className="text-sm text-slate-300">Upward force on objects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pressure in Fluids",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Pressure</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              Pressure in fluids increases with depth due to the weight of the fluid above.
            </p>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-500/30">
                <div className="text-blue-400 font-semibold mb-2">Pressure Formula:</div>
                <div className="text-xl font-mono text-white">P = ρgh</div>
                <div className="text-sm text-slate-400 mt-1">where ρ = density, g = gravity, h = height</div>
              </div>
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
                <div className="text-purple-400 font-semibold mb-2">Pascal's Principle:</div>
                <div className="text-white">
                  Pressure applied to a confined fluid is transmitted equally in all directions
                </div>
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <label className="text-white font-medium mb-2 block">Depth Level: {pressure[0]} units</label>
              <Slider value={pressure} onValueChange={setPressure} max={5} min={1} step={1} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Archimedes' Principle",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Buoyancy and Floating</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              When an object is submerged in a fluid, it experiences an upward force called{" "}
              <span className="text-green-400 font-semibold">buoyant force</span>.
            </p>
            <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-500/30">
              <div className="text-green-400 font-semibold mb-2">Archimedes' Principle:</div>
              <div className="text-white mb-2">The buoyant force equals the weight of displaced fluid</div>
              <div className="text-xl font-mono text-white">F_b = ρ_fluid × V_displaced × g</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-900/30 rounded p-3 border border-blue-500/30">
                <div className="text-blue-400 font-semibold text-sm">Floats</div>
                <div className="text-xs text-slate-300">ρ_object &lt; ρ_fluid</div>
              </div>
              <div className="bg-yellow-900/30 rounded p-3 border border-yellow-500/30">
                <div className="text-yellow-400 font-semibold text-sm">Neutral</div>
                <div className="text-xs text-slate-300">ρ_object = ρ_fluid</div>
              </div>
              <div className="bg-red-900/30 rounded p-3 border border-red-500/30">
                <div className="text-red-400 font-semibold text-sm">Sinks</div>
                <div className="text-xs text-slate-300">ρ_object &gt; ρ_fluid</div>
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 space-y-3">
              <div>
                <label className="text-white font-medium mb-2 block">Object Density: {objectDensity[0]} g/cm³</label>
                <Slider value={objectDensity} onValueChange={setObjectDensity} max={2.0} min={0.2} step={0.1} />
              </div>
              <div>
                <label className="text-white font-medium mb-2 block">Fluid Density: {fluidDensity[0]} g/cm³</label>
                <Slider value={fluidDensity} onValueChange={setFluidDensity} max={1.5} min={0.5} step={0.1} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Bernoulli's Principle",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Fluid Flow and Energy</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              For flowing fluids, there's a relationship between pressure, velocity, and height.
            </p>
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/30">
              <div className="text-purple-400 font-semibold mb-2">Bernoulli's Equation:</div>
              <div className="text-xl font-mono text-white">P + ½ρv² + ρgh = constant</div>
              <div className="text-sm text-slate-400 mt-2">Pressure + Kinetic Energy + Potential Energy = Constant</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/30">
                <h3 className="text-blue-400 font-semibold mb-2">Applications:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Airplane wing lift</li>
                  <li>• Venturi tubes</li>
                  <li>• Carburetor operation</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-500/30">
                <h3 className="text-green-400 font-semibold mb-2">Key Insight:</h3>
                <div className="text-sm">Higher velocity = Lower pressure</div>
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
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (currentSlide === 1) {
        // Pressure visualization
        const containerHeight = 200
        const containerWidth = 150
        const startX = (canvas.width - containerWidth) / 2
        const startY = 50

        // Draw container
        ctx.strokeStyle = "#64748b"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX, startY + containerHeight)
        ctx.lineTo(startX + containerWidth, startY + containerHeight)
        ctx.lineTo(startX + containerWidth, startY)
        ctx.stroke()

        // Draw fluid levels with pressure indication
        for (let i = 0; i < pressure[0]; i++) {
          const level = containerHeight - (i + 1) * (containerHeight / pressure[0])
          const alpha = 0.3 + (i * 0.4) / pressure[0]

          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
          ctx.fillRect(startX + 2, startY + level, containerWidth - 4, containerHeight / pressure[0] - 2)

          // Pressure arrows
          ctx.strokeStyle = "#ef4444"
          ctx.lineWidth = 2
          const arrowLength = 20 + i * 10
          ctx.beginPath()
          ctx.moveTo(startX + containerWidth + 10, startY + level + containerHeight / pressure[0] / 2)
          ctx.lineTo(startX + containerWidth + 10 + arrowLength, startY + level + containerHeight / pressure[0] / 2)
          ctx.stroke()
        }
      } else if (currentSlide === 2) {
        // Buoyancy simulation
        const fluidLevel = 200
        const objectSize = 40
        const objectX = canvas.width / 2 - objectSize / 2

        // Determine object position based on density
        let objectY
        if (objectDensity[0] < fluidDensity[0]) {
          // Floats
          objectY = fluidLevel - objectSize * (objectDensity[0] / fluidDensity[0])
        } else if (objectDensity[0] === fluidDensity[0]) {
          // Neutral buoyancy
          objectY = fluidLevel - objectSize / 2
        } else {
          // Sinks
          objectY = fluidLevel + 20
        }

        // Draw fluid
        ctx.fillStyle = "rgba(59, 130, 246, 0.3)"
        ctx.fillRect(0, fluidLevel, canvas.width, canvas.height - fluidLevel)

        // Draw fluid surface
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, fluidLevel)
        ctx.lineTo(canvas.width, fluidLevel)
        ctx.stroke()

        // Draw object
        const objectColor =
          objectDensity[0] < fluidDensity[0] ? "#10b981" : objectDensity[0] === fluidDensity[0] ? "#f59e0b" : "#ef4444"
        ctx.fillStyle = objectColor
        ctx.fillRect(objectX, objectY, objectSize, objectSize)

        // Draw forces
        if (objectY < fluidLevel + 50) {
          // Buoyant force (upward)
          ctx.strokeStyle = "#10b981"
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(objectX + objectSize / 2, objectY + objectSize)
          ctx.lineTo(objectX + objectSize / 2, objectY + objectSize + 40)
          ctx.stroke()

          // Weight force (downward)
          ctx.strokeStyle = "#ef4444"
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(objectX + objectSize / 2, objectY)
          ctx.lineTo(objectX + objectSize / 2, objectY - 40)
          ctx.stroke()
        }

        // Labels
        ctx.fillStyle = "#ffffff"
        ctx.font = "12px Arial"
        ctx.fillText(`Object: ${objectDensity[0]} g/cm³`, 20, 30)
        ctx.fillText(`Fluid: ${fluidDensity[0]} g/cm³`, 20, 50)
      } else if (currentSlide === 3) {
        // Bernoulli's principle - pipe flow
        const pipeY = canvas.height / 2
        const pipeHeight = 40

        // Draw pipe with varying width
        ctx.fillStyle = "#64748b"
        ctx.beginPath()
        ctx.moveTo(50, pipeY - pipeHeight)
        ctx.lineTo(150, pipeY - pipeHeight / 2)
        ctx.lineTo(250, pipeY - pipeHeight / 2)
        ctx.lineTo(350, pipeY - pipeHeight)
        ctx.lineTo(350, pipeY + pipeHeight)
        ctx.lineTo(250, pipeY + pipeHeight / 2)
        ctx.lineTo(150, pipeY + pipeHeight / 2)
        ctx.lineTo(50, pipeY + pipeHeight)
        ctx.closePath()
        ctx.fill()

        // Draw flow lines
        const flowSpeed = time * 0.1
        for (let i = 0; i < 5; i++) {
          const y = pipeY - pipeHeight / 2 + (i * pipeHeight) / 4
          const x1 = 60 + (flowSpeed % 100)
          const x2 = 160 + (flowSpeed % 100) * 1.5
          const x3 = 260 + (flowSpeed % 100)

          ctx.strokeStyle = "#3b82f6"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(x1 + 20, y)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(x2, y)
          ctx.lineTo(x2 + 30, y)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(x3, y)
          ctx.lineTo(x3 + 20, y)
          ctx.stroke()
        }

        // Pressure indicators
        ctx.fillStyle = "#ef4444"
        ctx.font = "12px Arial"
        ctx.fillText("High P", 70, pipeY - 60)
        ctx.fillText("Low P", 170, pipeY - 30)
        ctx.fillText("High P", 270, pipeY - 60)
      }

      time += 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [currentSlide, objectDensity, fluidDensity, pressure])

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
                {currentSlide === 0 && "Fluid Properties"}
                {currentSlide === 1 && "Pressure Simulation"}
                {currentSlide === 2 && "Buoyancy Experiment"}
                {currentSlide === 3 && "Bernoulli's Flow"}
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
