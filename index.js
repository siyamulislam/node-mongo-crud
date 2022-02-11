const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const port = 3000
const userName = "SiyamIDT"
const password = 's6HoINYtsmTDvhca'
const { MongoClient, ObjectId } = require('mongodb');
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

client.connect(err => {
    const collection = client.db("organicDB").collection("products");

    app.post('/addProduct', (req, res) => {
        const product = req.body;
        console.log(product);
        collection.insertOne(product)
            .then(result => {
                console.log("inserted");
                res.send("Success");
            });
    })

    app.get('/products', (req, res) => {
        collection.find({}).limit(30).toArray((err, document) => {
            // console.log(document);
            res.send(document);
        })
    })
    app.get('/product/:id', (req, res) => {
        collection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, document) => {
                res.send(document[0])
            })
    })
    app.patch('/update/:id', (req, res) => {
        collection.updateOne(
            { _id: ObjectId(req.params.id) },
            {$set: {
                name:req.body.name,
                price:req.body.price,
                quantity:req.body.quantity
            }} )
        .then(result=>{
            console.log(result)
            if(result.modifiedCount=1){
                console.log('updated by API');
                // req.send('/products')
            }
        }) 
    })

    app.delete('/delete/:id', (req, res) => {
        console.log(req.params.id);

        collection.deleteOne({ _id: ObjectId(req.params.id) }
       
        
        )
            .then(result => {
                console.log("deleted from api")
                // console.log(result)
                //   res.send("Success")
            });
    })



    console.log('db connected');
    // client.close()
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.listen(port);

