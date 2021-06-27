import { ShaderMaterial } from "./materials/ShaderMaterial"
import { callEngine } from "sndbxr-wasm-api/assembly/interface"
import { Encoder, Sizer } from "@wapc/as-msgpack"
import { FACE_APPLY_SHADER_MATERIAL } from "./function_ids"

/**
 * Face object.
 */
export class Face {
  id: i32
  constructor(id: i32) {
    this.id = id
  }

  applyShaderMaterial(mat: ShaderMaterial) {
    const sizer = new Sizer()
    sizer.writeInt32(this.id)
    sizer.writeInt32(mat.id)
    const buf = new ArrayBuffer(sizer.length)
    const encoder = new Encoder(buf)
    encoder.writeInt32(this.id)
    encoder.writeInt32(mat.id)
    callEngine(FACE_APPLY_SHADER_MATERIAL, buf)
  }
}