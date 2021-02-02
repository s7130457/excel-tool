const XLSX = require('xlsx')

const FILE = `./sample.xlsx`
const workbook = XLSX.readFile(FILE) // excel的所有資料
const sheetName = workbook.SheetNames[0] // 取得第一張工作表名稱
const worksheet = workbook.Sheets[sheetName] // 第一張工作表的資料
const range = XLSX.utils.decode_range(worksheet['!ref'])  // 整張表有值的範圍 { s: { c: 0, r: 0 }, e: { c: 6, r: 3543 } }
console.log(`range.s.c = `, range.s.c);
console.log(`range.s.r+3 `, range.e.r+3);
const Excel = function (opts) {
  this.fpath = opts.fpath
  this.col = opts.col || ['項次', '車牌號碼', '姓名', '開張單數', '欠繳費用']
}

// step1：取得excel全部的資料
const result = getWorkSheetAllData(worksheet)
console.log(result);

// step2：篩選出需要的資料，這邊是8、9的車號



function getWorkSheetAllData(worksheet) {
  let sheetData = []
  for (let r = range.s.r+4; r < range.e.r; r++) {
    let cellData = {}
    for (let c = range.s.c; c < 5; c++) {
      let cellId = XLSX.utils.encode_cell({c, r}, {c, r}) // 取得欄位編號，ex A5
      const value = worksheet[cellId]?.v // 取得欄位得值，可能會是undefined  ex AJP-0322
      cellData[col[c]] = value
    }
    sheetData.push(cellData)
    // break // 這邊註解拿掉後，就會只取得一筆完整的
  }
  return sheetData
}