"use client"

import { useEffect, useRef } from "react"

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Generate random paths
    const paths: {
      startX: number
      startY: number
      endX: number
      endY: number
      controlX1: number
      controlY1: number
      controlX2: number
      controlY2: number
      color: string
      width: number
      speed: number
      progress: number
    }[] = []

    // Create gradient colors
    const gradients = [
      "rgba(59, 130, 246, 0.5)", // Blue
      "rgba(16, 185, 129, 0.5)", // Green
      "rgba(239, 68, 68, 0.5)", // Red
      "rgba(217, 70, 239, 0.5)", // Purple
      "rgba(245, 158, 11, 0.5)", // Amber
    ]

    // Generate random paths
    for (let i = 0; i < 15; i++) {
      const startX = Math.random() * canvas.width
      const startY = Math.random() * canvas.height
      const endX = Math.random() * canvas.width
      const endY = Math.random() * canvas.height

      // Control points for bezier curve
      const controlX1 = startX + (Math.random() * 200 - 100)
      const controlY1 = startY + (Math.random() * 200 - 100)
      const controlX2 = endX + (Math.random() * 200 - 100)
      const controlY2 = endY + (Math.random() * 200 - 100)

      paths.push({
        startX,
        startY,
        endX,
        endY,
        controlX1,
        controlY1,
        controlX2,
        controlY2,
        color: gradients[Math.floor(Math.random() * gradients.length)],
        width: Math.random() * 3 + 1,
        speed: Math.random() * 0.005 + 0.001,
        progress: Math.random(),
      })
    }

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw paths
      paths.forEach((path) => {
        ctx.strokeStyle = path.color
        ctx.lineWidth = path.width

        // Update progress
        path.progress += path.speed
        if (path.progress > 1) {
          path.progress = 0

          // Randomize new end points when path completes
          path.startX = path.endX
          path.startY = path.endY
          path.endX = Math.random() * canvas.width
          path.endY = Math.random() * canvas.height
          path.controlX1 = path.startX + (Math.random() * 200 - 100)
          path.controlY1 = path.startY + (Math.random() * 200 - 100)
          path.controlX2 = path.endX + (Math.random() * 200 - 100)
          path.controlY2 = path.endY + (Math.random() * 200 - 100)
        }

        // Draw path
        ctx.beginPath()
        ctx.moveTo(path.startX, path.startY)

        // Calculate points along the bezier curve based on progress
        const t = path.progress
        const x =
          Math.pow(1 - t, 3) * path.startX +
          3 * Math.pow(1 - t, 2) * t * path.controlX1 +
          3 * (1 - t) * Math.pow(t, 2) * path.controlX2 +
          Math.pow(t, 3) * path.endX

        const y =
          Math.pow(1 - t, 3) * path.startY +
          3 * Math.pow(1 - t, 2) * t * path.controlY1 +
          3 * (1 - t) * Math.pow(t, 2) * path.controlY2 +
          Math.pow(t, 3) * path.endY

        ctx.bezierCurveTo(path.controlX1, path.controlY1, path.controlX2, path.controlY2, x, y)
        ctx.stroke()

        // Draw car at the end of the path
        ctx.save()
        ctx.translate(x, y)

        // Calculate angle tangent to the curve
        const dx =
          3 * Math.pow(1 - t, 2) * (path.controlX1 - path.startX) +
          6 * (1 - t) * t * (path.controlX2 - path.controlX1) +
          3 * Math.pow(t, 2) * (path.endX - path.controlX2)

        const dy =
          3 * Math.pow(1 - t, 2) * (path.controlY1 - path.startY) +
          6 * (1 - t) * t * (path.controlY2 - path.controlY1) +
          3 * Math.pow(t, 2) * (path.endY - path.controlY2)

        const angle = Math.atan2(dy, dx)
        ctx.rotate(angle)

        // Draw tiny car
        ctx.fillStyle = path.color
        ctx.fillRect(-6, -3, 12, 6)

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 opacity-30" />
}

export default HeroBackground
