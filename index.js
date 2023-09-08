require('./models/userModel');
require('./models/phoneModel');
const express=require('express');
const auth=require('./auth');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const router=require('./route');
const uri="mongodb+srv://tajou003:hatlijat@cluster0.jmwskiv.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyParser.json())
app.use(router)
mongoose.connect(uri);
mongoose.connection.on('connected',()=>{console.log('connected')})

app.listen(3000,()=>{
    console.log('listening...')
})
