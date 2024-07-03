import { useEffect } from 'react'
import {
  calulateCentroid,
  drawCentroid,
  drawPolygon,
  generateRandomPoints,
  sortPointsClockwise,
} from '../utils/calc'

const CanvasComponent = () => {
  const numPoints = Math.floor(Math.random() * 10 + 3)
  const points = generateRandomPoints(numPoints)
  const sortedPoints = sortPointsClockwise(points)
  const centroid = calulateCentroid(sortedPoints)

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (ctx) {
      drawPolygon(ctx, sortedPoints)
      drawCentroid(ctx, centroid)
    }
  }, [sortedPoints, centroid])

  return <canvas id="canvas" width={500} height={500} />
}

export default CanvasComponent
