import { getUser, logOut } from "../firebase/auth";

const loginButton = document.querySelector(".login-button");
const logoutButton = document.querySelector(".logout-button");
const userDiv = document.querySelector(".user");

const user = getUser();

if (getUser()) {
  logoutButton.classList.remove("hidden");
  loginButton.classList.add("hidden");

  if (userDiv) {
    userDiv.classList.remove("hidden");
    userDiv.querySelector("span").textContent = user;
  }

  logoutButton.addEventListener("click", (e) => {
    logOut();
  });
} else {
  loginButton.classList.remove("hidden");
  logoutButton.classList.add("hidden");

  if (userDiv) userDiv.classList.add("hidden");
}
