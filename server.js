const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
const bodyParser = require('body-parser')

// import Items object from items.js
const Items = require('./models/items')

// string we get from MongoDB - we hide our username and password in our .env file
const connectionString = `mongodb+srv://${process.env.MONGOOSENAME}:${process.env.MONGOOSEPASSWORD}@mongobdtest.vsef73t.mongodb.net/Product_Store?retryWrites=true&w=majority`

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
// function will activate once to let us know we are connected
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.post('/create_items', async (req,res) => {

    const {image: image, priceNumber: price, inventoryNumber: inventory, name: name} = req.body;

    // Model methods usually give us a promise, so we can wait for the response
    let returnedValue = await Items.create({
        image,
        price,
        inventory,
        name
    });


    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);
})

app.get('/get_data', async (req, res) => {
    // get data from database
    let response = await Items.find({});
    console.log(response);
    // send it back to front end
    res.json(response)

})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})
