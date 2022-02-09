const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const port = 3000
const userName = "SiyamIDT"
const password = 's6HoINYtsmTDvhca'
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://SiyamIDT:s6HoINYtsmTDvhca@cluster0.7oely.mongodb.net/organicDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// //console.log(client);
// client.connect(err => {
//     const collection = client.db("organicDB").collection("products");
//     // perform actions on the collection object
//     //  addProduct(collection)

//     //    const product= {name:'modhu',quantity:87,price:980}
//     //    collection.insertOne( product )
//      console.log(err);

//     console.log('db connected');
//     client.close()
// });
app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log(product);
    client.connect(err => {
        const collection = client.db("organicDB").collection("products");
      
           collection.insertOne( product )
           .then(result=> {
            console.log("inserted")
            res.send("Success")
           })
    
        console.log('db connected');
        // client.close()
    });

})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.listen(port);

