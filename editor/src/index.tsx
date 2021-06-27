import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import videoSrc from "./videos/presentation.mp4"

const Root = (
  <Fragment>
    <div>hoge</div>
    <video src={videoSrc}></video>
  </Fragment>
)

const root = document.createElement("div")
root.id = "root"
document.body.appendChild(root)
ReactDOM.render(Root, root)