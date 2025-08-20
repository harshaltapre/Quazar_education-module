"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"

interface ConceptExplorerProps {
  onComplete: () => void
}

const concepts = [
  {
    id: "what-are-waves",
    title: "What are Waves?",
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mb-4">
            <div className="text-white text-lg font-medium">🌊 Wave Animation</div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-white leading-relaxed">
            A <strong className="text-cyan-300">wave</strong> is a disturbance that travels through space and time,
            transferring energy without transferring matter.
          </p>

          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-cyan-300 font-semibold mb-2">Key Points:</h4>
            <ul className="text-white space-y-2">
              <li>• Waves carry energy from one place to another</li>
              <li>• The medium particles don't travel with the wave</li>
              <li>• Examples: sound waves, light waves, water waves</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "wave-properties",
    title: "Wave Properties",
    content: (
      <div className="space-y-6">
        <WavePropertiesVisualization />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-green-300 font-semibold mb-2">Amplitude (A)</h4>
            <p className="text-white text-sm">
              Maximum displacement from equilibrium position. Determines the energy and intensity of the wave.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-yellow-300 font-semibold mb-2">Wavelength (λ)</h4>
            <p className="text-white text-sm">
              Distance between two consecutive crests or troughs. Measured in meters.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-purple-300 font-semibold mb-2">Frequency (f)</h4>
            <p className="text-white text-sm">
              Number of complete waves passing a point per second. Measured in Hertz (Hz).
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-red-300 font-semibold mb-2">Period (T)</h4>
            <p className="text-white text-sm">Time taken for one complete wave cycle. T = 1/f seconds.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "wave-equation",
    title: "Wave Equation",
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 mb-6">
            <div className="text-white text-3xl font-bold mb-2">v = f × λ</div>
            <div className="text-purple-100">Wave Speed = Frequency × Wavelength</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-cyan-300 font-semibold mb-2">Where:</h4>
            <ul className="text-white space-y-1">
              <li>
                <strong>v</strong> = wave speed (m/s)
              </li>
              <li>
                <strong>f</strong> = frequency (Hz)
              </li>
              <li>
                <strong>λ</strong> = wavelength (m)
              </li>
            </ul>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-yellow-300 font-semibold mb-2">Example:</h4>
            <p className="text-white">
              A sound wave has a frequency of 440 Hz and wavelength of 0.77 m.
              <br />
              Speed = 440 × 0.77 = 339 m/s
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "types-of-waves",
    title: "Types of Waves",
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30 p-6">
            <h4 className="text-blue-300 font-bold text-lg mb-3">Transverse Waves</h4>
            <div className="space-y-3">
              <div className="w-full h-16 bg-blue-400/20 rounded flex items-center justify-center">
                <span className="text-blue-200">⟂ Perpendicular Motion</span>
              </div>
              <p className="text-white text-sm">Particles vibrate perpendicular to wave direction</p>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                Examples: Light, Radio waves
              </Badge>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30 p-6">
            <h4 className="text-green-300 font-bold text-lg mb-3">Longitudinal Waves</h4>
            <div className="space-y-3">
              <div className="w-full h-16 bg-green-400/20 rounded flex items-center justify-center">
                <span className="text-green-200">↔ Parallel Motion</span>
              </div>
              <p className="text-white text-sm">Particles vibrate parallel to wave direction</p>
              <Badge variant="secondary" className="bg-green-500/20 text-green-200">
                Examples: Sound, Seismic P-waves
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    ),
  },
]

function WavePropertiesVisualization() {
  return (
    <div className="bg-black/30 rounded-lg p-6">
      <svg viewBox="0 0 400 150" className="w-full h-32">
        {/* Wave path */}
        <path d="M 20 75 Q 70 25 120 75 T 220 75 T 320 75 T 380 75" stroke="#00bcd4" strokeWidth="3" fill="none" />

        {/* Amplitude markers */}
        <line x1="20" y1="25" x2="20" y2="125" stroke="#4ade80" strokeWidth="1" strokeDasharray="2,2" />
        <text x="25" y="20" fill="#4ade80" fontSize="12">
          A
        </text>

        {/* Wavelength marker */}
        <line x1="70" y1="140" x2="170" y2="140" stroke="#fbbf24" strokeWidth="2" />
        <text x="115" y="135" fill="#fbbf24" fontSize="12" textAnchor="middle">
          λ
        </text>

        {/* Equilibrium line */}
        <line x1="20" y1="75" x2="380" y2="75" stroke="#6b7280" strokeWidth="1" strokeDasharray="5,5" />
      </svg>
    </div>
  )
}

export function ConceptExplorer({ onComplete }: ConceptExplorerProps) {
  const [currentConcept, setCurrentConcept] = useState(0)
  const [viewedConcepts, setViewedConcepts] = useState<Set<number>>(new Set([0]))

  const handleNext = () => {
    if (currentConcept < concepts.length - 1) {
      const nextIndex = currentConcept + 1
      setCurrentConcept(nextIndex)
      setViewedConcepts((prev) => new Set([...prev, nextIndex]))
    }
  }

  const handlePrevious = () => {
    if (currentConcept > 0) {
      setCurrentConcept(currentConcept - 1)
    }
  }

  const handleComplete = () => {
    if (viewedConcepts.size === concepts.length) {
      onComplete()
    }
  }

  const concept = concepts[currentConcept]
  const isLastConcept = currentConcept === concepts.length - 1
  const hasViewedAll = viewedConcepts.size === concepts.length

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Concept Progress</span>
          <span className="text-cyan-300">
            {currentConcept + 1} / {concepts.length}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentConcept + 1) / concepts.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Concept navigation */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {concepts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentConcept(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentConcept
                  ? "bg-cyan-400 scale-125"
                  : viewedConcepts.has(index)
                    ? "bg-white/60"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">{concept.title}</h2>
          </div>

          {concept.content}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentConcept === 0}
          variant="outline"
          className="text-white border-white/20 hover:bg-white/10 disabled:opacity-50 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex space-x-4">
          {!isLastConcept ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!hasViewedAll}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
            >
              Complete Module
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
