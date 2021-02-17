import XLSX from 'xlsx'


const Excel = function (opts) {
  this.data = opts?.data
  this.col = opts?.col || ['項次', '車牌號碼', '姓名', '開張單數', '欠繳費用']
  this.destDir = `./storage`
  this.ext = `.csv`
  this.worksheet = ''
  this.range = ''
  this.number = [8, 9]
  this.exportData = ''
  _init.call(this)
}

const _init = function () {
  const workbook = XLSX.read(this.data, { type: 'array' }) // excel的所有資料
  const sheetName = workbook.SheetNames[0] // 取得第一張工作表名稱
  this.worksheet = workbook.Sheets[sheetName] // 第一張工作表的資料
  this.range = XLSX.utils.decode_range(this.worksheet['!ref']) // 整張表有值的範圍 { s: { c: 0, r: 0 }, e: { c: 6, r: 3543 } }
}

Excel.prototype.getWorkSheetAllData = function () {
  const range = this.range
  const worksheet = this.worksheet
  let sheetData = []

  for (let r = range.s.r + 4; r < range.e.r/*range.e.r*/; r++) {
    let cellData = {}
    for (let c = range.s.c; c < 5; c++) {
      let cellId = XLSX.utils.encode_cell({ c, r }, { c, r }) // 取得欄位編號，ex A5
      const value = worksheet[cellId]?.v // 取得欄位得值，可能會是undefined  ex AJP-0322
      cellData[this.col[c]] = value
    }
    sheetData.push(cellData)
    // break // 這邊註解拿掉後，就會只取得一筆完整的
  }
  return sheetData
}

Excel.prototype.filterCarId = function (sheetData) {
  let result = sheetData.filter(row => {
    try {
      // 資料正確的
      const carId = row['車牌號碼']
      // console.log(`carId = `, carId);
      let sub = carId.split('-')
      // 因為會有9M-7051這種車牌，但對我來說這個是7不是9
      return (sub[0].length !== 2 && this.number.includes(+sub[0][0])) || (sub[1].length !== 2 && this.number.includes(+sub[1][0]))
    } catch (e) {
      // 錯誤的資料不理他
      // // 資料錯誤的，回傳回去人工顯示
      // row.status = 'error'
      // return true
    }
  })
  // result = XLSX.utils.json_to_sheet(result)
  // this.exportData = XLSX.utils.sheet_to_csv(fdata)
  return result
}

Excel.prototype.save = function (data) {
  this.exportData = data
}

Excel.prototype.exportFile = function () {
  let result = XLSX.utils.json_to_sheet(this.exportData)
  const wb = XLSX.utils.book_new()
  wb.SheetNames.push(`123456`)
  wb.Sheets[`123456`] = result
  XLSX.writeFile(wb, 'rest.csv', {bookType:'csv', type: 'array'})
}

export default Excel