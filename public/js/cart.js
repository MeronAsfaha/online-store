const cart = document.getElementById("cart");
const checkoutButton = document.getElementById("checkout-button");
const logout = document.getElementById("logout");
const cartnav = document.getElementById("cart-nav");
cartnav.classList.add("active");

const storedCart = localStorage.getItem(
  "cart-" + JSON.parse(localStorage.getItem("customer")).username
);
if (!storedCart || JSON.parse(storedCart).length == 0) {
  cart.innerHTML = "<h1>Cart is empty</h1>";
  checkoutButton.disabled = true;
} else {
  const cartItems = JSON.parse(storedCart);

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <div >
                <img class="cart-item-image" src="${item.image}" alt="">
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-from-cart" onclick="removeFromCart(${item.id})">Remove from Cart</button>
            </div>
        </div>
            `;
    cart.appendChild(cartItem);
  });
  const totalElement = document.createElement("h1");
  totalElement.innerText = `Total: ${total}`;
  cart.appendChild(totalElement);
}

function removeFromCart(id) {
  let username = JSON.parse(localStorage.getItem("customer")).username;
  const cartItems = JSON.parse(localStorage.getItem("cart-" + username));
  const filteredCart = cartItems.filter((item) => item.id != id);
  localStorage.setItem("cart-" + username, JSON.stringify(filteredCart));
  alert("Item removed from cart");
  location.reload();
}

checkoutButton.onclick = (e) => {
  e.preventDefault();
  const products = JSON.parse(
    localStorage.getItem(
      "cart-" + JSON.parse(localStorage.getItem("customer")).username
    )
  );

  const totalPrice = products.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const createdTime = new Date().toString();

  fetch("http://localhost:1001/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      products,
      totalPrice,
      createdTime,
      customerId: JSON.parse(localStorage.getItem("customer")).id,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data);
      alert("Checkout successful");
      localStorage.removeItem(
        "cart-" + JSON.parse(localStorage.getItem("customer")).username
      );
      location.reload();
    })
    .catch((error) => console.log(error.message));
};

logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("customer");
  window.location.href = "/views/login.html";
});
