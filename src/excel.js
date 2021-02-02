import iconv from 'iconv-lite'
const XLSX = require('xlsx')
const fs = require('fs')

const FILE = `./sample.xlsx`
const workbook = XLSX.readFile(FILE) // excel的所有資料
const sheetName = workbook.SheetNames[0] // 取得第一張工作表名稱
const worksheet = workbook.Sheets[sheetName] // 第一張工作表的資料
const range = XLSX.utils.decode_range(worksheet['!ref'])  // 整張表有值的範圍 { s: { c: 0, r: 0 }, e: { c: 6, r: 3543 } }
console.log(`range.s.c = `, range.s.c);
console.log(`range.s.r+3 `, range.e.r+3);
const COL = ['項次', '車牌號碼', '姓名', '開張單數', '欠繳費用']
const NUMBER = [8, 9]

const Excel = function (opts) {
  this.fpath = opts.fpath
  this.col = opts.col || COL
}

// step1：取得excel全部的資料
const SHEETDATA = getWorkSheetAllData(worksheet)
// console.log(SHEETDATA);

// step2：篩選出需要的資料，這邊是8、9的車號
exportCsvFile(SHEETDATA)

function getWorkSheetAllData(worksheet) {
  let sheetData = []
  for (let r = range.s.r+4; r < range.e.r/*range.e.r*/; r++) {
    let cellData = {}
    for (let c = range.s.c; c < 5; c++) {
      let cellId = XLSX.utils.encode_cell({c, r}, {c, r}) // 取得欄位編號，ex A5
      const value = worksheet[cellId]?.v // 取得欄位得值，可能會是undefined  ex AJP-0322
      cellData[COL[c]] = value
    }
    sheetData.push(cellData)
    // break // 這邊註解拿掉後，就會只取得一筆完整的
  }
  return sheetData
}

function exportCsvFile(sheetData) {
  let result = sheetData.filter(row => {
    try {
      // 資料正確的
      const carId = row['車牌號碼']
      // console.log(`carId = `, carId);
      let sub = carId.split('-')
      // 因為會有9M-7051這種車牌，但對我來說這個是7不是9
      return (sub[0].length !== 2 && NUMBER.includes(+sub[0][0])) || (sub[1].length !== 2 && NUMBER.includes(+sub[1][0]))
    } catch (e) {
      // 錯誤的資料不理他
      // // 資料錯誤的，回傳回去人工顯示
      // row.status = 'error'
      // return true
    }
  })
  const fdata = XLSX.utils.json_to_sheet(result)
  const OUTPUTFILE = `./data`
  fs.writeFileSync(`${OUTPUTFILE}-big5.csv`, iconv.encode(XLSX.utils.sheet_to_csv(fdata), 'Big5'))    // 用big5的編碼ＱＱ
  fs.writeFileSync(`${OUTPUTFILE}.csv`, iconv.encode(XLSX.utils.sheet_to_csv(a), 'utf8'))    // 用utf8的編碼
}