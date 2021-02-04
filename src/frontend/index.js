import Excel from "./excel"


window.onload = function () {
  const fileUploader = document.getElementById('file-uploader')
  fileUploader.addEventListener('change', handleUpload, false)
}

const handleUpload = function (e) {
  let sheet
  const fileReader = new FileReader()
  const a = fileReader.readAsText(e.target.files[0], 'big5')
  console.log('a');
  console.log(a);
  fileReader.onload= function (e) {
    console.log('onload');

    document.getElementById('span1').innerHTML = e.target.result
    
    // console.log(e.target.result);
    
  }
  
  // fileReader.readAsDataURL(e.target.files[0])
  // fileReader.onload = function(e) {
  //   sheet = new Excel({path: e.target.result})
  //   // console.log(sheet)
  //   // let a = fileReader.readAsBinaryString(sheet.worksheet)
  //   // console.log('a');
  //   // console.log(a);
    
  //   // const data = sheet.getWorkSheetAllData(sheet.worksheet)
  //   // console.log('data');
  //   // console.log(data);
    
  // }
  
}