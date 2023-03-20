const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.get('/',(req,res)=>{
    res.json({
        text: 'api works'
    });
});

app.post('/api/login',(req,res)=>{
    const user = {id:3};
    const token = jwt.sign({user},'miclavesecreta');
    res.json({
        token
    })
});

app.get('/api/protected', compruebaToken ,(req,res)=>{
    jwt.verify(req.token, 'miclavesecreta', (err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                text: 'protected',
                data
            })
        }
    })
});

function compruebaToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
};

app.listen(3000,()=>{
    console.log('server on port 3000');
});
