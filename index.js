const express = require('express');
const cors = require('cors');
const port = 3000

const app=express();
app.get('/',(req,res)=>{
    res.send('hello I am work')
})
app.listen(port);
