function verImagen(){
  // var canvas = document.getElementById('paper');
  // var img = canvas.toDataURL("image/png");
  // console.log(img);
  // document.write('<img src="'+img+'"/>');
  svg = $('svg').parent().html();
  canvg('canvas', svg);
  canvas = document.getElementById("canvas");
  img_PNG = Canvas2Image.convertToPNG(canvas, 300, 300);

  $('.chart').html(img_PNG);
}

function initialize(){
    document.getElementById('btnImage').addEventListener('click', verImagen, false);
}

window.addEventListener('load', initialize, false);
