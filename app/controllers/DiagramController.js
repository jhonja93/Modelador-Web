var express = require('express');
var router 	= express.Router();
var User 	= mongoose.model('User');
var Diagram = mongoose.model('Diagram');

module.exports = function (app) {
	  app.post('/save',function(req,res){
      console.log(req.body.dId=="");
      if(req.body.dId==""){
        Diagram.count({},function(err,c){
              console.log(c);
              req.session.CountDiagrDb = c;});
        User.find({_id : req.session.Userid},function (err, user) {
		      if (err) return handleError(err);
		      // console.log(req.session.Userid+" ;)");
		      var newDiagram = new Diagram();
		      newDiagram.owner = req.session.Userid;
		      // console.log(req.session.CountDiagrDb  +" ;)");
		      req.session.CountDiagrDb=req.session.CountDiagrDb+1;
		      newDiagram._id= req.session.CountDiagrDb;
		      // console.log(req.session.Userid+" ;)");
		      newDiagram.jdiagram= req.body.svg;
		      newDiagram.name = req.body.dname;
		      user[0].draws.push(newDiagram._id);
		      user[0].save(function(err){
		          if (err) throw err;


        });
      newDiagram.save(function(err){
          if (err) throw err;
      ///console.log(JSON.stringify(user, null, "\t"));
        // console.log(newDiagram._id);
        res.json({message:"guardado exitoso",idDiagram:newDiagram._id});
        });
    });

    }
    else{

      Diagram.update({_id: req.body.dId},{$set:{jdiagram:req.body.svg,name:req.body.dname}},function(err,numAffected){
        if (err) throw err;
        res.json({message:"Diagrama Actualizado",idDiagram:req.body.dId});
      });
    }

    // req.flash('idDiagram',req.session.CountDiagrDb);
    // res.redirect('/draw');
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
