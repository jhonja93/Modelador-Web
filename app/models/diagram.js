var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User  = require('./user');
var diagramSchema = new Schema({
  name          : {type: String, required: true},
  createdBy     : {type: String, required: true, ref: 'User'},
  diagram       : {type: String, required: true, unique: true},
  imagen        : {type: String, required: true, default: '/img/img.jpg'},
  date          : {type: Date, default: Date.now},
  colaboradores : [{
    type: Schema.Types.String,
    ref: 'User'
  }],
  comments: [{
    text: String,
    postedBy: {
      type: Schema.Types.String,
      ref: 'User'
    }
  }]
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
