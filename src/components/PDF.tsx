import React from "react"
// import { Icon, Spin, Tooltip,Input } from 'antd';
import "./PDF.less"

import { Document, Page, pdfjs } from "react-pdf"
import { SpinLoading, Input } from "antd-mobile"

pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
//https://juejin.cn/post/6888964708214013959
class File extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      pageNumber: 1,
      pageNumberInput: 1,
      pageNumberFocus: false,
      numPages: 1,
      pageWidth: 600,
      fullscreen: false
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages: numPages })
  }

  lastPage = () => {
    if (this.state.pageNumber == 1) {
      return
    }
    const page = this.state.pageNumber - 1
    this.setState({ pageNumber: page, pageNumberInput: page })
  }
  nextPage = () => {
    if (this.state.pageNumber == this.state.numPages) {
      return
    }
    const page = this.state.pageNumber + 1
    this.setState({ pageNumber: page, pageNumberInput: page })
  }
  onPageNumberFocus = e => {
    this.setState({ pageNumberFocus: true })
  }
  onPageNumberBlur = e => {
    this.setState({
      pageNumberFocus: false,
      pageNumberInput: this.state.pageNumber
    })
  }
  onPageNumberChange = e => {
    let value = e.target.value
    value = value <= 0 ? 1 : value
    value = value >= this.state.numPages ? this.state.numPages : value
    this.setState({ pageNumberInput: value })
  }
  toPage = e => {
    this.setState({ pageNumber: Number(e.target.value) })
  }

  pageZoomOut = () => {
    if (this.state.pageWidth <= 600) {
      return
    }
    const pageWidth = this.state.pageWidth * 0.8
    this.setState({ pageWidth: pageWidth })
  }
  pageZoomIn = () => {
    const pageWidth = this.state.pageWidth * 1.2
    this.setState({ pageWidth: pageWidth })
  }

  pageFullscreen = () => {
    if (this.state.fullscreen) {
      this.setState({ fullscreen: false, pageWidth: 600 })
    } else {
      this.setState({ fullscreen: true, pageWidth: window.screen.width - 40 })
    }
  }

  render() {
    const {
      pageNumber,
      pageNumberFocus,
      pageNumberInput,
      numPages,
      pageWidth,
      fullscreen
    } = this.state
    return (
      <div>
        <div className={"view"}>
          <div className={"pageContainer"}>
            <Document
              file={
                this.props.previewurl ||
                "https://pdf.dfcfw.com/pdf/H3_AP202304201585601855_1.pdf?1681977223000.pdf"
              }
              onLoadSuccess={this.onDocumentLoadSuccess}
              loading={<SpinLoading color="primary" />}>
              <Page pageNumber={pageNumber} width={pageWidth} />
            </Document>
          </div>
        </div>
        <div className={"pageTool"}>
          <div onClick={this.lastPage}>
            {pageNumber == 1 ? "已是第一页" : "上一页"}
          </div>
          <div style={{ color: "white" }}>
            <span>{pageNumberFocus ? pageNumberInput : pageNumber}</span>
            <span>{`/${numPages}`}</span>
          </div>
          <div onClick={this.nextPage}>
            {pageNumber == numPages ? "已是最后一页" : "下一页"}
          </div>
          <div onClick={this.pageZoomIn}>放大</div>
          <div onClick={this.pageZoomOut}>缩小</div>
          <div onClick={this.pageFullscreen}>
            {fullscreen ? "退出" : "全屏"}
          </div>
          <div
            onClick={() => {
              const pWin: any = window
              if (pWin.postMessage2) {
                pWin.postMessage2("Web-TO-RN")
              }
            }}>
            发消息
          </div>
        </div>
      </div>
    )
  }
}

export default props => <File {...props} />
