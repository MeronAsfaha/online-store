const products = document.getElementById("products");
const logout = document.getElementById("logout");
const productsnav = document.getElementById("products-nav");
productsnav.classList.add("active");


const customerName = document.getElementById('name');
const username = document.getElementById('username');
const phone = document.getElementById('phone');

fetch("http://localhost:1001/products", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <div class="product">
        <div class="product-image">
            <img src="${product.image}" alt="">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
            <label for="quantity">Quantity:</label>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    </div>
        `;
      products.appendChild(productCard);
    });
  })
  .catch((error) => console.log(error.message));

function addToCart(id) {
  const quantity = prompt("Enter quantity",1)
console.log(quantity);
  fetch("http://localhost:1001/products/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((fetchedItem) => {
      let cart = [];
      let username = JSON.parse(localStorage.getItem("customer")).username;
      localStorage.getItem("cart-" + username)
        ? (cart = JSON.parse(localStorage.getItem("cart-"+username)))
        : (cart = []);
      const product = cart.find((item) => item.id == id);
      if (product) {
        product.quantity = parseInt(product.quantity) + parseInt(quantity);
        localStorage.setItem("cart-"+username, JSON.stringify(cart));
      } else {
        fetchedItem.quantity = parseInt(quantity);
        cart.push(fetchedItem);
        localStorage.setItem("cart-"+username, JSON.stringify(cart));
      }

      alert(`${quantity} ${fetchedItem.name}/s added to cart`);
    })
    .catch((error) => console.log(error.message));
}

function getQuantity(){
  const quantity = document.getElementById("quantity").value;
  return quantity;
}


if(!localStorage.getItem('customer')){
    window.location.href = "/views/login.html";
}
const customer = JSON.parse(localStorage.getItem('customer'));

customerName.innerHTML = customer.name;
username.innerHTML = customer.username;
phone.innerHTML = customer.phone;


logout.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('customer');
  window.location.href = "/views/login.html";
});