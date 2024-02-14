const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname,'./data/orders.txt');

module.exports.generateOrders = () => {
    const orders = [
        {
            id: 1,
            createdTime: "2020-01-01 10:00:00",
            products: [
                {
                    id: 1,
                    name: "Laptop",
                    price: 1000,
                    image: "/public/images/laptop.jpg",
                    quantity: 1
                },
                {
                    id: 2,
                    name: "Mobile",
                    price: 500,
                    image: "/public/images/mobile.jpg",
                    quantity: 2
                }],
                totalPrice: 2000,
                customerId: 1

        },
        {
            id: 2,
            createdTime: "2020-01-02 10:00:00",
            products: [
                {
                    id: 1,
                    name: "Laptop",
                    price: 1000,
                    image: "/public/images/laptop.jpg",
                    quantity: 2
                },
                {
                    id: 2,
                    name: "Mobile",
                    price: 500,
                    image: "/public/images/mobile.jpg",
                    quantity: 1
                },
                {
                    id: 3,
                    name: "Tablet",
                    price: 300,
                    image: "/public/images/tablet.jpg",
                    quantity: 1
                }],
                totalPrice: 2800,
                customerId: 2
        }


    ];
    if (this.getAllOrders().length === 0)
        orders.forEach(order => this.add(order));


}



module.exports.getAllOrders = () => {
    try {
        const data = fs.readFileSync(fileName);
        return JSON.parse(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getOrderById = (id) => {

    const order = this.getAllOrders().find(p => p.id === id);
    if (!order) {
        throw new Error("Order not found");
    }
    return order;

}



module.exports.add = (order) => {
    if (!order.createdTime || !order.products || !order.products.length === 0 || !order.totalPrice) {
        throw new Error("All order information is required");
    }

    try {
        const orders = this.getAllOrders();
        if (orders.length === 0) {
            order.id = 1;
        } else {
            const ids = orders.map(c => c.id);
            const id = Math.max(...ids) + 1;
            order.id = id;
        }
        orders.push(order);
        fs.writeFileSync(fileName, JSON.stringify(orders));
        return order;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.update = (id, updatedOrder) => {

    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(p => p.id === id);
    if (orderIndex === -1) {
        throw new Error("Order not found");
    }
    updatedOrder.id = id;
    orders.splice(orderIndex, 1, updatedOrder);
    fs.writeFileSync(fileName, JSON.stringify(orders));
    return updatedOrder;
}

module.exports.delete = (id) => {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(p => p.id === id);
    if (orderIndex === -1) {
        throw new Error("Order not found");
    }
    orders.splice(orderIndex, 1);
    fs.writeFileSync(fileName, JSON.stringify(orders));
}