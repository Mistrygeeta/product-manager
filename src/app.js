const express = require("express");
const productModel = require("./models/product.model")
const app = express();

app.use(express.json())


app.post("/products", async(req, res)=>{
    try{
        const {name, price}= req.body;
        const product = new productModel({name, price})
        await product.save();
        res.status(201).json({
            message : "product created successfully",
            product
        })
    }catch(err){
        res.status(500).json({
        messagec: "error in creatig product",
        error: err.message
        })
    }
})

module.exports = app;