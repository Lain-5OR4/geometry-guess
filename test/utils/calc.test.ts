import {
  calulateCentroid,
  generateRandomPoints,
  sortPointsClockwise,
  type Point,
} from '@/utils/calc'
import { describe, expect, it } from 'vitest'

describe('generateRandomPoints', () => {
  it('should generate the specified number of random points', () => {
    const numPoints = 5
    const points = generateRandomPoints(numPoints)
    expect(points.length).toBe(numPoints)
  })

  it('should generate points within the specified range', () => {
    const numPoints = 5
    const points = generateRandomPoints(numPoints)
    for (const point of points) {
      expect(point.x).toBeGreaterThanOrEqual(50)
      expect(point.x).toBeLessThanOrEqual(450)
      expect(point.y).toBeGreaterThanOrEqual(50)
      expect(point.y).toBeLessThanOrEqual(450)
    }
  })
})

describe('sortPointsClockwise', () => {
  it('should sort points in clockwise order', () => {
    const points: Point[] = [
      { x: 100, y: 100 },
      { x: 200, y: 200 },
      { x: 300, y: 100 },
    ]
    const sortedPoints = sortPointsClockwise(points)
    expect(sortedPoints).toEqual([
      { x: 200, y: 200 },
      { x: 300, y: 100 },
      { x: 100, y: 100 },
    ])
  })
})

describe('calulateCentroid', () => {
  it('should calculate the centroid of the points', () => {
    const points: Point[] = [
      { x: 100, y: 100 },
      { x: 200, y: 200 },
      { x: 300, y: 100 },
    ]
    const centroid = calulateCentroid(points)
    expect(centroid).toEqual({ x: 200, y: 133.33333333333334 })
  })
})

// Add more test cases as needed
