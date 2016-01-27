var socket = io(); // Inicializamos socketIO en el cliente

    /**
     * Listener para el evento 'chat message'
     *   Notese que es el mismo evento que se envia
     *   desde el servidor.
     * Agregamos el mensage entrante a la lista.
     */
    socket.on('chat message', function (msg) {
      //$('#list-msgs').append($('<li>').text(msg));
      var $newdiv = $("<div class='chat-body clearfix' />");
      var $newli = $("<li class='right clearfix'/>");
      $newdiv.append($("<p>"+msg+"</p>"));
      $newli.append($newdiv);
      $('#list-msgs').append( $newli );
    });

    /**
     * Emitimos un evento de tipo 'chat message' cada vez
     * que se presiona 'Enter' en el textarea y enviamos
     * su contenido como mensaje.
     */
    $('#new-msg').keyup(function (evt) {
      if (evt.keyCode === 13) {
        socket.emit('chat message', $('#new-msg').val());
        $('#new-msg').val('');
      }
    });

    socket.on('all online users', function (users) {
        console.log(users.length + ' users received');
        for (var i=0; i<users.length; i++)
        {
          var htmluser = '<li id="' + users[i]._id + '">' + users[i]._id + '</li>';
          $('#online-userslist').append(htmluser);
        }
      });

    socket.on('new user', function (nuser) {
      var linuser = '<li id="' + nuser._id + '">'+ nuser._id + '</li>';
      $('#online-userslist').append(linuser);
    });

    socket.on('remove user', function (nuser) {
        $('#' + nuser._id).remove();
      })


    socket.emit('all online users');
    socket.emit('new user', user);
