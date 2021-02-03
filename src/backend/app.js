import Excel from './excel'

const Sheet = new Excel()
// step1：取得excel全部的資料
const SHEETDATA = Sheet.getWorkSheetAllData(Sheet.worksheet)
// console.log(SHEETDATA);

// step2：篩選出需要的資料，這邊是8、9的車號
Sheet.exportCsvFile(SHEETDATA)