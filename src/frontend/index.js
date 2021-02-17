import Excel from "./excel"

let sheet

window.onload = function () {
  const fileUploader = document.getElementById('file-uploader')
  fileUploader.addEventListener('change', handleUpload, false)

  const fileDownloader = document.getElementById('file-downloader')
  fileDownloader.addEventListener('click', saveAsFile, false)
}

const handleUpload = function (e) {
  const fileReader = new FileReader()
  fileReader.readAsText
  // 因為直接用ileReader.readAsText(file)讀檔會有例外發生，
  // 所以要轉成arraybuffer進來
  // 因此excel.js也要改讀arraybuffer
  fileReader.readAsArrayBuffer(e.target.files[0])
  fileReader.onload = function (e) {
    const data = this.result
    sheet = new Excel({ data })
    let sheetData = sheet.getWorkSheetAllData()
    sheetData = sheet.filterCarId(sheetData)
    sheet.save(sheetData)
  }
}

const saveAsFile = function () {
  sheet.exportFile()
}