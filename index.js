const express = require('express');
const cors = require('cors');
const port = 3000
const userName = "SiyamIDT"
const password = 's6HoINYtsmTDvhca'
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://SiyamIDT:s6HoINYtsmTDvhca@cluster0.7oely.mongodb.net/organicDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();


client.connect(err => {
    const collection = client.db("organicDB").collection("products");
    // perform actions on the collection object
       //  addProduct(collection)

    
   const product= {name:'modhu',quantity:87,price:980}
   collection.insertOne( product )
   .then(result=> console.log("inserted"))
    
    console.log('db connected');
      client.close()
});
async function addProduct(collection){
    const doc = { name: "Neapolitan pizza", shape: "round" };
    const result = await collection.insertOne(doc)
    .then(result=>{
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`,
         ); 
    })
        
}
app.get('/', (req, res) => {
    res.send('hello I am work')
})
app.listen(port);

