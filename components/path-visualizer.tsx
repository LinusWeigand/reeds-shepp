"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Car, RefreshCw } from "lucide-react"

// Simplified representation of the Reeds-Shepp path planning
// This is a visual demo only - actual computation would use your Rust library
const PathVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [startPose, setStartPose] = useState({ x: 100, y: 200, theta: 0 })
  const [endPose, setEndPose] = useState({ x: 300, y: 150, theta: 90 })
  const [pathProgress, setPathProgress] = useState(100)
  const [isDragging, setIsDragging] = useState<string | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 300 })

  // Resize canvas to fit container
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const container = canvas.parentElement
      if (!container) return

      const { width } = container.getBoundingClientRect()
      const height = Math.min(300, width * 0.6) // Maintain aspect ratio with max height of 300px

      setCanvasSize({ width, height })
      canvas.width = width
      canvas.height = height

      // Update positions proportionally if needed
      if (startPose.x > width || startPose.y > height) {
        setStartPose((prev) => ({
          ...prev,
          x: Math.min(prev.x, width - 30),
          y: Math.min(prev.y, height - 30),
        }))
      }

      if (endPose.x > width || endPose.y > height) {
        setEndPose((prev) => ({
          ...prev,
          x: Math.min(prev.x, width - 30),
          y: Math.min(prev.y, height - 30),
        }))
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [startPose.x, startPose.y, endPose.x, endPose.y])

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    const gridSize = 20
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw path (simplified curved path)
    const progress = pathProgress / 100

    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()

    // Create a simple curved path between start and end
    const controlPoint1 = {
      x: startPose.x + (endPose.x - startPose.x) * 0.3,
      y: startPose.y - 50,
    }

    const controlPoint2 = {
      x: startPose.x + (endPose.x - startPose.x) * 0.7,
      y: endPose.y + 50,
    }

    // Draw path with bezier curve
    ctx.beginPath()
    ctx.moveTo(startPose.x, startPose.y)
    ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, endPose.x, endPose.y)
    ctx.stroke()

    // Draw car at current position along the path
    if (progress < 1) {
      const t = progress
      const x =
        Math.pow(1 - t, 3) * startPose.x +
        3 * Math.pow(1 - t, 2) * t * controlPoint1.x +
        3 * (1 - t) * Math.pow(t, 2) * controlPoint2.x +
        Math.pow(t, 3) * endPose.x

      const y =
        Math.pow(1 - t, 3) * startPose.y +
        3 * Math.pow(1 - t, 2) * t * controlPoint1.y +
        3 * (1 - t) * Math.pow(t, 2) * controlPoint2.y +
        Math.pow(t, 3) * endPose.y

      // Calculate angle tangent to the curve
      const dx =
        3 * Math.pow(1 - t, 2) * (controlPoint1.x - startPose.x) +
        6 * (1 - t) * t * (controlPoint2.x - controlPoint1.x) +
        3 * Math.pow(t, 2) * (endPose.x - controlPoint2.x)

      const dy =
        3 * Math.pow(1 - t, 2) * (controlPoint1.y - startPose.y) +
        6 * (1 - t) * t * (controlPoint2.y - controlPoint1.y) +
        3 * Math.pow(t, 2) * (endPose.y - controlPoint2.y)

      const angle = Math.atan2(dy, dx)

      drawCar(ctx, x, y, angle, "rgba(59, 130, 246, 0.8)")
    }

    // Draw start and end poses
    drawPose(ctx, startPose.x, startPose.y, (startPose.theta * Math.PI) / 180, "rgba(16, 185, 129, 0.8)")
    drawPose(ctx, endPose.x, endPose.y, (endPose.theta * Math.PI) / 180, "rgba(239, 68, 68, 0.8)")
  }, [startPose, endPose, pathProgress, canvasSize])

  // Handle mouse events for dragging
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isPointInCar = (x: number, y: number, carX: number, carY: number) => {
      // Simplified hit detection - check if point is within 30px of car center
      return Math.hypot(x - carX, y - carY) < 30
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      console.log("Mouse down at:", x, y)
      console.log("Start car at:", startPose.x, startPose.y)
      console.log("End car at:", endPose.x, endPose.y)

      // Check if clicking near start or end pose
      if (isPointInCar(x, y, startPose.x, startPose.y)) {
        console.log("Dragging start car")
        setIsDragging("start")
      } else if (isPointInCar(x, y, endPose.x, endPose.y)) {
        console.log("Dragging end car")
        setIsDragging("end")
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const rect = canvas.getBoundingClientRect()
      const x = Math.max(30, Math.min(canvas.width - 30, e.clientX - rect.left))
      const y = Math.max(30, Math.min(canvas.height - 30, e.clientY - rect.top))

      if (isDragging === "start") {
        setStartPose((prev) => ({ ...prev, x, y }))
      } else if (isDragging === "end") {
        setEndPose((prev) => ({ ...prev, x, y }))
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        console.log("Stopped dragging")
      }
      setIsDragging(null)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return

      const rect = canvas.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const y = e.touches[0].clientY - rect.top

      // Check if touching near start or end pose
      if (isPointInCar(x, y, startPose.x, startPose.y)) {
        setIsDragging("start")
        e.preventDefault() // Prevent scrolling
      } else if (isPointInCar(x, y, endPose.x, endPose.y)) {
        setIsDragging("end")
        e.preventDefault() // Prevent scrolling
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return

      const rect = canvas.getBoundingClientRect()
      const x = Math.max(30, Math.min(canvas.width - 30, e.touches[0].clientX - rect.left))
      const y = Math.max(30, Math.min(canvas.height - 30, e.touches[0].clientY - rect.top))

      if (isDragging === "start") {
        setStartPose((prev) => ({ ...prev, x, y }))
      } else if (isDragging === "end") {
        setEndPose((prev) => ({ ...prev, x, y }))
      }

      e.preventDefault() // Prevent scrolling
    }

    const handleTouchEnd = () => {
      setIsDragging(null)
    }

    // Remove any existing event listeners before adding new ones
    canvas.removeEventListener("mousedown", handleMouseDown)
    window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("mouseup", handleMouseUp)
    canvas.removeEventListener("touchstart", handleTouchStart as EventListener)
    window.removeEventListener("touchmove", handleTouchMove as EventListener)
    window.removeEventListener("touchend", handleTouchEnd)

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("touchstart", handleTouchStart as EventListener)
    window.addEventListener("touchmove", handleTouchMove as EventListener, { passive: false })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("touchstart", handleTouchStart as EventListener)
      window.removeEventListener("touchmove", handleTouchMove as EventListener)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [startPose, endPose, isDragging])

  // Helper function to draw a pose (position + orientation)
  const drawPose = (ctx: CanvasRenderingContext2D, x: number, y: number, theta: number, color: string) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(theta)

    // Car body (rectangle with rounded corners and transparency)
    ctx.fillStyle = color
    const carWidth = 40
    const carHeight = 20
    const cornerRadius = 5

    // Draw rounded rectangle for car body
    ctx.beginPath()
    ctx.moveTo(-carWidth / 2 + cornerRadius, -carHeight / 2)
    ctx.lineTo(carWidth / 2 - cornerRadius, -carHeight / 2)
    ctx.arcTo(carWidth / 2, -carHeight / 2, carWidth / 2, -carHeight / 2 + cornerRadius, cornerRadius)
    ctx.lineTo(carWidth / 2, carHeight / 2 - cornerRadius)
    ctx.arcTo(carWidth / 2, carHeight / 2, carWidth / 2 - cornerRadius, carHeight / 2, cornerRadius)
    ctx.lineTo(-carWidth / 2 + cornerRadius, carHeight / 2)
    ctx.arcTo(-carWidth / 2, carHeight / 2, -carWidth / 2, carHeight / 2 - cornerRadius, cornerRadius)
    ctx.lineTo(-carWidth / 2, -carHeight / 2 + cornerRadius)
    ctx.arcTo(-carWidth / 2, -carHeight / 2, -carWidth / 2 + cornerRadius, -carHeight / 2, cornerRadius)
    ctx.closePath()
    ctx.fill()

    // Wheels (black rectangles with transparency)
    ctx.fillStyle = "rgba(31, 41, 55, 0.8)"
    ctx.fillRect(-15, -12, 8, 4) // front-left wheel
    ctx.fillRect(-15, 8, 8, 4) // front-right wheel
    ctx.fillRect(7, -12, 8, 4) // back-left wheel
    ctx.fillRect(7, 8, 8, 4) // back-right wheel

    // Single triangle headlight beam
    ctx.fillStyle = "rgba(255, 255, 200, 0.4)"
    ctx.beginPath()
    ctx.moveTo(carWidth / 2, 0)
    ctx.lineTo(carWidth / 2 + 30, -15)
    ctx.lineTo(carWidth / 2 + 30, 15)
    ctx.closePath()
    ctx.fill()

    // Headlight (single point)
    ctx.fillStyle = "rgba(255, 255, 0, 0.9)"
    ctx.beginPath()
    ctx.arc(carWidth / 2, 0, 3, 0, 2 * Math.PI)
    ctx.fill()

    // Add a subtle glow effect around the car
    const gradient = ctx.createRadialGradient(0, 0, carWidth / 2, 0, 0, carWidth)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)")
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, carWidth, 0, 2 * Math.PI)
    ctx.fill()

    ctx.restore()
  }

  // Helper function to draw a car
  const drawCar = (ctx: CanvasRenderingContext2D, x: number, y: number, theta: number, color: string) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(theta)

    // Car body with rounded corners
    ctx.fillStyle = color
    const carWidth = 30
    const carHeight = 14
    const cornerRadius = 4

    // Draw rounded rectangle
    ctx.beginPath()
    ctx.moveTo(-carWidth / 2 + cornerRadius, -carHeight / 2)
    ctx.lineTo(carWidth / 2 - cornerRadius, -carHeight / 2)
    ctx.arcTo(carWidth / 2, -carHeight / 2, carWidth / 2, -carHeight / 2 + cornerRadius, cornerRadius)
    ctx.lineTo(carWidth / 2, carHeight / 2 - cornerRadius)
    ctx.arcTo(carWidth / 2, carHeight / 2, carWidth / 2 - cornerRadius, carHeight / 2, cornerRadius)
    ctx.lineTo(-carWidth / 2 + cornerRadius, carHeight / 2)
    ctx.arcTo(-carWidth / 2, carHeight / 2, -carWidth / 2, carHeight / 2 - cornerRadius, cornerRadius)
    ctx.lineTo(-carWidth / 2, -carHeight / 2 + cornerRadius)
    ctx.arcTo(-carWidth / 2, -carHeight / 2, -carWidth / 2 + cornerRadius, -carHeight / 2, cornerRadius)
    ctx.closePath()
    ctx.fill()

    // Wheels
    ctx.fillStyle = "rgba(31, 41, 55, 0.8)"
    ctx.fillRect(-12, -9, 6, 4)
    ctx.fillRect(-12, 5, 6, 4)
    ctx.fillRect(6, -9, 6, 4)
    ctx.fillRect(6, 5, 6, 4)

    // Headlight beam
    ctx.fillStyle = "rgba(255, 255, 200, 0.3)"
    ctx.beginPath()
    ctx.moveTo(carWidth / 2, 0)
    ctx.lineTo(carWidth / 2 + 20, -10)
    ctx.lineTo(carWidth / 2 + 20, 10)
    ctx.closePath()
    ctx.fill()

    // Headlight
    ctx.fillStyle = "rgba(255, 255, 0, 0.9)"
    ctx.beginPath()
    ctx.arc(carWidth / 2 - 2, 0, 2, 0, 2 * Math.PI)
    ctx.fill()

    ctx.restore()
  }

  const resetDemo = () => {
    // Adjust positions based on current canvas size
    const centerX = canvasSize.width / 2
    const centerY = canvasSize.height / 2

    setStartPose({
      x: centerX - 100,
      y: centerY + 50,
      theta: 0,
    })

    setEndPose({
      x: centerX + 100,
      y: centerY - 50,
      theta: 90,
    })

    setPathProgress(100)
  }

  const animatePath = () => {
    setPathProgress(0)
    const interval = setInterval(() => {
      setPathProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative border rounded-md overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="w-full h-full cursor-move"
        />
        <div className="absolute top-2 left-2 bg-white/80 p-2 rounded text-xs">
          <p className="font-bold mb-1">Interactive Demo:</p>
          <ul className="list-disc pl-4">
            <li>Drag the green (start) and red (end) cars to reposition</li>
            <li>Use sliders below to adjust orientation</li>
            <li>Click "Animate Path" to see the path in action</li>
          </ul>
        </div>
        {isDragging && (
          <div className="absolute bottom-2 right-2 bg-white/80 p-2 rounded text-xs">Dragging {isDragging} car...</div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Start Angle</label>
            <Slider
              value={[startPose.theta]}
              min={0}
              max={359}
              step={1}
              onValueChange={(value) => setStartPose((prev) => ({ ...prev, theta: value[0] }))}
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">End Angle</label>
            <Slider
              value={[endPose.theta]}
              min={0}
              max={359}
              step={1}
              onValueChange={(value) => setEndPose((prev) => ({ ...prev, theta: value[0] }))}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={animatePath} className="flex-1">
            <Car className="mr-2 h-4 w-4" />
            Animate Path
          </Button>
          <Button variant="outline" onClick={resetDemo}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PathVisualizer
