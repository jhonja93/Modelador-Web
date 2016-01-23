$(document).ready(function() {
  $("#btnGuardar").click(function(event) {
    var dibujo = document.querySelector("svg");
    console.log(dibujo);
    var xmls = new XMLSerializer();
    var str = xmls.serializeToString(dibujo);
    console.log(str);
    if (txtNombreDiagrama.value==""){
      alert("ingrese un nombre para el diagrama primero");
    }
    else{var request = $.ajax({
          method: "POST",
          url: "/save",
          //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
         data: {svg: str,
          dname:txtNombreDiagrama.value}
        })
        .done(function(result) {
          console.log(result/*"done"*/);
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });}

  });

});
