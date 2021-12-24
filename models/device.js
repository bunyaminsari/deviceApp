const mongoose = require('mongoose');

const deviceSchema =  new mongoose.Schema({
    product:{
        type:String,
        required: true
    },

    make:{
        type:String,
        required: true
    },

    model:{
        type:String,
        required:true
    },

    serial:{
        type:String,
        uppercase:true,
        required: true
    },

    barcode:{
        type:Number,
        required:true
    },

    price: {
        type:Number,
        required: true,
        min:0
    },

    category:{
        type:String,
        lowercase: true,
    },

})

const Device  =  mongoose.model('Device', deviceSchema);
// Keep this settings as module.exports not just exports
module.exports = Device;