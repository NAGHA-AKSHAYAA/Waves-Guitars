const { Mongoose, default: mongoose } = require("mongoose");

const woodSchema = mongoose.Schema({
    name:{
        type:String,
        require: true,
        unique:1,
        maxlength: 100
    }
});

const Wood = mongoose.model('Wood', woodSchema)

module.exports = {Wood}

