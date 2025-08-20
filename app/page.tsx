"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Sun } from "lucide-react"
import { KinematicsLesson } from "@/components/kinematics-lesson"
import { AtomicStructureLesson } from "@/components/atomic-structure-lesson"
import { WavesLesson } from "@/components/waves-lesson"
import { OpticsLesson } from "@/components/optics-lesson"
import { FluidsLesson } from "@/components/fluids-lesson"
import { PracticeQuestions } from "@/components/practice-questions"
import { VectorsLesson } from "@/components/vectors-lesson"

const physicsTopics = [
  {
    id: "atomic-structure",
    title: "Atomic Structure",
    description:
      "Atomic Structure: Rutherford & Bohr Models, Electron Distribution, Atomic Number & Mass Number, Isotopes",
  },
  {
    id: "waves",
    title: "Waves",
    description: "Waves: Types of Waves, Wave Properties, Frequency & Wavelength, Sound Waves, Light Waves",
  },
  {
    id: "optics",
    title: "Optics",
    description: "Optics: Laws of Reflection & Refraction, Mirrors & Lenses, Ray Diagrams, Real vs Virtual Images",
  },
  {
    id: "kinematics",
    title: "Kinematics",
    description:
      "Kinematics: Scalars and Vectors in One Dimension, Displacement, Velocity, and Acceleration, Motion Graphs",
  },
  {
    id: "vectors",
    title: "Scalars vs. Vectors",
    description:
      "Vector Representation, Vector Notation, Direction in One Dimension, Vector Operations, Relative Motion",
  },
  {
    id: "fluids",
    title: "Fluids",
    description: "Fluids: Pressure, Buoyancy, Archimedes Principle, Pascal's Law, Bernoulli's Principle",
  },
]

export default function QuazarPlatform() {
  const [currentView, setCurrentView] = useState<"dashboard" | "lesson" | "practice">("dashboard")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId)
    setCurrentView("lesson")
  }

  const handlePracticeClick = (topicId: string) => {
    setSelectedTopic(topicId)
    setCurrentView("practice")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedTopic(null)
  }

  if (currentView === "lesson") {
    switch (selectedTopic) {
      case "kinematics":
        return <KinematicsLesson onBack={handleBackToDashboard} />
      case "atomic-structure":
        return <AtomicStructureLesson onBack={handleBackToDashboard} />
      case "waves":
        return <WavesLesson onBack={handleBackToDashboard} />
      case "optics":
        return <OpticsLesson onBack={handleBackToDashboard} />
      case "fluids":
        return <FluidsLesson onBack={handleBackToDashboard} />
      case "vectors":
        return <VectorsLesson onBack={handleBackToDashboard} />
      default:
        return <KinematicsLesson onBack={handleBackToDashboard} />
    }
  }

  if (currentView === "practice") {
    return <PracticeQuestions topic={selectedTopic!} onBack={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl font-semibold">Quazar</div>
          <div className="flex items-center gap-4">
            <span className="text-white">Harshal Tapre</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              <Sun className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" className="text-white hover:bg-slate-800 p-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Classes
          </Button>
          <span className="text-white text-xl font-semibold">Physics I (Demo)</span>
          <div className="ml-auto">
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">PHYSIX</span>
          </div>
        </div>

        {/* Course Description */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <div className="p-6">
            <h2 className="text-white text-lg font-medium mb-2">Interactive Physics Concepts</h2>
            <p className="text-slate-400 text-sm">
              Explore fundamental physics concepts through interactive simulations and animations
            </p>
          </div>
        </Card>

        {/* Class Lessons */}
        <div className="mb-6">
          <h2 className="text-white text-2xl font-semibold mb-6">Class Lessons</h2>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicsTopics.map((topic) => (
            <Card
              key={topic.id}
              className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-200 cursor-pointer group"
              onClick={() => handleTopicClick(topic.id)}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-white text-xl font-semibold group-hover:text-blue-400 transition-colors">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{topic.description}</p>
                <div className="flex gap-3">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTopicClick(topic.id)
                    }}
                  >
                    View Content
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePracticeClick(topic.id)
                    }}
                  >
                    Practice Questions
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
