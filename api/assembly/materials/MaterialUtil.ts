import { callEngine } from "sndbxr-wasm-api/assembly/interface"
import { ShaderMaterial } from "./ShaderMaterial"
import { Encoder, Decoder, Sizer } from "@wapc/as-msgpack"
import { CREATE_SHADER_MATERIAL } from "../function_ids"

const CREATE_MATERIAL_FAIL_ID = -1

export class MaterialUtil {
  /**
   * Creates a material with a shader.
   * @param vertexFile File path to vertext shader file to use.
   * @param fragmentFile File path to fragment shader file to use.
   * @returns 
   */
  static createShaderMaterial (
    vertexFile: string,
    fragmentFile: string
  ): ShaderMaterial {
    const sizer = new Sizer()
    sizer.writeString(vertexFile)
    sizer.writeString(fragmentFile)
    const buf = new ArrayBuffer(sizer.length)
    const encoder = new Encoder(buf)
    encoder.writeString(vertexFile)
    encoder.writeString(fragmentFile)
    const res = callEngine(CREATE_SHADER_MATERIAL, buf)
    const decoder = new Decoder(res)
    const id = decoder.readInt32()
    if (id === CREATE_MATERIAL_FAIL_ID) {
      throw new Error("Failed to create shader material")
    }
    return new ShaderMaterial(id, vertexFile, fragmentFile)
  }

  static createTextureMaterial(
    textureFile: string
  ): StandardMaterial {
  }
}