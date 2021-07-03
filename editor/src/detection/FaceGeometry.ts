import { AnnotatedPrediction } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh"
import { BufferAttribute, BufferGeometry, Float32BufferAttribute } from "three"
import { TRIANGLES, } from "./TRIANGLE"
import { UVs } from "./UV"

// Number of keypoints
// https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection#keypoints
const NUM_POINTS = 468

export class FaceGeometry extends BufferGeometry {

  positions = new Float32Array(NUM_POINTS * 3)
  uvs = new Float32Array(NUM_POINTS * 2)

  frameWidth: number = 0
  frameHeight: number = 0

  constructor() {
    super()
    const posAttr = new BufferAttribute(this.positions, 3)
    posAttr.needsUpdate = true
    this.setAttribute("position", posAttr)
    // this.setIndex(TRIANGLES) // Map position to vertices of triangles
    this.setIndex(this.filterEyes(TRIANGLES))
    this.setUpUvs()
  }

  filterEyes(triangleArray: number[]) {
    const eyePoints = [
      33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7, // right eye
      362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382, // left eye
    ]
    const triangles = [] as number[][]
    for (let i = 0; i < triangleArray.length / 3; i++) {
      triangles.push([triangleArray[3 * i], triangleArray[3 * i + 1], triangleArray[3 * i + 2]])
    }
    const filtered = triangles.filter((points) => {
      return points.find((p) => eyePoints.includes(p)) === undefined
    })
    const result = [] as number[]
    filtered.forEach(points => {
      points.forEach(p => result.push(p))
    })
    return result
  }

  /**
   * Sets up UV data.
   */
  private setUpUvs() {
    UVs.forEach((_, i) => {
      this.uvs[2 * i] = 1 - UVs[i][0]
      this.uvs[2 * i + 1] = UVs[i][1]
    })
    const uvAttr = new BufferAttribute(this.uvs, 2)
    this.setAttribute("uv", uvAttr)
    uvAttr.needsUpdate = true
  }

  /**
   * Sets video frame size
   */
  setFrameSize(w: number, h: number) {
    this.frameWidth = w
    this.frameHeight = h
  }

  update(prediction: AnnotatedPrediction) {
    const mesh = (prediction as any).scaledMesh as number[][]
    mesh.forEach((point, i) => {
      this.positions[3 * i] = point[0] - this.frameWidth / 2
      this.positions[3 * i + 1] = -point[1] + this.frameHeight / 2
      this.positions[3 * i + 2] = point[2]
    })
    this.setAttribute("position", new Float32BufferAttribute(this.positions, 3))
    this.getAttribute("position").needsUpdate = true
    this.setAttribute("uv", new Float32BufferAttribute(this.uvs, 2))
    this.getAttribute("uv").needsUpdate = true
    this.computeVertexNormals()
  }
}