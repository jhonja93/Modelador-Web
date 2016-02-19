var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User  = require('./user');
var diagramSchema = new Schema({
  _creator      : {type: String, ref: 'User'},
  diagram       : String,
  name          : {type: String, required: true, unique: true},
  date          : {type: Date, default:Date.now},
  colaboradores : [{type: Schema.Types.ObjectId, ref: 'User'}]
});

// .pre("save", true, function(next, done) {
//   var self = this;
//   mongoose.models["Diagram"].findOne({_creator : self._creator, name : self.name}, function(err, result) {
//     if(err){
//       done(err);
//     } else if (result) {
//       //self.invalidate("name", "Nombre de diagrama ya existe");
//       console.log(result.name);
//       //result.diagram = self.diagram;
//       console.log("Diagrama Actualizado");
//     }
//   });
//   next();
//   setTimeout(done, 100);
// });
// create the model for emails and expose it to our app
module.exports = mongoose.model('Diagram', diagramSchema);



//GUARDAR EN MONGO
//db.Diagram.insert({local:{jdiagram:"JSON",name:"prueba"}})
