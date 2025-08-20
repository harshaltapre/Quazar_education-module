"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface SlideNavigationProps {
  currentSlide: number
  totalSlides: number
  onPrevious: () => void
  onNext: () => void
  onBack?: () => void
  slideTitle: string
  showSubmit?: boolean
  isLastContentSlide?: boolean
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onBack,
  slideTitle,
  showSubmit = false,
  isLastContentSlide = false,
}: SlideNavigationProps) {
  return (
    <>
      {/* Close Button - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-slate-800 bg-slate-900/80 backdrop-blur-sm"
          onClick={onBack}
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Progress Indicator - Top Center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-slate-300 text-sm font-medium">{slideTitle}</span>
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "bg-blue-500 shadow-lg shadow-blue-500/50 scale-125"
                    : i < currentSlide
                      ? "bg-green-500"
                      : "bg-slate-600"
                }`}
              />
            ))}
          </div>
          <span className="text-slate-400 text-xs font-mono">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>

      {/* Left Arrow - Middle Left */}
      {currentSlide > 0 && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40">
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:bg-slate-800 bg-slate-900/80 backdrop-blur-sm rounded-full w-12 h-12 p-0"
            onClick={onPrevious}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        </div>
      )}

      {/* Right Arrow - Middle Right */}
      {currentSlide < totalSlides - 1 && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40">
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:bg-slate-800 bg-slate-900/80 backdrop-blur-sm rounded-full w-12 h-12 p-0"
            onClick={onNext}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      )}
    </>
  )
}
