const express = require('express');
const orderService = require('../service/OrderService');
const OrderRoutes = express.Router();

OrderRoutes.get("", (req,res) => {
    res.status(200).json(orderService.getAllOrders());
})

OrderRoutes.get("/:id", (req,res) => {
    try {
        res.status(200).json(orderService.getOrderById(req.params.id));
    } catch (error) {
        res.status(404).send(error.message);
    }
})

OrderRoutes.post("", (req,res) => {
    try {
        res.status(201).json(orderService.addOrder(req.body));
    } catch (error) {
        res.status(500).send(error.message);
    }
})

OrderRoutes.put("/:id", (req,res) => {
    try{
        res.status(200).json(orderService.updateOrder(req.params.id, req.body));
    }catch(error){
        res.status(500).send(error.message);
    }
})

OrderRoutes.delete("/:id", (req,res) => {
    try {
        orderService.deleteOrder(req.params.id);
        res.sendStatus(200);
    } catch (error) {
       res.status(500).send(error.message); 
    }
})

module.exports = OrderRoutes;