var express = require('express');
var router 	= express.Router();
var User 	= mongoose.model('User');
var Diagram = mongoose.model('Diagram');

module.exports = function (app) {
	  app.post('/save',function(req,res){
    User.find({_id : req.session.Userid},function (err, user) {
      if (err) return handleError(err);
      //console.log(user._id+" ;)");
      var newDiagram = new Diagram();
      newDiagram.jdiagram= req.body.svg;
      newDiagram.name = req.body.dname;
      newDiagram.owner = req.session.Userid;
      user[0].draws.push(newDiagram);
      user[0].save(function(err){
          if (err) throw err;
          req.session.diagramId = newDiagram._id;
          res.send("guardado exitoso");
        });
      newDiagram.save(function(err){
          if (err) throw err;});
      ///console.log(JSON.stringify(user, null, "\t"));
    });
  });
  app.post('/share',function(req,res){
    var re = new RegExp(req.body.name, "i");
    User.find().or({names: {$regex:re}},function (err, user) {
      console.log(user);
      Diagram.find({'_id':req.session.diagramId}, function(err,diagram){
        console.log("estoy en diagrama");
        user.shareds.push(diagram);
      });

      }
    );
  });

}
