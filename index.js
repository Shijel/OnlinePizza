import "./index.css";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://maczelapizza-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const pizzaDB = ref(database, "Pizza");
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const cartListEl = document.getElementById("cart-item");

// Pressing Enter key in Search bar
let input = document.querySelector("input");
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let inputValue = inputFieldEl.value;
    console.log(`${inputValue} added to database`);
    push(pizzaDB, inputValue);
    inputFieldEl.value = "";
    cartListEl.innerHTML += `<li>${inputValue}</li>`;
  }
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  console.log(`${inputValue} added to database`);
  push(pizzaDB, inputValue);
  inputFieldEl.value = "";

  cartListEl.innerHTML += `<li>${inputValue}</li>`;
});
