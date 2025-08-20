"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SlideNavigation } from "./slide-navigation"

interface KinematicsLessonProps {
  onBack: () => void
}

export function KinematicsLesson({ onBack }: KinematicsLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [velocity, setVelocity] = useState([5])
  const [showVectors, setShowVectors] = useState(false)
  const linearCanvasRef = useRef<HTMLCanvasElement>(null)
  const circularCanvasRef = useRef<HTMLCanvasElement>(null)
  const graphCanvasRef = useRef<HTMLCanvasElement>(null)

  const slides = [
    {
      title: "Introduction to Kinematics",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">What is Kinematics?</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              <span className="text-blue-400 font-semibold">Kinematics</span> is the branch of mechanics that describes
              the motion of objects without considering the forces that cause the motion. It's the foundation of
              classical physics, focusing on
              <span className="text-green-400 font-semibold"> position</span>,{" "}
              <span className="text-purple-400 font-semibold">velocity</span>, and{" "}
              <span className="text-yellow-400 font-semibold">acceleration</span>.
            </p>
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-blue-400 font-semibold mb-3">Key Concepts:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-green-400 font-semibold">Position (s)</div>
                  <div className="text-sm text-slate-300">Location of object in space</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-purple-400 font-semibold">Velocity (v)</div>
                  <div className="text-sm text-slate-300">Rate of change of position</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-yellow-400 font-semibold">Acceleration (a)</div>
                  <div className="text-sm text-slate-300">Rate of change of velocity</div>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-red-400 font-semibold">Time (t)</div>
                  <div className="text-sm text-slate-300">Duration of motion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Types of Motion",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Motion Types</h2>
          <div className="space-y-4 text-slate-300">
            <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-blue-400 font-semibold mb-3">Linear Motion</h3>
              <p className="text-sm mb-2">Motion along a straight line path</p>
              <div className="text-xs text-slate-400">Examples: Car on highway, falling object, train on track</div>
            </div>
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
              <h3 className="text-purple-400 font-semibold mb-3">Circular Motion</h3>
              <p className="text-sm mb-2">Motion along a circular path</p>
              <div className="text-xs text-slate-400">Examples: Planets orbiting sun, wheel rotation, pendulum</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <label className="text-white font-medium mb-2 block">Motion Speed: {velocity[0]} units/s</label>
              <Slider value={velocity} onValueChange={setVelocity} max={15} min={1} step={1} className="mb-3" />
              <Button
                variant={showVectors ? "default" : "outline"}
                onClick={() => setShowVectors(!showVectors)}
                className="w-full"
              >
                {showVectors ? "Hide" : "Show"} Velocity Vectors
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Equations of Motion",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Kinematic Equations</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              These equations describe the relationship between{" "}
              <span className="text-green-400 font-semibold">displacement</span>,
              <span className="text-purple-400 font-semibold"> velocity</span>,{" "}
              <span className="text-yellow-400 font-semibold">acceleration</span>, and{" "}
              <span className="text-red-400 font-semibold">time</span>.
            </p>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-500/30">
                <div className="text-green-400 font-semibold mb-2">First Equation:</div>
                <div className="text-xl font-mono text-white">v = u + at</div>
                <div className="text-sm text-slate-400 mt-1">
                  Final velocity = Initial velocity + (acceleration × time)
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/30">
                <div className="text-purple-400 font-semibold mb-2">Second Equation:</div>
                <div className="text-xl font-mono text-white">s = ut + ½at²</div>
                <div className="text-sm text-slate-400 mt-1">Displacement with time</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-900/30 to-blue-900/30 rounded-lg p-4 border border-yellow-500/30">
                <div className="text-yellow-400 font-semibold mb-2">Third Equation:</div>
                <div className="text-xl font-mono text-white">v² = u² + 2as</div>
                <div className="text-sm text-slate-400 mt-1">Velocity-displacement relationship</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Motion Graphs",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Motion Graphs</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              Graphs help us visualize how position, velocity, and acceleration change over time.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/30">
                <h3 className="text-blue-400 font-semibold mb-2">Position-Time Graph</h3>
                <ul className="text-sm space-y-1">
                  <li>• Slope = velocity</li>
                  <li>• Straight line = constant velocity</li>
                  <li>• Curved line = changing velocity</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-500/30">
                <h3 className="text-green-400 font-semibold mb-2">Velocity-Time Graph</h3>
                <ul className="text-sm space-y-1">
                  <li>• Slope = acceleration</li>
                  <li>• Area under curve = displacement</li>
                  <li>• Horizontal line = constant velocity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  useEffect(() => {
    // Linear Motion Animation
    const linearCanvas = linearCanvasRef.current
    if (linearCanvas) {
      const ctx = linearCanvas.getContext("2d")
      if (ctx) {
        let position = 0
        let direction = 1
        const speed = velocity[0]

        const animateLinear = () => {
          ctx.clearRect(0, 0, linearCanvas.width, linearCanvas.height)

          // Draw track line
          ctx.strokeStyle = "#475569"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(20, linearCanvas.height / 2)
          ctx.lineTo(linearCanvas.width - 20, linearCanvas.height / 2)
          ctx.stroke()

          // Draw moving dot
          ctx.fillStyle = "#3b82f6"
          ctx.beginPath()
          ctx.arc(20 + position, linearCanvas.height / 2, 8, 0, 2 * Math.PI)
          ctx.fill()

          // Update position
          position += speed * direction
          if (position >= linearCanvas.width - 40 || position <= 0) {
            direction *= -1
          }

          requestAnimationFrame(animateLinear)
        }
        animateLinear()
      }
    }

    // Circular Motion Animation
    const circularCanvas = circularCanvasRef.current
    if (circularCanvas) {
      const ctx = circularCanvas.getContext("2d")
      if (ctx) {
        let angle = 0
        const radius = 60
        const centerX = circularCanvas.width / 2
        const centerY = circularCanvas.height / 2

        const animateCircular = () => {
          ctx.clearRect(0, 0, circularCanvas.width, circularCanvas.height)

          // Draw circular path
          ctx.strokeStyle = "#475569"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
          ctx.stroke()

          // Draw moving dot
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)

          ctx.fillStyle = "#a855f7"
          ctx.beginPath()
          ctx.arc(x, y, 8, 0, 2 * Math.PI)
          ctx.fill()

          angle += 0.03
          requestAnimationFrame(animateCircular)
        }
        animateCircular()
      }
    }

    // Motion Graphs Animation
    const graphCanvas = graphCanvasRef.current
    if (graphCanvas) {
      const ctx = graphCanvas.getContext("2d")
      if (ctx) {
        let time = 0
        const interval = 1000 / 60 // 60 frames per second
        const positions = []
        const velocities = []

        const animateGraphs = () => {
          ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height)

          // Draw position-time graph
          ctx.strokeStyle = "#3b82f6"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(20, graphCanvas.height / 2)
          positions.forEach((pos, index) => {
            ctx.lineTo(20 + index * 10, graphCanvas.height / 2 - pos * 5)
          })
          ctx.stroke()

          // Draw velocity-time graph
          ctx.strokeStyle = "#a855f7"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(20, graphCanvas.height / 2 + 50)
          velocities.forEach((vel, index) => {
            ctx.lineTo(20 + index * 10, graphCanvas.height / 2 + 50 - vel * 5)
          })
          ctx.stroke()

          time += interval
          const newPosition = (velocity[0] * time) / 1000
          positions.push(newPosition)
          velocities.push(velocity[0])

          if (positions.length > graphCanvas.width / 10 - 2) {
            positions.shift()
            velocities.shift()
          }

          requestAnimationFrame(animateGraphs)
        }
        animateGraphs()
      }
    }
  }, [velocity])

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

        {/* Right Side - Interactive Animations */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <div className="p-6 h-full flex flex-col">
              <h3 className="text-blue-400 text-lg font-semibold mb-4">
                {currentSlide === 0 && "Motion Visualization"}
                {currentSlide === 1 && "Interactive Motion Types"}
                {currentSlide === 2 && "Equation Demonstration"}
                {currentSlide === 3 && "Motion Graphs"}
              </h3>
              <div className="flex-1 flex items-center justify-center">
                {currentSlide <= 1 && (
                  <div className="space-y-6 w-full">
                    {/* Linear Motion */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h4 className="text-blue-400 font-medium mb-2">Linear Motion</h4>
                      <canvas
                        ref={linearCanvasRef}
                        width={350}
                        height={80}
                        className="w-full h-20 bg-slate-900 rounded"
                      />
                    </div>
                    {/* Circular Motion */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h4 className="text-purple-400 font-medium mb-2">Circular Motion</h4>
                      <div className="flex justify-center">
                        <canvas ref={circularCanvasRef} width={200} height={200} className="bg-slate-900 rounded" />
                      </div>
                    </div>
                  </div>
                )}
                {currentSlide === 3 && (
                  <div className="w-full">
                    <canvas
                      ref={graphCanvasRef}
                      width={400}
                      height={300}
                      className="w-full bg-slate-900 rounded border border-slate-600"
                    />
                  </div>
                )}
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
