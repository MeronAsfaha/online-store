function Order(id, createdTime, products){
    this.id = id;
    this.createdTime = createdTime;
    this.products = products;
}

module.exports = Order;