import { getUser } from "../firebase/auth";
import { initApp } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

initApp();
const auth = getAuth();

const registerForm = document.querySelector("form#Register");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = registerForm.querySelector("input[name='email']").value;
  const password = registerForm.querySelector("input[name='password']").value;

  const createdUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (createdUser.user) {
    // redirect to menu page
    window.localStorage.setItem("user", createdUser.user.email);
    window.location.replace("/Menupage/Menu.html");
  }
});

const loginForm = document.querySelector("form#Login");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.querySelector("input[name='email']").value;
  const password = loginForm.querySelector("input[name='password']").value;

  const signedInUser = await signInWithEmailAndPassword(auth, email, password);

  if (signedInUser.user) {
    // redirect to menu page
    window.localStorage.setItem("user", signedInUser.user.email);
    window.location.replace("/Menupage/Menu.html");
  }
});

if (getUser()) {
  window.location.replace("../index.html");
}
