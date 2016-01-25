$('#relizq').hide();
$('#relder').hide();
newGraph=new joint.dia.Graph();
newGraph.on('change:position', function(cell) {
      var parentId = cell.get('parent');
      if (!parentId) return;

      var parent = newGraph.getCell(parentId);
      var parentBbox = parent.getBBox();
      var cellBbox = cell.getBBox();

      if (parentBbox.containsPoint(cellBbox.origin()) &&
          parentBbox.containsPoint(cellBbox.topRight()) &&
          parentBbox.containsPoint(cellBbox.corner()) &&
          parentBbox.containsPoint(cellBbox.bottomLeft())) {

          // All the four corners of the child are inside
          // the parent area.
          return;
    	}

    	// Revert the child position.
    	cell.set('position', cell.previous('position'));
  	});
    var linkdef=new joint.dia.Link({
        attrs: {
        '.connection': { stroke: '#3399ff', 'stroke-width': 2 },
        '.marker-target': { fill:"#FFFFFF",'stroke-width':2, stroke:"#3399ff", d:"M335,221.5h-27 M308,207.803l27.429,13.483 M308,234.77 l27.429-13.483 M307.5,208v27 M334.5,208v27 M335,221.5h10" },
        '.marker-source': { fill:"#FFFFFF",'stroke-width':2, stroke:"#3399ff", d:"M335,221.5h-27 M308,207.803l27.429,13.483 M308,234.77 l27.429-13.483 M307.5,208v27 M334.5,208v27 M335,221.5h10" }
      }
    })
    linkdef.set('router', { name: 'orthogonal' });
		var paper = new joint.dia.Paper({
        el: $('#paper'),
        width: $('#paper').width(),
        height: $('#paper').height(),
        model: newGraph,
        gridSize: 1,
        defaultLink: linkdef,
        snapLinks: { radius: 75 }
    });
		paper.on('blank:pointerdblclick', function(evt, x, y) {
      //$("#live-modal").modal('toggle');
    	//$('#createEntity').click(function(){
        createRect(/*titleEntity.value,*/x,y);

    //});
});

    paper.on('blank:pointerdown',function(evt, x, y) {
      $('#relizq').hide();
      $('#relder').hide();
});
    var selected;
    var selView;
    var selectedLink;
    //gráficos de las relaciones
    var ceromuchas={fill:"#FFFFFF",'stroke-width':2, stroke:"#3399ff", d:"M362.396,221.286c0,7.446-6.037,13.483-13.483,13.483 s-13.483-6.037-13.483-13.483c0-7.447,6.037-13.483,13.483-13.483S362.396,213.839,362.396,221.286z M335,221.5h-27 M308,207.803 l27.429,13.483 M308,234.77l27.429-13.483 M307.5,208v27"};
    var unomuchas={fill:"#FFFFFF", stroke:"#3399ff",'stroke-width':2, d:"M335,221.5h-27 M308,207.803l27.429,13.483 M308,234.77 l27.429-13.483 M307.5,208v27 M334.5,208v27 M335,221.5h10"};
    var muchas={fill:"#FFFFFF", stroke:"#3399ff",'stroke-width':2, d:"M335,221.5h-27 M308,207.803l27.429,13.483 M308,234.77 l27.429-13.483 M307.5,208v27"};
    var cerouna={fill:"none", stroke:"#3399ff",'stroke-width':2, d:"M356.5,208v27 M366.539,221.401L356,221.5 M345.5,232.5 c5.799,0,10.5-4.701,10.5-10.5s-4.701-10.5-10.5-10.5S335,216.201,335,222S339.701,232.5,345.5,232.5z"};
    var una={fill:"none", stroke:"#3399ff",'stroke-width':2, d:"M356.5,208v27 M346,221.5h10 M366.539,221.401L356,221.5"}

    paper.on('cell:pointerdown', function(cellView){
      $('#relizq').hide();
      $('#relder').hide();
      selView=cellView;
      cellView.highlight();
      selected = cellView.model;
      if (selView) selView.unhighlight();
      if(cellView.model.isLink()) {
        selectedLink=selected;
        $('#relizq').show();
        $('#relder').show();
      };

    });
    $('#im').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-source':muchas});
        });
    $('#ium').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-source':unomuchas});
        });
    $('#icm').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-source':ceromuchas});
        });

        $('#icu').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-source':cerouna});
        });
        $('#iu').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-source':una});
        });
        $('#dum').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-target':unomuchas});
        });
        $('#dcm').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-target':ceromuchas});
        });
        $('#dm').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-target':muchas});
        });
        $('#dcu').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-target':cerouna});
        });
        $('#du').click(function(){
          if (selectedLink) selectedLink.attr({'.marker-target':una});
        });
    $('#removeEntity').click(function(){
      if (selected) selected.remove();
});

function createRect(x,y){/*name,*/

	 var rect = new joint.shapes.devs.Model({
      position: { x: x, y: y },
      size: { width: 119, height: 99 },
      inPorts: ['','',''],
      outPorts: ['','',''],
      attrs: { rect: { fill: 'white' },
      '.label':{text:'hola :)'},
       '.inPorts circle': { fill: '#16A085' },
       '.outPorts circle': { fill: '#16A085' }
     }
   });


   var rectTitle = new joint.shapes.basic.Rect({
       position: { x: x, y: y },
       size: { width: 119, height: 25 },
       attrs: { rect: { fill: 'none' }
     }
   });
   var rect3 = new joint.shapes.basic.Rect({
       position: { x: x, y: y },
       size: { width: 119, height: 25 },
       attrs: { rect: { fill: 'rgba(0,0,0,0.4)' }, text: { text: name, fill: 'black' } }
   });
   var rectType = new joint.shapes.basic.Rect({
       position: { x: x+79, y: y+25 },
       size: { width: 40, height: 74 },
       attrs: { rect: { fill: 'none' } }
   });
   var rectTypewrp = new joint.shapes.basic.Rect({
       position: { x: x+79, y: y+25 },
       size: { width: 40, height: 74 },
       attrs: { rect: { fill: 'none' } }
   });
   rectType.embed(rectTypewrp);
   rectTitle.embed(rect3);
   rect.embed(rectTitle);
   rect.embed(rectType);
   newGraph.addCells([rect,rectTitle,rect3,rectType,rectTypewrp]);
}

/**
 * @param {SVGElement} svg
 * @param {Function} callback
 * @param {jsPDF} callback.pdf
 * */
function svg_to_pdf(svg, callback) {
  svgAsDataUri(svg, {}, function(svg_uri) {
    var image = document.createElement('img');

    image.src = svg_uri;
    image.onload = function() {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var doc = new jsPDF('landscape', 'pt');
      var dataUrl;

      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
      dataUrl = canvas.toDataURL('image/jpeg');
      doc.addImage(dataUrl, 'JPEG', 0, 0, image.width, image.height);

      callback(doc);
    }
  });
}

/**
 * @param {string} name Name of the file
 * @param {string} dataUriString
*/
function download_pdf(name, dataUriString) {
  var link = document.createElement('a');
  link.addEventListener('click', function(ev) {
    link.href = dataUriString;
    link.download = name;
    document.body.removeChild(link);
  }, false);
  document.body.appendChild(link);
  link.click();
}

var fileName =  'diagrama.json'; // You can use the .txt extension if you want
 function downloadAsJson(filename) {
     var json=JSON.stringify(newGraph);
    mimeType ='application/json';
     downloadJson.setAttribute('download', filename);
     downloadJson.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(json));

 }


$("#btnGuardar").click(function(event) {
  var json=JSON.stringify(newGraph);
    if (txtNombreDiagrama.value==""){
      alert("ingrese un nombre para el diagrama primero");
    }
    else{var request = $.ajax({
          method: "POST",
          url: "/save",
          //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
         data: {svg: json,
          dname:txtNombreDiagrama.value}
        })
        .done(function(result) {
          alert(result/*"done"*/);
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });}

  });


$('#downloadJson').click(function(){
    downloadAsJson(fileName);
});
$('#downloadPdf').click(function(){
    // downloadAsPDF(fileName);
    svg_to_pdf(document.querySelector("svg"), function (pdf) {
                download_pdf('SVG.pdf', pdf.output('dataurlstring'));
            });
});
