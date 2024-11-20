const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axois = require('axios').default;

const userRoute = require('./routes/user');
const fiddleRoute = require('./routes/fiddle');

const app = express();

app.use(cors());
app.use(express.json());



app.get('/', (req,res)=>{
    res.end('hello from server');
});


app.use('/users', userRoute);
app.use('/fiddles', fiddleRoute);

app.post('/execute',(req,res)=>{
    let reqObj = req.body;
    reqObj['clientId'] = "9ab06225b696debb376ad4f66e8a695f";
    reqObj['clientSecret'] = "733286d05a28f6d793029bf5c48cfe1388c7e1b220dd58b73438b686f84d7a91";
    axois.post('https://api.jdoodle.com/v1/execute', reqObj).then((resp)=>{
        res.json({error:false, response: resp.data});
    }).catch((err)=>{
        console.log(err);
    });
})

mongoose.connect('mongodb://127.0.0.1:27017/admin', {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log(err);
});

app.listen(3000, ()=>{
    console.log('server is running in port 3000');
})