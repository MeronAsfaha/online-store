const express = require('express');
const CustomerRoutes = require('./controller/CustomerRoutes');
const ProductRoutes = require('./controller/ProductRoutes');
const OrderRoutes = require('./controller/OrderRoutes');
const {generateCustomers} = require("./repository/CustomerRepository");
const {generateProducts} = require("./repository/ProductRepository");
const {generateOrders} = require("./repository/OrderRepository");
const cors = require('cors');

const app = express();


//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
//static
app.use(express.static("public"));

//routes
app.use("/customers", CustomerRoutes);
app.use("/products", ProductRoutes);
app.use("/orders", OrderRoutes);

//error handler
app.use((err, req, res, next) => { 
    console.log(err);
    res.status(500).send(err.message);
})

//404 handler
app.use((req,res) => {
    res.status(404).send("Resource not found");
})


//server
app.listen(1001, () => {
    generateCustomers();
    generateProducts();
    generateOrders();
    console.log("Server started at port 1001");
})


