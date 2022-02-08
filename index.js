const express = require('express');
const cors = require('cors');
const port = 3000
 const userName="SiyamIDT"
 const password= '4Juc@nnXH7EKjm9'
 const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://SiyamIDT:nnXH7EKjm9@cluster0.7oely.mongodb.net/organicDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app=express();


client.connect(err => {
  const collection = client.db("organicDB").collection("products");
  // perform actions on the collection object
  console.log('connected');
  client.close();
});

app.get('/',(req,res)=>{
    res.send('hello I am work')
})
app.listen(port);

