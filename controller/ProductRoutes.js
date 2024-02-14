const express = require('express');
const productService = require('../service/ProductService');
const ProductRoutes = express.Router();

ProductRoutes.get("", (req,res) => {
    res.status(200).json(productService.getAllProducts());
})

ProductRoutes.get("/:id", (req,res) => {
    try {
        res.status(200).json(productService.getProductById(req.params.id));
    } catch (error) {
        res.status(404).send(error.message);
    }
})

ProductRoutes.post("", (req,res) => {
    try {
        res.status(201).json(productService.addProduct(req.body));
    } catch (error) {
        res.status(500).send(error.message);
    }
})

ProductRoutes.put("/:id", (req,res) => {
    try{
        res.status(200).json(productService.updateProduct(req.params.id, req.body));
    }catch(error){
        res.status(500).send(error.message);
    }
})

ProductRoutes.delete("/:id", (req,res) => {
    try {
        productService.deleteProduct(req.params.id);
        res.sendStatus(200);
    } catch (error) {
       res.status(500).send(error.message); 
    }
})

module.exports = ProductRoutes;