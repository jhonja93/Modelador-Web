var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our email model
var Schema = mongoose.Schema;
var diagramSchema = new Schema({
    jdiagram:   String,
    name:       String,
    owner:      String,
    parent:     String,
    date:       {type: Date, default:Date.now},
    _id:        String
},{_id : false});


// create the model for emails and expose it to our app
module.exports = mongoose.model('Diagram', diagramSchema);



//GUARDAR EN MONGO
//db.Diagram.insert({local:{jdiagram:"JSON",name:"prueba"}})
