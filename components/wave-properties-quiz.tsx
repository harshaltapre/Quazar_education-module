"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react"

interface WavePropertiesQuizProps {
  onComplete: () => void
}

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
  image?: string
}

const questions: Question[] = [
  {
    id: "wave-definition",
    question: "What is a wave?",
    options: [
      "A moving particle",
      "A disturbance that transfers energy without transferring matter",
      "A type of sound",
      "A form of light",
    ],
    correct: 1,
    explanation:
      "A wave is a disturbance that travels through space and time, transferring energy from one place to another without transferring matter.",
  },
  {
    id: "amplitude",
    question: "What does the amplitude of a wave represent?",
    options: [
      "The speed of the wave",
      "The frequency of the wave",
      "The maximum displacement from equilibrium",
      "The wavelength",
    ],
    correct: 2,
    explanation:
      "Amplitude is the maximum displacement of particles from their equilibrium position. It determines the energy and intensity of the wave.",
  },
  {
    id: "wave-equation",
    question: "What is the correct wave equation?",
    options: ["v = f + λ", "v = f × λ", "v = f ÷ λ", "v = f - λ"],
    correct: 1,
    explanation: "The wave equation is v = f × λ, where v is wave speed, f is frequency, and λ is wavelength.",
  },
  {
    id: "frequency-period",
    question: "If a wave has a frequency of 50 Hz, what is its period?",
    options: ["0.02 seconds", "50 seconds", "0.5 seconds", "2 seconds"],
    correct: 0,
    explanation: "Period (T) = 1/frequency (f). So T = 1/50 = 0.02 seconds.",
  },
  {
    id: "transverse-wave",
    question: "In a transverse wave, particles vibrate:",
    options: [
      "Parallel to the wave direction",
      "Perpendicular to the wave direction",
      "In circular motions",
      "They don't vibrate",
    ],
    correct: 1,
    explanation:
      "In transverse waves, particles vibrate perpendicular (at right angles) to the direction of wave propagation. Light waves are examples of transverse waves.",
  },
  {
    id: "constructive-interference",
    question: "Constructive interference occurs when:",
    options: [
      "Two waves cancel each other out",
      "Waves have different frequencies",
      "Two waves add together to create a larger amplitude",
      "Waves travel in opposite directions",
    ],
    correct: 2,
    explanation:
      "Constructive interference happens when two waves meet in phase, causing their amplitudes to add together, creating a wave with larger amplitude.",
  },
  {
    id: "wave-speed-calculation",
    question: "A wave has a wavelength of 2 meters and frequency of 5 Hz. What is its speed?",
    options: ["2.5 m/s", "10 m/s", "7 m/s", "3 m/s"],
    correct: 1,
    explanation: "Using v = f × λ: v = 5 Hz × 2 m = 10 m/s",
  },
  {
    id: "longitudinal-wave",
    question: "Which of these is an example of a longitudinal wave?",
    options: ["Light wave", "Radio wave", "Sound wave", "Water wave"],
    correct: 2,
    explanation:
      "Sound waves are longitudinal waves where particles vibrate parallel to the direction of wave propagation, creating compressions and rarefactions.",
  },
]

export function WavePropertiesQuiz({ onComplete }: WavePropertiesQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      setQuizCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setQuizCompleted(false)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return correct
  }

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBadge = (score: number) => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return { text: "Excellent!", color: "bg-green-500/20 text-green-200" }
    if (percentage >= 60) return { text: "Good Job!", color: "bg-yellow-500/20 text-yellow-200" }
    return { text: "Keep Learning!", color: "bg-red-500/20 text-red-200" }
  }

  if (showResults) {
    const score = calculateScore()
    const badge = getScoreBadge(score)

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>

          <div className="mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}/{questions.length}
            </div>
            <Badge variant="secondary" className={badge.color}>
              {badge.text}
            </Badge>
          </div>

          <p className="text-blue-200 mb-8">
            You scored {Math.round((score / questions.length) * 100)}% on the Wave Properties Quiz
          </p>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              Complete Module
            </Button>
          </div>
        </Card>

        {/* Detailed Results */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Detailed Results</h3>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === question.correct

              return (
                <div key={question.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-white font-medium mb-2">{question.question}</p>
                      <p className={`text-sm mb-1 ${isCorrect ? "text-green-200" : "text-red-200"}`}>
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-200 text-sm mb-2">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-blue-200 text-sm">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Question Progress</span>
          <span className="text-cyan-300">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </Card>

      {/* Question */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? "border-cyan-400 bg-cyan-400/10 text-white"
                  : "border-white/20 bg-white/5 text-blue-200 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswer === index ? "border-cyan-400 bg-cyan-400" : "border-white/40"
                  }`}
                >
                  {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="text-white border-white/20 hover:bg-white/10 disabled:opacity-50 bg-transparent"
        >
          Previous
        </Button>

        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentQuestion
                  ? "bg-cyan-400"
                  : selectedAnswers[index] !== undefined
                    ? "bg-white/60"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === undefined}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
        </Button>
      </div>
    </div>
  )
}
