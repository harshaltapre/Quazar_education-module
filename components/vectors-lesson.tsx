"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { CheckCircle } from "lucide-react"
import { SlideNavigation } from "./slide-navigation"
import { PracticeQuestions } from "./practice-questions"

interface VectorsLessonProps {
  onBack: () => void
}

export function VectorsLesson({ onBack }: VectorsLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [magnitude, setMagnitude] = useState([4])
  const [angle, setAngle] = useState([45])
  const [carASpeed, setCarASpeed] = useState([60])
  const [carBSpeed, setCarBSpeed] = useState([35])
  const [interactionSubmitted, setInteractionSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const vectorCanvasRef = useRef<HTMLCanvasElement>(null)
  const operationsCanvasRef = useRef<HTMLCanvasElement>(null)

  const practiceQuestions = [
    {
      id: 1,
      type: "multiple-choice" as const,
      question: "A vector has magnitude 10 units and points 60° above the horizontal. What is its y-component?",
      options: ["5 units", "8.66 units", "10 units", "6.93 units"],
      correctAnswer: 1,
      explanation: "The y-component is calculated as: magnitude × sin(angle) = 10 × sin(60°) = 10 × 0.866 = 8.66 units",
    },
    {
      id: 2,
      type: "fill-blank" as const,
      question:
        "Two forces act on an object: 15 N to the right and 8 N to the left. The net force is _____ N to the right.",
      correctAnswer: "7",
      explanation: "Net force = 15 N - 8 N = 7 N to the right (taking right as positive direction)",
    },
    {
      id: 3,
      type: "multiple-choice" as const,
      question: "Which of the following is NOT a vector quantity?",
      options: ["Velocity", "Displacement", "Speed", "Acceleration"],
      correctAnswer: 2,
      explanation:
        "Speed is a scalar quantity because it only has magnitude. Velocity, displacement, and acceleration are vectors because they have both magnitude and direction.",
    },
    {
      id: 4,
      type: "multiple-choice" as const,
      question: "A displacement vector has components (6, 8). What is its magnitude?",
      options: ["14 units", "10 units", "48 units", "100 units"],
      correctAnswer: 1,
      explanation: "Magnitude = √(x² + y²) = √(6² + 8²) = √(36 + 64) = √100 = 10 units",
    },
  ]

  const slides = [
    {
      title: "Visual Representation",
      leftContent: (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Visual Representation</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              Vectors are typically represented as <span className="text-yellow-400 font-semibold">arrows</span> where:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  The <span className="text-green-400 font-semibold">length of the arrow</span> is proportional to the
                  vector's <span className="text-green-400 font-semibold">magnitude</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  The <span className="text-purple-400 font-semibold">orientation of the arrow</span> indicates the
                  vector's direction
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  The <span className="text-blue-400 font-semibold">tail of the arrow</span> represents the{" "}
                  <span className="text-blue-400 font-semibold">starting point</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  The <span className="text-cyan-400 font-semibold">head (tip) of the arrow</span> represents the{" "}
                  <span className="text-cyan-400 font-semibold">ending point</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h3 className="text-blue-400 font-semibold mb-4">Vector Visualization</h3>
            <div className="space-y-4">
              <div>
                <label className="text-white font-medium mb-2 block">Magnitude: {magnitude[0]} units</label>
                <Slider value={magnitude} onValueChange={setMagnitude} max={8} min={1} step={0.5} className="mb-3" />
              </div>
              <div>
                <label className="text-white font-medium mb-2 block">Angle: {angle[0]}°</label>
                <Slider value={angle} onValueChange={setAngle} max={360} min={0} step={5} className="mb-3" />
              </div>

              <div className="pt-4">
                {!interactionSubmitted ? (
                  <Button
                    onClick={() => {
                      setInteractionSubmitted(true)
                      setShowFeedback(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  >
                    Submit Vector Configuration
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-semibold">Great work!</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      You've created a vector with magnitude {magnitude[0]} units at {angle[0]}° angle. Notice how
                      changing these values affects the arrow's length and direction.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      rightContent: (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Vector Notation</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">Vectors can be represented in several ways in written form:</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-mono text-white mb-2">
                  →<br />v
                </div>
                <div className="text-sm text-blue-400 font-semibold">Arrow Notation</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-mono text-white mb-2 font-bold">v</div>
                <div className="text-sm text-blue-400 font-semibold">Bold Notation</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-lg font-mono text-white mb-2">v = (vₓ, vᵧ)</div>
                <div className="text-sm text-blue-400 font-semibold">Component Notation</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-3">Direction in One Dimension</h3>
            <p className="text-sm text-slate-300 mb-3">
              In one dimension (like motion along a straight line), direction is represented using:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-green-400 font-semibold">Positive (+)</span> and{" "}
                <span className="text-red-400 font-semibold">negative (-)</span> signs
              </li>
              <li className="flex items-center gap-3">
                Words like <span className="text-green-400 font-semibold">right/left</span> or{" "}
                <span className="text-green-400 font-semibold">east/west</span>
              </li>
              <li className="flex items-center gap-3">
                Convention: right/east is usually positive, left/west is negative
              </li>
            </ul>
            <div className="flex items-center justify-between mt-4 bg-slate-800 rounded p-2">
              <span className="text-red-400 font-semibold">← Negative</span>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="text-green-400 font-semibold">Positive →</span>
            </div>
          </div>

          <div className="flex justify-center">
            <canvas
              ref={vectorCanvasRef}
              width={300}
              height={200}
              className="bg-slate-900 rounded border border-slate-600"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Vector Operations",
      leftContent: (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Vector Addition</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              When adding vectors, we combine both their{" "}
              <span className="text-green-400 font-semibold">magnitudes</span> and{" "}
              <span className="text-purple-400 font-semibold">directions</span>.
            </p>

            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-500/30">
              <h3 className="text-green-400 font-semibold mb-3">Head-to-Tail Method</h3>
              <ol className="space-y-2 text-sm">
                <li>1. Place the tail of the second vector at the head of the first</li>
                <li>2. Draw a line from the tail of the first to the head of the second</li>
                <li>3. This line represents the resultant vector</li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
              <h3 className="text-purple-400 font-semibold mb-3">Component Method</h3>
              <div className="space-y-2 text-sm">
                <div>For vectors A and B:</div>
                <div className="font-mono bg-slate-800 p-2 rounded">
                  Rₓ = Aₓ + Bₓ
                  <br />
                  Rᵧ = Aᵧ + Bᵧ
                </div>
                <div>Where R is the resultant vector</div>
              </div>
            </div>
          </div>
        </div>
      ),
      rightContent: (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Vector Operations in 1D</h2>
          <div className="space-y-4 text-slate-300">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-sm mb-4">
                <span className="text-blue-400 font-semibold">Car A</span> moves East at {carASpeed[0]} km/hr.{" "}
                <span className="text-purple-400 font-semibold">Car B</span> moves East at {carBSpeed[0]} km/hr.
                <br />
                What is Car A's velocity relative to Car B?
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-blue-400 font-medium mb-2 block">Car A Speed: {carASpeed[0]} km/hr</label>
                  <Slider value={carASpeed} onValueChange={setCarASpeed} max={100} min={10} step={5} className="mb-3" />
                </div>
                <div>
                  <label className="text-purple-400 font-medium mb-2 block">Car B Speed: {carBSpeed[0]} km/hr</label>
                  <Slider value={carBSpeed} onValueChange={setCarBSpeed} max={100} min={10} step={5} className="mb-3" />
                </div>
              </div>

              <div className="bg-slate-800 rounded p-3 mt-4">
                <div className="text-yellow-400 font-semibold mb-2">Solution:</div>
                <div className="text-sm">
                  Relative velocity = {carASpeed[0]} - {carBSpeed[0]} = {carASpeed[0] - carBSpeed[0]} km/hr
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {carASpeed[0] - carBSpeed[0] > 0
                    ? `Car A is moving ${carASpeed[0] - carBSpeed[0]} km/hr faster than Car B`
                    : carASpeed[0] - carBSpeed[0] < 0
                      ? `Car A is moving ${Math.abs(carASpeed[0] - carBSpeed[0])} km/hr slower than Car B`
                      : "Both cars are moving at the same speed"}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <canvas
                ref={operationsCanvasRef}
                width={350}
                height={120}
                className="bg-slate-900 rounded border border-slate-600"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Practice Questions",
      leftContent: <PracticeQuestions questions={practiceQuestions} onComplete={onBack} />,
      rightContent: null,
    },
  ]

  useEffect(() => {
    // Vector Visualization Animation
    const vectorCanvas = vectorCanvasRef.current
    if (vectorCanvas && currentSlide === 0) {
      const ctx = vectorCanvas.getContext("2d")
      if (ctx) {
        const animate = () => {
          ctx.clearRect(0, 0, vectorCanvas.width, vectorCanvas.height)

          // Draw grid
          ctx.strokeStyle = "#374151"
          ctx.lineWidth = 1
          for (let i = 0; i <= vectorCanvas.width; i += 20) {
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, vectorCanvas.height)
            ctx.stroke()
          }
          for (let i = 0; i <= vectorCanvas.height; i += 20) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(vectorCanvas.width, i)
            ctx.stroke()
          }

          // Draw axes
          ctx.strokeStyle = "#6b7280"
          ctx.lineWidth = 2
          // X-axis
          ctx.beginPath()
          ctx.moveTo(0, vectorCanvas.height / 2)
          ctx.lineTo(vectorCanvas.width, vectorCanvas.height / 2)
          ctx.stroke()
          // Y-axis
          ctx.beginPath()
          ctx.moveTo(vectorCanvas.width / 2, 0)
          ctx.lineTo(vectorCanvas.width / 2, vectorCanvas.height)
          ctx.stroke()

          // Draw vector
          const centerX = vectorCanvas.width / 2
          const centerY = vectorCanvas.height / 2
          const scale = 15
          const radians = (angle[0] * Math.PI) / 180
          const endX = centerX + magnitude[0] * scale * Math.cos(radians)
          const endY = centerY - magnitude[0] * scale * Math.sin(radians)

          // Vector line
          ctx.strokeStyle = "#ec4899"
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(endX, endY)
          ctx.stroke()

          // Arrowhead
          const arrowLength = 10
          const arrowAngle = Math.PI / 6
          ctx.beginPath()
          ctx.moveTo(endX, endY)
          ctx.lineTo(
            endX - arrowLength * Math.cos(radians - arrowAngle),
            endY + arrowLength * Math.sin(radians - arrowAngle),
          )
          ctx.moveTo(endX, endY)
          ctx.lineTo(
            endX - arrowLength * Math.cos(radians + arrowAngle),
            endY + arrowLength * Math.sin(radians + arrowAngle),
          )
          ctx.stroke()

          // Draw origin point
          ctx.fillStyle = "#10b981"
          ctx.beginPath()
          ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI)
          ctx.fill()

          // Draw end point
          ctx.fillStyle = "#ec4899"
          ctx.beginPath()
          ctx.arc(endX, endY, 4, 0, 2 * Math.PI)
          ctx.fill()

          requestAnimationFrame(animate)
        }
        animate()
      }
    }

    // Car Operations Animation
    const operationsCanvas = operationsCanvasRef.current
    if (operationsCanvas && currentSlide === 1) {
      const ctx = operationsCanvas.getContext("2d")
      if (ctx) {
        let carAPos = 50
        let carBPos = 50

        const animate = () => {
          ctx.clearRect(0, 0, operationsCanvas.width, operationsCanvas.height)

          // Draw road
          ctx.strokeStyle = "#374151"
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(0, operationsCanvas.height / 2)
          ctx.lineTo(operationsCanvas.width, operationsCanvas.height / 2)
          ctx.stroke()

          // Draw cars
          // Car A (blue)
          ctx.fillStyle = "#3b82f6"
          ctx.fillRect(carAPos, operationsCanvas.height / 2 - 15, 30, 15)
          ctx.fillStyle = "#1e40af"
          ctx.fillRect(carAPos + 5, operationsCanvas.height / 2 - 25, 20, 10)

          // Car B (purple)
          ctx.fillStyle = "#a855f7"
          ctx.fillRect(carBPos, operationsCanvas.height / 2 + 5, 30, 15)
          ctx.fillStyle = "#7c3aed"
          ctx.fillRect(carBPos + 5, operationsCanvas.height / 2 + 20, 20, 10)

          // Update positions
          carAPos += carASpeed[0] / 20
          carBPos += carBSpeed[0] / 20

          if (carAPos > operationsCanvas.width) carAPos = -30
          if (carBPos > operationsCanvas.width) carBPos = -30

          requestAnimationFrame(animate)
        }
        animate()
      }
    }
  }, [magnitude, angle, carASpeed, carBSpeed, currentSlide])

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setInteractionSubmitted(false)
      setShowFeedback(false)
    }
  }

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setInteractionSubmitted(false)
      setShowFeedback(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {currentSlide === slides.length - 1 ? (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">{slides[currentSlide].leftContent}</div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onBack={onBack}
        slideTitle={slides[currentSlide].title}
        showSubmit={currentSlide === slides.length - 1}
        isLastContentSlide={currentSlide === slides.length - 2}
      />
    </div>
  )
}
