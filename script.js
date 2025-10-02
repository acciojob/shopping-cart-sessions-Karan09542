// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

const cart = document.getElementById("cart-list");
const cartClearBtn = document.getElementById("clear-cart-btn");

const cartList = JSON.parse(sessionStorage.getItem("cart") || "[]")

const saveCart = () => {
	sessionStorage.setItem("cart",JSON.stringify(cartList))
}

cartClearBtn.addEventListener("click", clearCart)
productList.addEventListener("click", (e) => {
	e.target.matches("button") && addToCart(e.target.dataset.id-1)
});

// Render cart list
function renderCart() {
	cart.innerHTML = "";
	for(let i=0; i<cartList.length; i++){
		const {name, price} = cartList[i];
		const li = document.createElement("li");
		li.innerHTML = `${name} - $${price} <button class="add-to-cart-btn" data-id="${i}" onclick="removeFromCart(${i})">Remove to Cart</button>`;
		cart.appendChild(li)
	}
}

// Add item to cart
function addToCart(productId) {
	cartList.push(products[productId])
	saveCart()
	renderCart()
}
// Remove item from cart
function removeFromCart(productId) {
	cartList.splice(+productId,1)
	saveCart()
	renderCart()
}

// Clear cart
function clearCart() {
	cartList.length = 0
	saveCart()
	renderCart()
}

// Initial render
renderProducts();
renderCart();
