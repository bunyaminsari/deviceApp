// Mongoose Connection
const mongoose = require('mongoose');

// Importing Device Model
const Device = require('./models/device');

mongoose.connect('mongodb://localhost:27017/deviceApp')
    .then(() =>{
        console.log('CONNECTION OPEN')
    })
    .catch(err => {
        console.log('OH NO! WE MESSED UP!')
        console.log(err)
    })

// We have just copied above part of the code that, to seed the database. It does not have any relation with
// the app, it is something we want to play with the database. 

// This is for adding a single device to the database. It worked. 
// const d = new Device({
//     product:'Chromebook',
//     make:'Lenovo',
//     model:'N23',
//     serial:'lr08wr9e',
//     barcode: 200222,
//     price:200,
//     category:'stock'
// })
// d.save().then(d =>{
//     console.log(d)
// })
// .catch(e =>{
//     console.log(e)
// })


// Lets insert more devices to the database.
const seedDevices = [
    {
        product:'iPad',
        make:'Apple',
        model:'Air',
        serial:'kdka7798798',
        barcode: 200021,
        price:300,
        category:'mobile'
    },
    {
        product:'Smartboard',
        make:'Smart',
        model:'K64',
        serial:'jdkadkadk788',
        barcode: 200233,
        price:800,
        category:'fixed'
    },
    {
        product:'Chromebook',
        make:'Lenovo',
        model:'N22',
        serial:'lr08wr9e',
        barcode: 200233,
        price:100,
        category:'junk'
    },
    {
        product:'Laptop',
        make:'Dell',
        model:'Inspiron',
        serial:'lr08dadadadwr9e',
        barcode: 200333,
        price:50,
        category:'donate'
    }
]

Device.insertMany(seedDevices).then(res=>{
    console.log(res)
})
.catch(e =>{
    console.log(e)
})