var express = require('express');
var router 	= express.Router();
var User 	= mongoose.model('User');
var Diagram = mongoose.model('Diagram');

module.exports = function (app) {
	app.post('/save',function(req,res){
      User.find({_id : req.session.Userid},function (err, user) {
        if (err) return handleError(err);
        console.log(user._id+" ;)");
        var newDiagram = new Diagram();
        newDiagram.local.jdiagram= req.body.svg;
        newDiagram.local.name = req.body.dname;
        newDiagram.local.owner = req.session.Userid;
        user[0].draws.push(newDiagram);
        user[0].save(function(err){
            if (err) throw err;
             res.send("guardado exitoso");
          });
        // res.send("guardado exitoso");
        //console.log(JSON.stringify(user, null, "\t"));
    	})
	});

}