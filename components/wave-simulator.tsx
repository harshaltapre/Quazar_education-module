"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw } from "lucide-react"

interface WaveSimulatorProps {
  onComplete: () => void
}

export function WaveSimulator({ onComplete }: WaveSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const [isPlaying, setIsPlaying] = useState(false)
  const [amplitude, setAmplitude] = useState([50])
  const [frequency, setFrequency] = useState([0.02])
  const [speed, setSpeed] = useState([2])
  const [waveType, setWaveType] = useState<"sine" | "cosine" | "square">("sine")
  const [time, setTime] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 300

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal grid lines
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

      // Draw wave
      ctx.strokeStyle = "#00bcd4"
      ctx.lineWidth = 3
      ctx.beginPath()

      for (let x = 0; x < canvas.width; x++) {
        let y
        const phase = frequency[0] * x - speed[0] * time

        switch (waveType) {
          case "sine":
            y = canvas.height / 2 + amplitude[0] * Math.sin(phase)
            break
          case "cosine":
            y = canvas.height / 2 + amplitude[0] * Math.cos(phase)
            break
          case "square":
            y = canvas.height / 2 + amplitude[0] * Math.sign(Math.sin(phase))
            break
        }

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()

      // Draw amplitude markers
      ctx.strokeStyle = "#4ade80"
      ctx.lineWidth = 2
      ctx.setLineDash([3, 3])

      // Max amplitude line
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2 - amplitude[0])
      ctx.lineTo(canvas.width, canvas.height / 2 - amplitude[0])
      ctx.stroke()

      // Min amplitude line
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2 + amplitude[0])
      ctx.lineTo(canvas.width, canvas.height / 2 + amplitude[0])
      ctx.stroke()

      ctx.setLineDash([])

      // Draw labels
      ctx.fillStyle = "#4ade80"
      ctx.font = "14px sans-serif"
      ctx.fillText(`+A (${amplitude[0]}px)`, 10, canvas.height / 2 - amplitude[0] - 10)
      ctx.fillText(`-A (-${amplitude[0]}px)`, 10, canvas.height / 2 + amplitude[0] + 25)
    }

    const animate = () => {
      if (isPlaying) {
        setTime((prev) => prev + 0.1)
      }
      drawWave()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, amplitude, frequency, speed, waveType, time])

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

  const calculateWavelength = () => {
    return (2 * Math.PI) / frequency[0]
  }

  const calculatePeriod = () => {
    return (2 * Math.PI) / (frequency[0] * speed[0])
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Instructions */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
        <h2 className="text-xl font-bold text-white mb-3">Interactive Wave Simulator</h2>
        <p className="text-blue-200">
          Adjust the controls below to see how different parameters affect wave properties. Watch how amplitude,
          frequency, and speed change the wave's appearance and behavior.
        </p>
      </Card>

      {/* Wave Canvas */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/20 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Wave Visualization</h3>
          <div className="flex space-x-2">
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
            style={{ maxHeight: "300px" }}
          />
        </div>
      </Card>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Wave Parameters</h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Amplitude</label>
                <Badge variant="secondary" className="bg-green-500/20 text-green-200">
                  {amplitude[0]}px
                </Badge>
              </div>
              <Slider
                value={amplitude}
                onValueChange={(value) => {
                  setAmplitude(value)
                  handleParameterChange()
                }}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-blue-200 mt-1">Controls wave height</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Frequency</label>
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200">
                  {frequency[0].toFixed(3)}
                </Badge>
              </div>
              <Slider
                value={frequency}
                onValueChange={(value) => {
                  setFrequency(value)
                  handleParameterChange()
                }}
                max={0.1}
                min={0.005}
                step={0.005}
                className="w-full"
              />
              <p className="text-xs text-blue-200 mt-1">Controls wave compression</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Speed</label>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
                  {speed[0]}
                </Badge>
              </div>
              <Slider
                value={speed}
                onValueChange={(value) => {
                  setSpeed(value)
                  handleParameterChange()
                }}
                max={5}
                min={0.5}
                step={0.5}
                className="w-full"
              />
              <p className="text-xs text-blue-200 mt-1">Controls wave movement speed</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Wave Type & Properties</h3>

          <div className="space-y-6">
            <div>
              <label className="text-white font-medium mb-3 block">Wave Type</label>
              <div className="flex space-x-2">
                {(["sine", "cosine", "square"] as const).map((type) => (
                  <Button
                    key={type}
                    onClick={() => {
                      setWaveType(type)
                      handleParameterChange()
                    }}
                    variant={waveType === type ? "default" : "outline"}
                    size="sm"
                    className={
                      waveType === type
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                        : "text-white border-white/20 hover:bg-white/10"
                    }
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex justify-between">
                  <span className="text-blue-200">Wavelength (λ)</span>
                  <span className="text-white font-mono">{calculateWavelength().toFixed(1)}px</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex justify-between">
                  <span className="text-blue-200">Period (T)</span>
                  <span className="text-white font-mono">{calculatePeriod().toFixed(2)}s</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex justify-between">
                  <span className="text-blue-200">Wave Speed (v)</span>
                  <span className="text-white font-mono">
                    {(frequency[0] * calculateWavelength() * speed[0]).toFixed(1)} px/s
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Complete button */}
      {hasInteracted && (
        <div className="text-center">
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            Complete Wave Simulator
          </Button>
        </div>
      )}
    </div>
  )
}
