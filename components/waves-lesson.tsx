"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SlideNavigation } from "./slide-navigation"

interface WavesLessonProps {
  onBack: () => void
}

export function WavesLesson({ onBack }: WavesLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [amplitude, setAmplitude] = useState([30])
  const [frequency, setFrequency] = useState([1])
  const [waveType, setWaveType] = useState<"transverse" | "longitudinal">("transverse")
  const [waveShape, setWaveShape] = useState<"sine" | "square" | "triangular">("sine")
  const [showWaveform, setShowWaveform] = useState(true)
  const [showMeasurements, setShowMeasurements] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const slides = [
    {
      title: "What are Waves?",
      leftContent: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Understanding Waves</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              A <span className="text-blue-400 font-semibold">wave</span> is a disturbance that transfers{" "}
              <span className="text-green-400 font-semibold">energy</span> from one place to another without
              transferring <span className="text-purple-400 font-semibold">matter</span>. Waves are everywhere around
              us!
            </p>
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-blue-400 font-semibold mb-3">Examples of Waves:</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • <span className="text-yellow-400">Sound waves</span> - vibrations in air
                </li>
                <li>
                  • <span className="text-red-400">Light waves</span> - electromagnetic radiation
                </li>
                <li>
                  • <span className="text-cyan-400">Water waves</span> - disturbances on water surface
                </li>
                <li>
                  • <span className="text-orange-400">Seismic waves</span> - vibrations in Earth's crust
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
              <h3 className="text-purple-400 font-semibold mb-3">Key Concept:</h3>
              <p className="text-sm">
                Waves carry <span className="text-green-400 font-semibold">energy</span> but not{" "}
                <span className="text-red-400 font-semibold">matter</span>. Think of a wave in water - the water
                molecules move up and down, but they don't travel with the wave!
              </p>
            </div>
          </div>
        </div>
      ),
      rightContent: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Wave Motion Visualization</h2>
          <div className="flex-1 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="border border-slate-600 rounded-lg bg-slate-900"
            />
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold mb-3">Observe:</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• The wave pattern moves from left to right</li>
              <li>• Individual points move up and down</li>
              <li>• Energy travels horizontally, matter moves vertically</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Wave Properties",
      leftContent: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Key Wave Properties</h2>
          <div className="space-y-4 text-slate-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">Amplitude (A)</h3>
                <p className="text-sm">Maximum displacement from rest position</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-purple-400 font-semibold mb-2">Wavelength (λ)</h3>
                <p className="text-sm">Distance between two consecutive peaks</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">Frequency (f)</h3>
                <p className="text-sm">Number of waves per second (Hz)</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold mb-2">Period (T)</h3>
                <p className="text-sm">Time for one complete wave (T = 1/f)</p>
              </div>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-blue-400 font-semibold mb-2">Wave Equation:</h3>
              <p className="text-lg font-mono">v = f × λ</p>
              <p className="text-sm text-slate-400 mt-1">where v = wave speed, f = frequency, λ = wavelength</p>
            </div>
          </div>
        </div>
      ),
      rightContent: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Interactive Controls</h2>
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <label className="text-white font-medium mb-2 block">Amplitude: {amplitude[0]}px</label>
              <Slider value={amplitude} onValueChange={setAmplitude} max={60} min={10} step={5} className="mb-4" />
              <label className="text-white font-medium mb-2 block">Frequency: {frequency[0]} Hz</label>
              <Slider value={frequency} onValueChange={setFrequency} max={3} min={0.5} step={0.1} className="mb-4" />
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-3">Real-time Calculations:</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div>Period (T) = {(1 / frequency[0]).toFixed(2)} seconds</div>
                <div>Wavelength (λ) = {(400 / (frequency[0] * 10)).toFixed(1)} pixels</div>
                <div>Wave Speed (v) = {(frequency[0] * 40).toFixed(1)} pixels/second</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Wave Types & Shapes",
      leftContent: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Different Wave Shapes</h2>
          <div className="space-y-4 text-slate-300">
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-500/30">
              <h3 className="text-green-400 font-semibold mb-3">Sine Wave</h3>
              <p className="text-sm">
                The most common wave shape found in nature. Sound waves, light waves, and radio waves are typically sine
                waves.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
              <h3 className="text-purple-400 font-semibold mb-3">Square Wave</h3>
              <p className="text-sm">
                Digital signals often use square waves. They switch instantly between high and low values.
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-4 border border-orange-500/30">
              <h3 className="text-orange-400 font-semibold mb-3">Triangular Wave</h3>
              <p className="text-sm">
                Linear rise and fall pattern. Often used in music synthesis and signal processing.
              </p>
            </div>
          </div>
        </div>
      ),
      rightContent: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Wave Shape Selector</h2>
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Choose Wave Shape:</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button
                  variant={waveShape === "sine" ? "default" : "outline"}
                  onClick={() => setWaveShape("sine")}
                  className="text-sm"
                >
                  Sine Wave
                </Button>
                <Button
                  variant={waveShape === "square" ? "default" : "outline"}
                  onClick={() => setWaveShape("square")}
                  className="text-sm"
                >
                  Square Wave
                </Button>
                <Button
                  variant={waveShape === "triangular" ? "default" : "outline"}
                  onClick={() => setWaveShape("triangular")}
                  className="text-sm"
                >
                  Triangular Wave
                </Button>
              </div>
              <label className="text-white font-medium mb-2 block">Amplitude: {amplitude[0]}px</label>
              <Slider value={amplitude} onValueChange={setAmplitude} max={60} min={10} step={5} className="mb-4" />
              <label className="text-white font-medium mb-2 block">Frequency: {frequency[0]} Hz</label>
              <Slider value={frequency} onValueChange={setFrequency} max={3} min={0.5} step={0.1} />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                className="border border-slate-600 rounded-lg bg-slate-900"
              />
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

      if (waveType === "transverse") {
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 3
        ctx.beginPath()

        for (let x = 0; x < canvas.width; x++) {
          let y: number
          const phase = x * 0.02 + time * frequency[0] * 0.1

          switch (waveShape) {
            case "sine":
              y = canvas.height / 2 + amplitude[0] * Math.sin(phase)
              break
            case "square":
              y = canvas.height / 2 + amplitude[0] * Math.sign(Math.sin(phase))
              break
            case "triangular":
              const trianglePhase = (phase % (2 * Math.PI)) / (2 * Math.PI)
              if (trianglePhase < 0.5) {
                y = canvas.height / 2 + amplitude[0] * (4 * trianglePhase - 1)
              } else {
                y = canvas.height / 2 + amplitude[0] * (3 - 4 * trianglePhase)
              }
              break
            default:
              y = canvas.height / 2 + amplitude[0] * Math.sin(phase)
          }

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()

        // Draw center line
        ctx.strokeStyle = "#475569"
        ctx.lineWidth = 1
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        ctx.lineTo(canvas.width, canvas.height / 2)
        ctx.stroke()
        ctx.setLineDash([])
      } else {
        // Draw longitudinal wave (particles)
        const particleCount = 50
        const baseSpacing = canvas.width / particleCount

        for (let i = 0; i < particleCount; i++) {
          const baseX = i * baseSpacing
          const displacement = amplitude[0] * 0.3 * Math.sin(i * 0.3 + time * frequency[0] * 0.1)
          const x = baseX + displacement

          ctx.fillStyle = `hsl(${220 + displacement * 2}, 70%, 60%)`
          ctx.beginPath()
          ctx.arc(x, canvas.height / 2, 4, 0, 2 * Math.PI)
          ctx.fill()
        }
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
  }, [amplitude, frequency, waveType, waveShape])

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
    <div className="min-h-screen bg-slate-900 flex flex-col overflow-hidden relative">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <div className="p-6 h-full">{slides[currentSlide].leftContent}</div>
          </Card>
        </div>

        {/* Right Side - Interactive Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <div className="p-6 h-full">{slides[currentSlide].rightContent}</div>
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
