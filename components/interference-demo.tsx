"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Waves } from "lucide-react"

interface InterferenceDemoProps {
  onComplete: () => void
}

export function InterferenceDemo({ onComplete }: InterferenceDemoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const [isPlaying, setIsPlaying] = useState(false)
  const [amplitude1, setAmplitude1] = useState([40])
  const [amplitude2, setAmplitude2] = useState([40])
  const [frequency1, setFrequency1] = useState([0.03])
  const [frequency2, setFrequency2] = useState([0.03])
  const [phaseShift, setPhaseShift] = useState([0])
  const [time, setTime] = useState(0)
  const [showIndividual, setShowIndividual] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 400

    const drawInterference = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw equilibrium line
      ctx.strokeStyle = "rgba(156, 163, 175, 0.8)"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()
      ctx.setLineDash([])

      // Calculate waves
      const wave1Points: number[] = []
      const wave2Points: number[] = []
      const resultantPoints: number[] = []

      for (let x = 0; x < canvas.width; x++) {
        const y1 = amplitude1[0] * Math.sin(frequency1[0] * x - 0.05 * time)
        const y2 = amplitude2[0] * Math.sin(frequency2[0] * x - 0.05 * time + phaseShift[0])
        const resultant = y1 + y2

        wave1Points.push(canvas.height / 2 + y1)
        wave2Points.push(canvas.height / 2 + y2)
        resultantPoints.push(canvas.height / 2 + resultant)
      }

      // Draw individual waves if enabled
      if (showIndividual) {
        // Wave 1
        ctx.strokeStyle = "rgba(239, 68, 68, 0.7)"
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x++) {
          if (x === 0) {
            ctx.moveTo(x, wave1Points[x])
          } else {
            ctx.lineTo(x, wave1Points[x])
          }
        }
        ctx.stroke()

        // Wave 2
        ctx.strokeStyle = "rgba(59, 130, 246, 0.7)"
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x++) {
          if (x === 0) {
            ctx.moveTo(x, wave2Points[x])
          } else {
            ctx.lineTo(x, wave2Points[x])
          }
        }
        ctx.stroke()
      }

      // Draw resultant wave
      ctx.strokeStyle = "#00bcd4"
      ctx.lineWidth = 3
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x++) {
        if (x === 0) {
          ctx.moveTo(x, resultantPoints[x])
        } else {
          ctx.lineTo(x, resultantPoints[x])
        }
      }
      ctx.stroke()

      // Draw legend
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(10, 10, 200, showIndividual ? 90 : 50)

      ctx.font = "14px sans-serif"
      if (showIndividual) {
        ctx.fillStyle = "#ef4444"
        ctx.fillText("— Wave 1", 20, 30)
        ctx.fillStyle = "#3b82f6"
        ctx.fillText("— Wave 2", 20, 50)
      }
      ctx.fillStyle = "#00bcd4"
      ctx.fillText("— Resultant Wave", 20, showIndividual ? 70 : 30)
    }

    const animate = () => {
      if (isPlaying) {
        setTime((prev) => prev + 1)
      }
      drawInterference()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, amplitude1, amplitude2, frequency1, frequency2, phaseShift, time, showIndividual])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    setHasInteracted(true)
  }

  const handleReset = () => {
    setTime(0)
    setIsPlaying(false)
  }

  const handleParameterChange = () => {
    setHasInteracted(true)
  }

  const getInterferenceType = () => {
    const phaseDiff = Math.abs(phaseShift[0])
    const freqDiff = Math.abs(frequency1[0] - frequency2[0])

    if (freqDiff < 0.005 && phaseDiff < 0.5) {
      return { type: "Constructive", color: "text-green-400", description: "Waves add together" }
    } else if (freqDiff < 0.005 && Math.abs(phaseDiff - Math.PI) < 0.5) {
      return { type: "Destructive", color: "text-red-400", description: "Waves cancel out" }
    } else {
      return { type: "Complex", color: "text-yellow-400", description: "Mixed interference pattern" }
    }
  }

  const interference = getInterferenceType()

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Instructions */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
        <div className="flex items-center mb-3">
          <Waves className="w-6 h-6 text-cyan-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Wave Interference Demonstration</h2>
        </div>
        <p className="text-blue-200">
          Explore how two waves interact when they meet. Adjust the parameters to see constructive and destructive
          interference patterns. The resultant wave shows the combined effect.
        </p>
      </Card>

      {/* Interference Type Indicator */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white font-medium">Current Interference: </span>
            <span className={`font-bold ${interference.color}`}>{interference.type}</span>
          </div>
          <Badge variant="secondary" className="bg-white/10 text-blue-200">
            {interference.description}
          </Badge>
        </div>
      </Card>

      {/* Wave Canvas */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/20 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Interference Visualization</h3>
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowIndividual(!showIndividual)}
              size="sm"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              {showIndividual ? "Hide" : "Show"} Individual Waves
            </Button>
            <Button
              onClick={handlePlay}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="bg-black rounded-lg p-4">
          <canvas
            ref={canvasRef}
            className="w-full h-auto border border-white/20 rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </Card>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Wave 1 Parameters</h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Amplitude 1</label>
                <Badge variant="secondary" className="bg-red-500/20 text-red-200">
                  {amplitude1[0]}px
                </Badge>
              </div>
              <Slider
                value={amplitude1}
                onValueChange={(value) => {
                  setAmplitude1(value)
                  handleParameterChange()
                }}
                max={80}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Frequency 1</label>
                <Badge variant="secondary" className="bg-red-500/20 text-red-200">
                  {frequency1[0].toFixed(3)}
                </Badge>
              </div>
              <Slider
                value={frequency1}
                onValueChange={(value) => {
                  setFrequency1(value)
                  handleParameterChange()
                }}
                max={0.08}
                min={0.01}
                step={0.005}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Wave 2 Parameters</h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Amplitude 2</label>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                  {amplitude2[0]}px
                </Badge>
              </div>
              <Slider
                value={amplitude2}
                onValueChange={(value) => {
                  setAmplitude2(value)
                  handleParameterChange()
                }}
                max={80}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Frequency 2</label>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                  {frequency2[0].toFixed(3)}
                </Badge>
              </div>
              <Slider
                value={frequency2}
                onValueChange={(value) => {
                  setFrequency2(value)
                  handleParameterChange()
                }}
                max={0.08}
                min={0.01}
                step={0.005}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Phase Shift</label>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
                  {(phaseShift[0] / Math.PI).toFixed(2)}π
                </Badge>
              </div>
              <Slider
                value={phaseShift}
                onValueChange={(value) => {
                  setPhaseShift(value)
                  handleParameterChange()
                }}
                max={Math.PI * 2}
                min={0}
                step={Math.PI / 8}
                className="w-full"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Interference Examples */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Examples</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Button
            onClick={() => {
              setAmplitude1([40])
              setAmplitude2([40])
              setFrequency1([0.03])
              setFrequency2([0.03])
              setPhaseShift([0])
              handleParameterChange()
            }}
            variant="outline"
            className="text-white border-green-400/30 hover:bg-green-400/10"
          >
            <div className="text-center">
              <div className="font-medium text-green-400">Constructive</div>
              <div className="text-xs text-green-200">Same phase</div>
            </div>
          </Button>

          <Button
            onClick={() => {
              setAmplitude1([40])
              setAmplitude2([40])
              setFrequency1([0.03])
              setFrequency2([0.03])
              setPhaseShift([Math.PI])
              handleParameterChange()
            }}
            variant="outline"
            className="text-white border-red-400/30 hover:bg-red-400/10"
          >
            <div className="text-center">
              <div className="font-medium text-red-400">Destructive</div>
              <div className="text-xs text-red-200">Opposite phase</div>
            </div>
          </Button>

          <Button
            onClick={() => {
              setAmplitude1([40])
              setAmplitude2([30])
              setFrequency1([0.03])
              setFrequency2([0.04])
              setPhaseShift([Math.PI / 4])
              handleParameterChange()
            }}
            variant="outline"
            className="text-white border-yellow-400/30 hover:bg-yellow-400/10"
          >
            <div className="text-center">
              <div className="font-medium text-yellow-400">Beat Pattern</div>
              <div className="text-xs text-yellow-200">Different frequencies</div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Complete button */}
      {hasInteracted && (
        <div className="text-center">
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            Complete Interference Demo
          </Button>
        </div>
      )}
    </div>
  )
}
