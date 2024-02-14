const express = require('express');
const customerService = require("../service/CustomerService")
const CustomerRoutes = express.Router();


CustomerRoutes.get("", (req, res) => {
    res.status(200).json(customerService.getAllCustomers());
})

CustomerRoutes.post("/login", (req, res) => {
    try {
        const userDetails = req.body;
        const customer = customerService.login(userDetails);
        res.status(200).json(customer);
    } catch (error) {
        res.status(401).send(error.message);
    }
})

CustomerRoutes.post("/signup", (req, res) => {
    try {
        const newCustomer = req.body;
        customerService.signup(newCustomer);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = CustomerRoutes;