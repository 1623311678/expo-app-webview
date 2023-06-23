import React, { FC, useEffect } from "react"
import { createRoot } from "react-dom/client"
import store from "./store"
import { Provider } from "react-redux"
import PDF from "@src/components/PDF.jsx"
// Core viewer
// import { Viewer } from "@react-pdf-viewer/core"

// // Plugins
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

// // Import styles
// import "@react-pdf-viewer/core/lib/styles/index.css"
// import "@react-pdf-viewer/default-layout/lib/styles/index.css"
// import { pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
