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

const restoreCart = JSON.parse(sessionStorage.getItem("cart") || "[]")
const cartList = new Map(restoreCart)

const saveCart = () => {
	const cartEntries  = [...cartList];
	sessionStorage.setItem("cart",JSON.stringify(cartEntries ))
}

cartClearBtn.addEventListener("click", clearCart)
productList.addEventListener("click", (e) => {
	e.target.matches("button") && addToCart(e.target.dataset.id-1)
});


// Render cart list
function renderCart() {
	cart.innerHTML = "";
	for(const [id, product] of cartList){
		 const li = document.createElement("li");
		li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${id}" onclick="removeFromCart(${id})">Remove to Cart</button>`;
		cart.appendChild(li)
	}
}

// Add item to cart
function addToCart(productId) {
	cartList.set(productId, products[productId])
	saveCart()
	renderCart()
}

// Remove item from cart
function removeFromCart(productId) {
	cartList.delete(+productId)
	saveCart()
	renderCart()
}

// Clear cart
function clearCart() {
	cartList.clear()
	saveCart()
	renderCart()
}

// Initial render
renderProducts();
renderCart();
