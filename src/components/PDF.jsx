import React from "react"
// import { Icon, Spin, Tooltip,Input } from 'antd';
import styles from "./PDF.less"

import { Document, Page, pdfjs } from "react-pdf"
import { SpinLoading, Input } from "antd-mobile"
// import { AntOutline } from "antd-mobile-icons"
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
//https://juejin.cn/post/6888964708214013959
class File extends React.Component {
  state = {
    pageNumber: 1,
    pageNumberInput: 1,
    pageNumberFocus: false,
    numPages: 1,
    pageWidth: 600,
    fullscreen: false
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
      <div className={styles.view}>
        <div className={styles.pageContainer}>
          <Document
            file="https://pdf.dfcfw.com/pdf/H3_AP202304201585601855_1.pdf?1681977223000.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
            loading={<SpinLoading color="primary" />}>
            <Page pageNumber={pageNumber} width={pageWidth} />
          </Document>
        </div>
       <div style={{margin:20,cursor:'pointer'}}>
       <div
          className={styles.pageTool}
          style={{ fontSize: 14, display: "flex",flex:1 }}>
          <div onClick={this.lastPage}>
            {pageNumber == 1 ? "已是第一页" : "上一页"}
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <Input
                value={pageNumberFocus ? pageNumberInput : pageNumber}
                onFocus={this.onPageNumberFocus}
                onBlur={this.onPageNumberBlur}
                onChange={this.onPageNumberChange}
                onPressEnter={this.toPage}
                style={{ width: 30,textAlign:'center' }}
                type="number"
              />
            </div>
            <div> <Input value={`/${numPages}`} style={{ width: 30,textAlign:'center' }}></Input></div>
          </div>

          <div onClick={this.nextPage} style={{width:150}}>
            {pageNumber == numPages ? "已是最后一页" : "下一页"}
          </div>
        </div>
        <div style={{display:'flex',fontSize:14}}>
        <div onClick={this.pageZoomIn} style={{width:100}}>放大</div>
          <div onClick={this.pageZoomOut} style={{width:100}}>缩小</div>
          <div onClick={this.pageFullscreen} style={{width:100}}>
            {fullscreen ? "退出" : "全屏"}
          </div>
        </div>
       </div>

      </div>
    )
  }
}

export default props => <File {...props} />
