import Excel from './excel'

const Sheet = new Excel()
// step1：取得excel全部的資料
let sheetData = Sheet.getWorkSheetAllData(Sheet.worksheet)
// console.log(SHEETDATA);

// step2：篩選出需要的資料，這邊是8、9的車號
sheetData = Sheet.filterCarId(sheetData)

// step3: 拿車號去查時間區間
Sheet.getTimeIntervalByCarId(sheetData)