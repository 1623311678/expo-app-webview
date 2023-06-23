import React, { FC, useEffect } from "react"
import { createRoot } from "react-dom/client"
import store from "./store"
import { Provider } from "react-redux"
import PDF from "@src/components/PDF"

const App: FC = () => {
  return (
    <div>
      <PDF></PDF>
    </div>
  )
}
const rootDom = document.getElementById("root-preview-pdf")
const root = createRoot(rootDom)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
