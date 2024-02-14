const orderRepository = require('../repository/OrderRepository');

module.exports.getAllOrders = () => {
    return orderRepository.getAllOrders();
}

module.exports.getOrderById = (id) => {
    id = parseInt(id);
    return orderRepository.getOrderById(id);
}

module.exports.addOrder = (order) => {
    return orderRepository.add(order);
}

module.exports.updateOrder = (id,order) => {
    id = parseInt(id);
    return orderRepository.update(id,order);
}

module.exports.deleteOrder = (id) => {
    id = parseInt(id);
    return orderRepository.delete(id);
}


