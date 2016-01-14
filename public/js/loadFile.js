function onLoad(evt) {
	document.getElementById('fileInput').click();
}

function handleFiles(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = onFileReadComplete;
    reader.readAsText(file);
}
  
function onFileReadComplete(evt) { 
  // Do something fun with your file contents.
}