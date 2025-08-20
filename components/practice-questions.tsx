"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"

interface Question {
  id: number
  type?: "multiple-choice" | "fill-blank"
  question: string
  options?: string[]
  correctAnswer: number | string
  explanation: string
  topic?: string
}

interface PracticeQuestionsProps {
  topic?: string
  questions?: Question[] // Added optional questions prop
  onBack?: () => void
  onComplete?: () => void // Added optional onComplete prop
}

export function PracticeQuestions({ topic, questions: propQuestions, onBack, onComplete }: PracticeQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | string }>({}) // Updated to handle string answers
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [fillBlankAnswers, setFillBlankAnswers] = useState<{ [key: number]: string }>({}) // Added state for fill-in-blank answers

  const questionSets: { [key: string]: Question[] } = {
    kinematics: [
      {
        id: 1,
        question: "What is the SI unit of velocity?",
        options: ["m/s", "m/s²", "km/h", "m"],
        correctAnswer: 0,
        explanation: "Velocity is measured in meters per second (m/s) in the SI system.",
        topic: "kinematics",
      },
      {
        id: 2,
        question: "If a car travels 100m in 10s, what is its average speed?",
        options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
        correctAnswer: 1,
        explanation: "Average speed = distance/time = 100m/10s = 10 m/s",
        topic: "kinematics",
      },
      {
        id: 3,
        question: "Which equation relates velocity, acceleration, and time?",
        options: ["s = ut + ½at²", "v = u + at", "v² = u² + 2as", "a = (v-u)/t"],
        correctAnswer: 1,
        explanation:
          "The first equation of motion is v = u + at, where v is final velocity, u is initial velocity, a is acceleration, and t is time.",
        topic: "kinematics",
      },
    ],
    waves: [
      {
        id: 1,
        question: "What is the relationship between wave speed, frequency, and wavelength?",
        options: ["v = f/λ", "v = f × λ", "v = λ/f", "v = f + λ"],
        correctAnswer: 1,
        explanation: "Wave speed (v) equals frequency (f) times wavelength (λ): v = f × λ",
        topic: "waves",
      },
      {
        id: 2,
        question: "In which type of wave do particles vibrate perpendicular to the direction of wave motion?",
        options: ["Longitudinal", "Transverse", "Surface", "Standing"],
        correctAnswer: 1,
        explanation: "In transverse waves, particles vibrate perpendicular to the direction of wave propagation.",
        topic: "waves",
      },
      {
        id: 3,
        question: "What determines the loudness of a sound wave?",
        options: ["Frequency", "Wavelength", "Amplitude", "Speed"],
        correctAnswer: 2,
        explanation: "The amplitude of a sound wave determines its loudness - larger amplitude means louder sound.",
        topic: "waves",
      },
    ],
    optics: [
      {
        id: 1,
        question: "What is the angle of reflection when the angle of incidence is 30°?",
        options: ["15°", "30°", "45°", "60°"],
        correctAnswer: 1,
        explanation: "According to the law of reflection, the angle of incidence equals the angle of reflection.",
        topic: "optics",
      },
      {
        id: 2,
        question: "Which type of lens converges light rays?",
        options: ["Concave", "Convex", "Plane", "Cylindrical"],
        correctAnswer: 1,
        explanation: "Convex lenses are thicker in the middle and converge (focus) light rays to a point.",
        topic: "optics",
      },
      {
        id: 3,
        question: "What happens to light when it passes from air into water?",
        options: ["It speeds up", "It slows down", "Speed remains same", "It stops"],
        correctAnswer: 1,
        explanation: "Light slows down when it enters a denser medium like water, causing refraction.",
        topic: "optics",
      },
    ],
    fluids: [
      {
        id: 1,
        question: "According to Archimedes' principle, the buoyant force equals:",
        options: ["Weight of object", "Weight of displaced fluid", "Density of fluid", "Volume of object"],
        correctAnswer: 1,
        explanation: "Archimedes' principle states that buoyant force equals the weight of the displaced fluid.",
        topic: "fluids",
      },
      {
        id: 2,
        question: "What happens to pressure in a fluid as depth increases?",
        options: ["Decreases", "Increases", "Remains constant", "Becomes zero"],
        correctAnswer: 1,
        explanation: "Pressure in a fluid increases with depth due to the weight of the fluid above.",
        topic: "fluids",
      },
      {
        id: 3,
        question: "An object will float in a fluid if:",
        options: [
          "Its density > fluid density",
          "Its density < fluid density",
          "Its density = fluid density",
          "Volume is large",
        ],
        correctAnswer: 1,
        explanation: "An object floats when its density is less than the density of the fluid.",
        topic: "fluids",
      },
    ],
    "atomic-structure": [
      {
        id: 1,
        question: "Who proposed the planetary model of the atom?",
        options: ["Dalton", "Thomson", "Rutherford", "Bohr"],
        correctAnswer: 3,
        explanation:
          "Niels Bohr proposed the planetary model where electrons orbit the nucleus in fixed energy levels.",
        topic: "atomic-structure",
      },
      {
        id: 2,
        question: "What is the maximum number of electrons in the first shell?",
        options: ["2", "8", "18", "32"],
        correctAnswer: 0,
        explanation: "The first electron shell (K shell) can hold a maximum of 2 electrons.",
        topic: "atomic-structure",
      },
      {
        id: 3,
        question: "The nucleus of an atom contains:",
        options: ["Only protons", "Only neutrons", "Protons and neutrons", "Protons and electrons"],
        correctAnswer: 2,
        explanation: "The nucleus contains both protons (positive charge) and neutrons (no charge).",
        topic: "atomic-structure",
      },
    ],
  }

  const questions = propQuestions || questionSets[topic || ""] || []

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    })
  }

  const handleFillBlankChange = (value: string) => {
    setFillBlankAnswers({
      ...fillBlankAnswers,
      [currentQuestion]: value,
    })
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: value,
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
    setQuizCompleted(true)
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setFillBlankAnswers({}) // Reset fill-blank answers
    setShowResults(false)
    setQuizCompleted(false)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index]
      if (question.type === "fill-blank") {
        if (typeof userAnswer === "string" && typeof question.correctAnswer === "string") {
          if (userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
            correct++
          }
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correct++
        }
      }
    })
    return correct
  }

  const currentQ = questions[currentQuestion]
  const score = calculateScore()
  const percentage = Math.round((score / questions.length) * 100)

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700 p-8">
          <div className="text-center">
            <h2 className="text-white text-xl mb-4">Practice questions for {topic} coming soon!</h2>
            <Button onClick={onBack || onComplete}>Back to Lesson</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-semibold">Practice Questions</h2>
        <Button variant="outline" onClick={onBack || onComplete}>
          Back to Lesson
        </Button>
      </div>

      {!quizCompleted ? (
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <div className="text-slate-400 text-sm">
                Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-white text-xl mb-6">{currentQ.question}</h3>

              {currentQ.type === "fill-blank" ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={fillBlankAnswers[currentQuestion] || ""}
                    onChange={(e) => handleFillBlankChange(e.target.value)}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                    placeholder="Enter your answer..."
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {currentQ.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                      className="w-full text-left justify-start h-auto p-4"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous Question
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length !== questions.length}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={selectedAnswers[currentQuestion] === undefined}>
                  Next Question
                </Button>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Results Summary */}
          <Card className="bg-slate-800 border-slate-700">
            <div className="p-6 text-center">
              <h3 className="text-white text-2xl font-semibold mb-4">Quiz Complete!</h3>
              <div className="text-4xl font-bold mb-2">
                <span
                  className={
                    percentage >= 70 ? "text-green-400" : percentage >= 50 ? "text-yellow-400" : "text-red-400"
                  }
                >
                  {percentage}%
                </span>
              </div>
              <p className="text-slate-400 mb-4">
                You got {score} out of {questions.length} questions correct
              </p>
              <Button onClick={handleReset} className="mr-3">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={onBack || onComplete}>
                Back to Lesson
              </Button>
            </div>
          </Card>

          {/* Detailed Results */}
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              let isCorrect = false

              if (question.type === "fill-blank") {
                isCorrect =
                  typeof userAnswer === "string" &&
                  typeof question.correctAnswer === "string" &&
                  userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
              } else {
                isCorrect = userAnswer === question.correctAnswer
              }

              return (
                <Card key={question.id} className="bg-slate-800 border-slate-700">
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-2">
                          Question {index + 1}: {question.question}
                        </h4>

                        {question.type === "fill-blank" ? (
                          <div className="space-y-2 mb-4">
                            <div className="p-2 rounded text-sm bg-green-900/30 text-green-400 border border-green-500/30">
                              <span className="font-semibold">Correct Answer: </span>
                              {question.correctAnswer}
                            </div>
                            {!isCorrect && (
                              <div className="p-2 rounded text-sm bg-red-900/30 text-red-400 border border-red-500/30">
                                <span className="font-semibold">Your Answer: </span>
                                {userAnswer || "No answer"}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2 mb-4">
                            {question.options?.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded text-sm ${
                                  optionIndex === question.correctAnswer
                                    ? "bg-green-900/30 text-green-400 border border-green-500/30"
                                    : optionIndex === userAnswer && !isCorrect
                                      ? "bg-red-900/30 text-red-400 border border-red-500/30"
                                      : "bg-slate-700 text-slate-300"
                                }`}
                              >
                                <span className="font-semibold mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                                {option}
                                {optionIndex === question.correctAnswer && (
                                  <span className="ml-2 text-green-400">✓ Correct</span>
                                )}
                                {optionIndex === userAnswer && !isCorrect && (
                                  <span className="ml-2 text-red-400">✗ Your answer</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="bg-slate-700 rounded p-3">
                          <p className="text-slate-300 text-sm">
                            <span className="text-blue-400 font-semibold">Explanation: </span>
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
