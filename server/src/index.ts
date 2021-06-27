import fs from "fs"
import path from "path"
import { Packer } from "./Packer"

;(async () => {
  const packer = new Packer()
  await packer.compileScripts()
  const p = await packer.pack()
  fs.writeFileSync(path.join(__dirname, "../dist/test.zip"), p)
})()