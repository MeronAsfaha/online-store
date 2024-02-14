const productRepository = require('../repository/ProductRepository');

module.exports.getAllProducts = () => {
    return productRepository.getAllProducts();
}

module.exports.getProductById = (id) => {
    id = parseInt(id);
    return productRepository.getProductById(id);
}

module.exports.addProduct = (product) => {
    return productRepository.add(product);
}

module.exports.updateProduct = (id,product) => {
    id = parseInt(id);
    return productRepository.update(id,product);
}

module.exports.deleteProduct = (id) => {
    id = parseInt(id);
    return productRepository.delete(id);
}