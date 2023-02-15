const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
// const bodyParser = require('body-parser')

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



// Create Product
app.post('/create_product', async (req,res) => {

    const {image: image, priceNumber: price, inventoryNumber: inventory, name: name, description: description, inStock: inStock} = req.body;

    // Model methods usually give us a promise, so we can wait for the response
    let returnedValue = await Items.create({
        image,
        price,
        inventory,
        name,
        description,
        inStock
    });


    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);
})


// All Product Info
app.get('/get_data', async (req, res) => {
    // get data from database
    let response = await Items.find({});
    console.log(response);
    // send it back to front end
    res.json(response)

})

// Specific Product
app.get('/get_specific_product/:product_id', async (req, res) => {
    let item = req.params.product_id;
    let response = await Items.findOne({_id: item})
    console.log(response);
    res.json(response)

})

// Search by name
app.get('/product_by_name/:productName', async (req, res) => {
    let item = req.params.productName;
    console.log(item);
    let response = await Items.findOne({name: item})
    console.log(response);
    res.json(response)
})

// Delete Path
app.delete("/delete_product/:productId", async (req, res) => {
    let id = req.params.productId;
    
    let response = await Items.findByIdAndDelete(id);
    console.log(response);
 
    res.send({data: `deleted ${response.deletedCount} items.`})
 })

 // Update Product
 app.put('/update_product/:product_id', async (req, res) => {
    let item = req.params.product_id;
    console.log("Here Now");
    let response = await Items.findByIdAndUpdate({ _id: item },
      {name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.priceNumber,
        inventory: req.body.inventoryNumber,
        inStock: req.body.inStock},
       {new: true} 
    );
    console.log("response from collection: ", response);
    res.json(response);
  });
 
  // Buy function
 app.put('/buy_product/:product_id', async (req, res) => {
    let id = req.params.product_id;
    console.log("Purchase ready");
    console.log(req.body);
    let response = await Items.findByIdAndUpdate(id,
      {
        inventory: req.body.newNumber,
        inStock: req.body.inStock
    },
       {new: true} 
    );
    console.log("response from collection: ", response);
    res.json(response);
   
  });

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})
