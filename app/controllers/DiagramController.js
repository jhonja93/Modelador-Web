var express = require('express');
var router 	= express.Router();
var User 	= mongoose.model('User');
var Diagram = require('../models/diagram');

module.exports = function (app) {

	app.get('/usuarios', function(req, res){
		console.log('obteniendo todos los diagramas de: ' + req.session.Userid);
		User.findById(req.session.Userid)
		.exec(function(err, diagramas){
			if(err){res.send('error has ococured');}
			else{
				console.log(diagramas);
				res.json(diagramas);
			}
		});
	});

	app.post('/save', function(req, res){
		console.log(req.session.Userid);
		var newDiagram = new Diagram({
			name		: req.body.name,
			diagram	: req.body.svg,
			_creator: req.session.Userid
		});

		newDiagram.save(function(err) {
			if (err) {
				console.log(err);
				return;
			}
			console.log("Guardo el diagrama: " + req.body.name);
			res.json({mensaje: "Guardado exitoso"});
		})
	});
//   app.post('/save',function(req,res){
//     console.log(req.body.dId=="");
//     if(req.body.dId==""){
//       Diagram.count({},function(err,c){
//             console.log(c);
//             req.session.CountDiagrDb = c;});
//       User.find({_id : req.session.Userid},function (err, user) {
// 	      if (err) return handleError(err);
// 	      // console.log(req.session.Userid+" ;)");
// 	      var newDiagram = new Diagram();
// 	      newDiagram.owner = req.session.Userid;
// 	      // console.log(req.session.CountDiagrDb  +" ;)");
// 	      req.session.CountDiagrDb=req.session.CountDiagrDb+1;
// 	      newDiagram._id= req.session.CountDiagrDb;
// 	      // console.log(req.session.Userid+" ;)");
// 	      newDiagram.jdiagram= req.body.svg;
// 	      newDiagram.name = req.body.dname
// 	      user[0].draws.push(newDiagram._id);
// 	      user[0].save(function(err){
// 	          if (err) throw err;
//
//
//       });
//     newDiagram.save(function(err){
//         if (err) throw err;
//     ///console.log(JSON.stringify(user, null, "\t"));
//       // console.log(newDiagram._id);
//       res.json({message:"guardado exitoso",idDiagram:newDiagram._id});
//       });
//   });
//
//   }
//   else{
//
//     Diagram.update({_id: req.body.dId},{$set:{jdiagram:req.body.svg,name:req.body.dname}},function(err,numAffected){
//       if (err) throw err;
//       res.json({message:"Diagrama Actualizado",idDiagram:req.body.dId});
//     });
//   }
// });

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
