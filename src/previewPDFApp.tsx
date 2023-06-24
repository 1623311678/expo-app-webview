import React, { FC, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import store from "./store"
import { Provider } from "react-redux"
import PDF from "@src/components/PDF"

const App: FC = () => {
  const [previewurl, setPreviewUrl] = useState(null)
  useEffect(() => {
    const handleEvent = (event: any) => {
      const url = event.data
      setPreviewUrl(event.data)
      alert(`RN-TO_WEB:${url}`)
      // alert(`RN-TO-Web:${JSON.stringify(event)}`)
    }
    document.addEventListener("message", handleEvent)
    return () => {
      document.removeEventListener("message", handleEvent)
    }
  }, [])
  return (
    <div>
      <PDF previewurl={previewurl}></PDF>
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
