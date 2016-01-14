function auth() {
var config = {
    'client_id': '595370832278-tshto7qapj4anouh8ffcuitl65fceq39',
    'scope': 'https://www.googleapis.com/auth/plus.login'
};
gapi.auth.authorize(config, function() {
	var google;
    console.log('login complete');
    //console.log(gapi.auth.getToken());
    makeAPICall();
});
}

function makeAPICall(){
      gapi.client.load('plus', 'v1', function() {
        var request = gapi.client.plus.people.get({
          'userId': 'me'
        });
        request.execute(function (resp){
          console.log(resp);
          if(resp.id){
            //console.log('ID: ' + resp.id);
            //google.setAttribute('data-clientid',resp.id);
          }
          if(resp.displayName){
          	document.getElementById('status').innerHTML = resp.displayName + '! ';
            //console.log('Display Name: ' + resp.displayName);
          }
          if(resp.image && resp.image.url){
          	document.getElementById('fotoUsuario').setAttribute("src",resp.image.url);
            //console.log('Image URL: ' + resp.image.url);
          }
          if(resp.url){
            //console.log('Profile URL: ' + resp.url);
          }
        });
     });
    }

function init(){
	var google;
	// (function() {
	//      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	//      po.src = 'https://apis.google.com/js/client:plusone.js?onload=signinCallback';
	//      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
 //     })();
	google = document.getElementById('google');
	google.addEventListener('click', auth, false);
}

window.addEventListener('load', init, false);