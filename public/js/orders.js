const orders = document.getElementById("orders");
const ordersNav =document.getElementById("orders-nav");
ordersNav.classList.add("active");

fetch("http://localhost:1001/orders", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((data) => {
  
    data
      .filter(
        (order) =>
          order.customerId === JSON.parse(localStorage.getItem("customer")).id
      )
      .forEach((order) => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("order-card");
        orderCard.innerHTML = `
        <div class="order">
        <div class="order-info">
            <p>Created at: ${new Date(order.createdTime).toDateString()} , ${new Date(order.createdTime).getHours() }: ${new Date(order.createdTime).getMinutes()} </p>
            <p><strong>Order Total: $${order.totalPrice}</strong></p>
        </div>
    </div>
        `;
        const orderItems = document.createElement("div");
        orderItems.classList.add("order-items");
        order.products.forEach((item) => {
          const orderItem = document.createElement("div");
          orderItem.classList.add("order-item");
          orderItem.innerHTML = `
           
            <div class="order-item-info">
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            `;
          orderItems.appendChild(orderItem);
          orders.appendChild(orderCard);
          orders.appendChild(orderItems);
        });
      });
  })
  .catch((err) => {
    console.log(err);
  });
logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("customer");
  window.location.href = "/views/login.html";
});
