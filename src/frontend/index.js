// const Excel = require('./excel')

import Excel from "./excel"
// const Excel = require('excel')
// const AAA = new Excel()

window.onload = function() {
  
  let sheet, file
  
  const fileUploader = document.getElementById('file-uploader')
  console.log(fileUploader);
  fileUploader.addEventListener('change', handleUpload , false)

  
  
  
  
}
const handleUpload = (e) => {
  // console.log(e)
  // console.log(file);

  // file = file[0]
  let url = getObjectURL(e.target.files[0])
  sheet = Excel({ path: url })
  console.log(sheet);

  // let oFReader = new FileReader()
  // oFReader.readAsDataURL(file)
  // let filename = document.getElementById("file-uploader").value
  console.log(url);
}

function getObjectURL(file) {
  var url = null;
  if (window.createObjcectURL != undefined) {
    url = window.createOjcectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
