const mongoose = require ('mongoose');
//define person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:["chef","waiter","manager"]
    },
    add:{
        type:String,
        required:true
    },
    mobile:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    }

});
//create person model
const person=mongoose.model('person',personSchema);
module.exports=person;