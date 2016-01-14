
    var selectedElement = 0;
    var currentX = 0;
    var currentY = 0;
    var currentMatrix = 0;
    function allowDrop(ev) {
    ev.preventDefault();
    }

    function drag(ev) {
        //ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
      ev.preventDefault();
      var NS="http://www.w3.org/2000/svg";
      var newRect=document.createElementNS(NS,"rect");
      newRect.setAttributeNS(null,"class","draggable");
      newRect.setAttributeNS(null,"x",30);
      newRect.setAttributeNS(null,"y",30);
      newRect.setAttributeNS(null,"stroke-width",2);
      newRect.setAttributeNS(null,"stroke","rgb(0,0,0)");

      var newWidth=ev.target.clientWidth;
      var newHeight=ev.target.clientHeight;
      newRect.setAttributeNS(null,"class","draggable");
      newRect.setAttributeNS(null,"width",79);
      newRect.setAttributeNS(null,"height",79);
      newRect.setAttributeNS(null,"fill","blue");
      newRect.setAttributeNS(null,"transform","matrix(1 0 0 1 0 0)");
      newRect.setAttributeNS(null,"onmousedown","selectElement(evt)");

      areaTrabajo.appendChild(newRect);

      //var data = ev.dataTransfer.getData("text");
      //ev.target.appendChild(document.getElementById(data));
    }
    function selectElement(evt) {
      selectedElement = evt.target;
      currentX = evt.clientX;
      currentY = evt.clientY;
      currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
    
      for(var i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
      }
      
      selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
      selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
      selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
    }
        
    function moveElement(evt) {
      var dx = evt.clientX - currentX;
      var dy = evt.clientY - currentY;
      currentMatrix[4] += dx;
      currentMatrix[5] += dy;
      
      selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
      currentX = evt.clientX;
      currentY = evt.clientY;
    }
        
    function deselectElement(evt) {
      if(selectedElement != 0){
          selectedElement.removeAttributeNS(null, "onmousemove");
          selectedElement.removeAttributeNS(null, "onmouseout");
          selectedElement.removeAttributeNS(null, "onmouseup");
          selectedElement = 0;
          }
        }
        
