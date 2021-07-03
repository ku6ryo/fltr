import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import "sanitize.css"

const Root = (
  <Fragment>
    <App/>
  </Fragment>
)

const root = document.createElement("div")
root.id = "root"
document.body.appendChild(root)
ReactDOM.render(Root, root)