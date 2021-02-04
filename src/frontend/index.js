import Excel from "./excel"


window.onload = function() {
  const fileUploader = document.getElementById('file-uploader')
  fileUploader.addEventListener('change', handleUpload , false)
}

const handleUpload = function (e) {
  
  let url = getObjectURL(e.target.files[0])
  console.log(url);
  
  // sheet = Excel({ path: url })
  // let sheet = Excel
  // // console.log(sheet);
  // console.log(`sheet.a = `, sheet.a);
  
  // let oFReader = new FileReader()
  // oFReader.readAsDataURL(file)
  // let filename = document.getElementById("file-uploader").value

  let sheet = new Excel({ path: url })
  console.log('sheet');
  console.log(sheet);
  
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
