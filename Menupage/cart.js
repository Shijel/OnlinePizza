let cartlist = document.getElementById("cart-container");
let billing = document.getElementById("billing");
const Cart = document.getElementById("cart-icon");
const Close = document.getElementById("closebtn");
const checkout = document.getElementById("checkout");
const cancelbtn = document.getElementById("cancelbtn");

// Click the cart icon to collapse the cartlist
Cart.addEventListener("click", function () {
  cartlist.classList.add("popcart");
});
// Use ESC button on keyboard to close the cartlist
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    cartlist.classList.remove("popcart");
    billing.classList.remove("pop-billing");
  }
});

Close.addEventListener("click", function () {
  cartlist.classList.remove("popcart");
});

checkout.addEventListener("click", function () {
  billing.classList.add("pop-billing");
});
cancelbtn.addEventListener("click", function () {
  billing.classList.remove("pop-billing");
});

const menuItems = document.querySelectorAll(".menu-item");
const cartContainer = document.getElementById("cart-container");
const cartItemsList = document.getElementById("cart-items");
const totalAmountElement = document.getElementById("total-amount");
const cartItemCount = document.getElementById("cart-item-count");

let totalAmount = 0; // Initialize the total amount
let itemCount = 0; // Initialize  Cart Item Qty
const emptyCartMessage = document.getElementById("empty-cart-message");

menuItems.forEach((menuItem) => {
  const addToCartButton = menuItem.querySelector(".add-to-cart");
  addToCartButton.addEventListener("click", () => {
    addToCart(menuItem);
  });
});

function addToCart(menuItem) {
  const name = menuItem.getAttribute("data-name");
  const price = parseFloat(menuItem.getAttribute("data-price"));

  // alert("added to cart!");
  // Check if the item is already in the cart
  const existingCartItem = cartItemsList.querySelector(`[data-name="${name}"]`);
  if (existingCartItem) {
    // If it exists, increment the quantity and update the price
    const quantityElement = existingCartItem.querySelector(".quantity");
    const quantity = parseInt(quantityElement.textContent);
    const newQuantity = quantity + 1;
    quantityElement.textContent = newQuantity;
    const totalPriceElement = existingCartItem.querySelector(".total-price");
    const total = price * newQuantity;
    totalPriceElement.textContent = `${total.toFixed(2)}`;
  } else {
    // If it's a new item, add it to the cart
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-name", name);
    cartItem.innerHTML = `
            <img src="${menuItem
              .querySelector("img")
              .getAttribute("src")}" alt="${name}">
            <span>${name}"</span>
            <span class="quantity">1</span>
            <span class="total-price">₱${price.toFixed(2)}</span>
            <button class="remove-from-cart">Remove</button>
        `;
    cartItemsList.appendChild(cartItem);
    itemCount += 1;
    cartItemCount.textContent = itemCount;

    function updateCartItemCountOnRemove() {
      itemCount -= 1;
      itemCount = Math.max(0, itemCount);
      cartItemCount.textContent = itemCount;
    }
    const removeFromCartButton = cartItem.querySelector(".remove-from-cart");
    removeFromCartButton.addEventListener("click", () => {
      // When an item is removed, update the total amount
      cartItemsList.removeChild(cartItem);
      const total =
        price * parseInt(cartItem.querySelector(".quantity").textContent);
      totalAmount -= total;
      totalAmountElement.textContent = `${totalAmount.toFixed(2)}`;
      updateCartItemCountOnRemove();
      if (cartItemsList.children.length === 1) {
        // 1 is for the "Your cart is empty" message
        document.getElementById("empty-cart-message").style.display = "block";
      }
    });
  }

  // Update the total amount when adding an item to the cart
  totalAmount += price;
  totalAmountElement.textContent = `₱${totalAmount.toFixed(2)}`;

  // Show the cart container
  cartContainer.style.display = "block";

  // Remove the empty cart image if the cart has item
  if (itemCount === 0) {
    emptyCartMessage.style.display = "none";
  } else {
    emptyCartMessage.style.display = "block";
  }
  // Show the empty cart list again if item remove from cart
  document.getElementById("empty-cart-message").style.display = "none";
}
