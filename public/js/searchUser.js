$('#searchlist').btsListFilter('#searchinput',{itemChild:'span'});

$('#btnShareUser').click(function(event) {

  if (searchinput.value==""){
      alert("ingrese el nombre de la persona con quien desea compartir el diagrama");
    }
    else{
      var name = searchinput.value;
      var request = $$.ajax({
        url: '/share',
        method:'POST',
        //type: 'default GET (Other values: POST)',
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: {name: name}
      })
      .done(function(result) {
        alert(result);// console.log("success");
      })
      .fail(function() {
        alert("error");
      })
      .always(function() {
        console.log("complete");
      });

    }
});
