
function procesarDiagramas(event){
  var respond = JSON.parse(event.target.responseText);
  var lista = document.getElementById('listaDiagramas');

  for (var i = 0; i < respond.length; i++) {
    var li = document.createElement('li');
    li.setAttribute("class","col-xs-12 col-sm-6 col-md-4 portfolio-item");
    li.innerHTML = "<a class='thumbnail'> <button type='button' class='close' onclick='closethumbnail(this)'>x</button> <img class='diagrama img-responsive' src='/img/img.jpg'> <span class='nameDiagram'>"+respond[i].name+"</span> </a>";
    lista.appendChild(li);
  }
}

function initialize(){
    var request = new XMLHttpRequest();
    request.open("GET","/diagrams", true);
    request.addEventListener("load", procesarDiagramas, false);
    request.send(null);
}

window.addEventListener('load', initialize, false);
