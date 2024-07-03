/**
 * Represents a point in a two-dimensional coordinate system.
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Generates an array of random points within a specified range.
 *
 * @param numPoints - The number of random points to generate.
 * @returns An array of randomly generated points.
 */
export const generateRandomPoints = (numPoints: number): Point[] => {
  const points: Point[] = []
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * 400 + 50,
      y: Math.random() * 400 + 50,
    })
  }
  return points
}

/**
 * Sorts an array of points in clockwise order around their centroid.
 *
 * @param points - The array of points to be sorted.
 * @returns The sorted array of points in clockwise order.
 */
export const sortPointsClockwise = (points: Point[]): Point[] => {
  const centroid = calulateCentroid(points)
  return points.sort((a, b) => {
    const angleA = Math.atan2(a.y - centroid.y, a.x - centroid.x)
    const angleB = Math.atan2(b.y - centroid.y, b.x - centroid.x)
    return angleA - angleB
  })
}

/**
 * Calculates the centroid of a polygon defined by an array of points.
 * @param points - An array of points representing the polygon.
 * @returns The centroid point of the polygon.
 */
export const calulateCentroid = (points: Point[]): Point => {
  let signedArea = 0
  let centroidX = 0
  let centroidY = 0
  const n = points.length

  for (let i = 0; i < n; i++) {
    const x0 = points[i].x
    const y0 = points[i].y
    const x1 = points[(i + 1) % n].x
    const y1 = points[(i + 1) % n].y

    const a = x0 * y1 - x1 * y0
    signedArea += a
    centroidX += (x0 + x1) * a
    centroidY += (y0 + y1) * a
  }

  signedArea *= 0.5
  centroidX /= 6.0 * signedArea
  centroidY /= 6.0 * signedArea

  return { x: centroidX, y: centroidY } as Point
}

/**
 * Draws a polygon on the canvas using the provided points.
 *
 * @param ctx - The canvas rendering context.
 * @param points - An array of points representing the vertices of the polygon.
 */
export const drawPolygon = (ctx: CanvasRenderingContext2D, points: Point[]): void => {
  if (points.length < 3) return;

  ctx.beginPath()
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.closePath()
  ctx.stroke()
}

/**
 * Draws a centroid on a canvas.
 * @param ctx - The canvas rendering context.
 * @param centroid - The coordinates of the centroid.
 */
export const drawCentroid = (ctx: CanvasRenderingContext2D, centroid: Point) => {
  ctx.beginPath()
  ctx.arc(centroid.x, centroid.y, 5, 0, 2 * Math.PI)
  ctx.fillStyle = 'red'
  ctx.fill()
}
