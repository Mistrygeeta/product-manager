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
        message: "error in creatig product",
        error: err.message
        })
    }
})


app.get("/products", async(req, res)=>{
    try{
        const product = await productModel.find()
        res.status(200).json({
            message: "product fetched successfully",
            product
        })
    }
    catch(err){
        res.status(500).json({
            message : "error fetching product",
            error : err.message
        })
    }
})


app.get("/products/:id", async(req, res)=>{
    try{
        const product = await productModel.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                message : "product not found"
            })

        }
        res.status(200).json(product)
    }
    catch (err){
        res.status(500).json({
            message : "error",
            error: err.message
        })
    }
})

app.delete("/products/:id",async(req, res)=>{
    try{
        const product = await productModel.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({
                message: "product not found"
            })
        }
       res.status(200).json({
        message : "product deleted successfully",
        product
       })

    }catch(err){
        res.status(500).json({
            message:"error deleting product",
            error: err.message
        })
    }
})

app.patch("/products/:id", async(req, res)=>{
    try{
        const id = req.params.id
        const{price}= req.body
        const product =await productModel.findByIdAndUpdate( id,{price})
        if(!product){
            return res.status(404).json({
                message: "product not found"
            })
        }
      res.status(200).json({
        message: "product updated successfully",
        product
      })
    }catch(err){
        res.status(500).json({
            message : "error upadting products",
            error: err.message
        })
    }
})
module.exports = app;