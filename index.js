const express  =  require('express');
const app  = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const multer  = require('multer');
const upload = multer({dest: 'uploads/'})

// Mongoose Connection
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Importing Device Model
const Device = require('./models/device');
const bulkdevices = [];

// Database Connection
mongoose.connect('mongodb://localhost:27017/demo11')
    .then(() =>{
        console.log('CONNECTION OPEN')
    })
    .catch(err => {
        console.log('OH NO! WE MESSED UP!')
        console.log(err)
    })

// TEMPLATE
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')
// This line is necessary to get the data from request.body on CREATE ROUTE
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(methodOverride('_method'));

const categories = ['fixed','mobile','stock','junk','donate'];
// Root Route
app.get('/',(req,res)=>{
    res.render('home')
})

// Index Route -  All Devices
app.get('/devices', async (req,res)=>{
    const {category} = req.query;
    if(category){
        const devices = await Device.find({category})
        res.render('./devices/index',{devices,category})
    }else{
        const devices = await Device.find({})
        res.render('./devices/index',{devices,category:'All'})  
    }
      
})

// New Route 
app.get('/devices/new',(req,res)=>{
    res.render('./devices/new',{categories})
})

// Create Route 
app.post('/devices', async(req,res)=>{
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.redirect(`/devices/${newDevice._id}`);
    
})

//Bulk New Route 
app.get('/devices/bulk',(req,res)=>{
    res.render('./devices/bulk')
})

// Bulk Import Route
app.post('/devices/bulk',upload.single('file'),(req,res)=>{
    headers = ['product','make','model','serial','barcode','price','category'];
    fs.createReadStream(req.file.path)
    .pipe(csv({headers,skipLines:1}))
    .on('data', (data) => bulkdevices.push(data))
    .on('end', () => {
        Device.insertMany(bulkdevices).then(content => {
            res.redirect('/devices');
        })
    })
})

// Show Route 
app.get('/devices/:id',async (req,res) =>{
    const {id}  = req.params;
    const device = await Device.findById(id);
    res.render('./devices/show',{device})
})

// Edit Route 
app.get('/devices/:id/edit', async (req,res)=>{
    const {id}  = req.params;
    const device = await Device.findById(id);
    res.render('./devices/edit',{device,categories})
})

// UPDATE Route 
app.put('/devices/:id',async (req,res)=>{
    const {id} = req.params;
    const device = await Device.findByIdAndUpdate(id,req.body, {runValidators:true, new:true});
    res.redirect(`/devices/${device._id}`)
})

// DELETE Route
app.delete('/devices/:id',async(req,res)=>{
    const {id} = req.params;
    const deletedDevice = await Device.findByIdAndDelete(id);
    res.redirect('/devices')

})

// 404
app.get('*',(req,res)=>{
    res.send('NOT FOUND!')
})

// PORT
app.listen(port,()=>{
    console.log(`APP LISTENING AT PORT ${port}`)
})