

let cartlist = document.getElementById("cart-container")
let billing = document.getElementById("billing")
const Cart = document.getElementById("cart-icon")
const Close = document.getElementById("closebtn")
const checkout = document.getElementById("checkout")
const cancelbtn = document.getElementById("cancelbtn")


// Click the cart icon to collapse the cartlist
Cart.addEventListener("click", function () {
    cartlist.classList.add("popcart");

})
// Use ESC button on keyboard to close the cartlist
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        cartlist.classList.remove("popcart");
        billing.classList.remove("pop-billing");
    }
})

Close.addEventListener("click", function () {
    cartlist.classList.remove("popcart");
})

checkout.addEventListener("click", function () {
    billing.classList.add("pop-billing");
})
cancelbtn.addEventListener("click", function () {
    billing.classList.remove("pop-billing");
})



const searchInput = document.getElementById("search");
const menuItems = document.querySelectorAll(".menu-item");
const cartContainer = document.getElementById("cart-container");
const cartItemsList = document.getElementById("cart-items");
const totalAmountElement = document.getElementById("total-amount");
const cartItemCount = document.getElementById("cart-item-count");

let totalAmount = 0; // Initialize the total amount
let itemCount = 0;// Initialize  Cart Item Qty
const emptyCartMessage = document.getElementById("empty-cart-message");

menuItems.forEach((menuItem) => {
    const addToCartButton = menuItem.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
        addToCart(menuItem);

    });
});

searchInput.addEventListener("input", () => {
    filterItems(searchInput.value.toLowerCase());
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
            <img src="${menuItem.querySelector('img').getAttribute('src')}" alt="${name}">
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
            const total = price * parseInt(cartItem.querySelector(".quantity").textContent);
            totalAmount -= total;
            totalAmountElement.textContent = `${totalAmount.toFixed(2)}`;
            updateCartItemCountOnRemove();
            if (cartItemsList.children.length === 1) { // 1 is for the "Your cart is empty" message
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


// Search Bar Function
function filterItems(query) {
    menuItems.forEach((menuItem) => {
        const name = menuItem.getAttribute("data-name").toLowerCase();
        if (name.includes(query)) {
            menuItem.style.display = "inline-block";

        } else {
            menuItem.style.display = "none";
        }
    });
}





// // Event listener for submitting the order
const submitOrderButton = document.querySelector("#submit-order");
submitOrderButton.addEventListener("click", () => {

    // Get billing information
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const address = document.querySelector("#address").value;

    // Validate billing information
    if (!name || !email || !phone || !address) {
        alert("Please fill out all billing information.");
        return;
    }
    else {
      
            // Create a receipt div
            const receiptDiv = document.createElement("div");
            receiptDiv.classList.add("receipt");
            receiptDiv.classList.add("pop-receipt");
            // Get user input values
            const name = document.querySelector("#name").value;
            const email = document.querySelector("#email").value;
            const phone = document.querySelector("#phone").value;
            const address = document.querySelector("#address").value;

            // Create a receipt header with user information
            const receiptHeader = document.createElement("div");
            receiptHeader.classList.add("receipt-header");
            receiptHeader.innerHTML = `
              <center> <h1>Thanks for Ordering!</h1></center>
                <h2>Receipt</h2>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Address: ${address}</p>
                <br>
            `;
            receiptDiv.appendChild(receiptHeader);

            // Create a table for cart items
            const receiptTable = document.createElement("table");
            receiptTable.classList.add("receipt-table");

            // Create table headers
            const tableHeaders = document.createElement("tr");
            tableHeaders.innerHTML = "<th>Item Name</th><th>Quantity</th><th>Total</th>";
            receiptTable.appendChild(tableHeaders);

            // Iterate over cart items and add them to the receipt
            cartItemsList.querySelectorAll(".cart-item").forEach((cartItem) => {
                const itemName = cartItem.getAttribute("data-name");
                const quantity = cartItem.querySelector(".quantity").textContent;
                const total = cartItem.querySelector(".total-price").textContent;

                const row = document.createElement("tr");
                row.innerHTML = `<td>${itemName}"</td><td>${quantity}</td><td>${total}</td>`;
                receiptTable.appendChild(row);
            });

            receiptDiv.appendChild(receiptTable);

            // Calculate and display the total amount
            const totalAmountText = totalAmountElement.textContent;
            const totalRow = document.createElement("div");
            totalRow.classList.add("total-row");

            totalRow.innerHTML = `<p>Total Amount: ${totalAmountText}</p>`;
            receiptDiv.appendChild(totalRow);


            const orderDoneButton = document.createElement("button");
            orderDoneButton.textContent = "Done";
            receiptDiv.appendChild(orderDoneButton);

            // Add a click event listener to the "Order Done" button to reset the page
            orderDoneButton.addEventListener("click",() =>{
                location.reload(); // Reload the page to reset it
            });

            // Append the "Print" button to the receipt
            const printButton = document.createElement("button");
            printButton.textContent = "Print";
            receiptDiv.appendChild(printButton);


            // Add a click event listener to the "Print" button to print the receipt
            printButton.addEventListener("click", () => {
                const printWindow = window.open('', '', 'width=600,height=600');
                const receiptToPrint = document.createElement("div");
                receiptToPrint.classList.add("receipt");

                // Copy the content of the receiptDiv to the new element
                receiptToPrint.innerHTML = receiptDiv.innerHTML;

                // Remove the buttons from the clone
                receiptToPrint.querySelector("button").remove(); // Remove the "Order Done" button
                receiptToPrint.querySelector("button").remove(); // Remove the "Print" button

                printWindow.document.body.appendChild(receiptToPrint);
                printWindow.print();
                printWindow.close();
            });

            // Append the receipt to the document
            document.body.appendChild(receiptDiv);
    


        cartlist.style.display = "none";
        billing.style.display = "none";
    }

});



// Smooth Scrolling Effect
$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
});
