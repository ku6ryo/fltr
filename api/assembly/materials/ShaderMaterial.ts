import { Material } from "sndbxr-wasm-api/assembly/Material"

export class ShaderMaterial extends Material {
  vertexFile: string
  fragmentFile: string

  constructor(id: i32, vertFile: string, fragFile: string) {
    super(id)
    this.vertexFile = vertFile
    this.fragmentFile = fragFile
  }
}