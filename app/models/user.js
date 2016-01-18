// app/models/email.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our email model
var Schema = mongoose.Schema;
var userSchema = new Schema({

    local            : {
        id           : String,
        email        : String,
        password     : String,
        nombres      : String,
        apellidos    : String,
        matricula    : String
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        lastName     : String,
        picture      : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        username     : String,
        displayName  : String,
        lastStatus   : String,
        picture      : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        picture      : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for emails and expose it to our app
module.exports = mongoose.model('User', userSchema);
