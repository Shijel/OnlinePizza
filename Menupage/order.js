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
  } else {
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
    tableHeaders.innerHTML =
      "<th>Item Name</th><th>Quantity</th><th>Total</th>";
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
    orderDoneButton.addEventListener("click", () => {
      location.reload(); // Reload the page to reset it
    });

    // Append the "Print" button to the receipt
    const printButton = document.createElement("button");
    printButton.textContent = "Print";
    receiptDiv.appendChild(printButton);

    // Add a click event listener to the "Print" button to print the receipt
    printButton.addEventListener("click", () => {
      const printWindow = window.open("", "", "width=600,height=600");
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
