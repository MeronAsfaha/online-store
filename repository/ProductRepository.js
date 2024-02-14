const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname, './data/products.txt');


module.exports.generateProducts = () => {
    const Products = [
        {
            id: 1,
            name: "Laptop",
            price: 1000,
            image: "/images/laptop.jpg",
          
        },
        {
            id: 2,
            name: "Mobile",
            price: 500,
            image: "/images/mobile.jpg"
        },
        {
            id: 3,
            name: "Tablet",
            price: 300,
            image: "/images/tablet.png"
        },
        {
            id: 4,
            name: "Headphone",
            price: 100,
            image: "/images/headphones.jpg"
        },
        {
            id: 5,
            name: "Watch",
            price: 200,
            image: "/images/watch.jpg"
        },
        {
            id: 6,
            name: "Camera",
            price: 500,
            image: "/images/camera.jpg"
        },
        {
            id: 7,
            name: "Television",
            price: 1000,
            image: "/images/tv.png"
        },
        {
            id: 8,
            name: "Printer",
            price: 300,
            image: "/images/printer.jpg"
        },
        {
            id: 9,
            name: "Speaker",
            price: 200,
            image: "/images/speaker.jpg"
        },
        {
            id: 10,
            name: "Hard Drive",
            price: 100,
            image: "/images/harddrive.jpg"
        }
    ];
    if (this.getAllProducts().length === 0)
        Products.forEach(product => this.add(product));


}



module.exports.getAllProducts = () => {
    try {
        const data = fs.readFileSync(fileName);
        return JSON.parse(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getProductById = (id) => {

    const product = this.getAllProducts().find(p => p.id === id);
    if (!product) {
        throw new Error("product not found");
    }
    return product;

}



module.exports.add = (product) => {
    if (!product.name || !product.price || !product.image) {
        throw new Error("All product information is required");
    }

    try {
        const products = this.getAllProducts();
        if (products.length === 0) {
            product.id = 1;
        } else {
            const ids = products.map(c => c.id);
            const id = Math.max(...ids) + 1;
            product.id = id;
        }
        products.push(product);
        fs.writeFileSync(fileName, JSON.stringify(products));
        return product;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.update = (id, updatedProduct) => {

    const products = this.getAllProducts();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        throw new Error("Product not found");
    }
    updatedProduct.id = id;
    products.splice(productIndex, 1, updatedProduct);
    fs.writeFileSync(fileName, JSON.stringify(products));
    return updatedProduct;
}

module.exports.delete = (id) => {
    const products = this.getAllProducts();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        throw new Error("Product not found");
    }
    products.splice(productIndex, 1);
    fs.writeFileSync(fileName, JSON.stringify(products));
}