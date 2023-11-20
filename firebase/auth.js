import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initApp } from "./config";

initApp();
export const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.localStorage.setItem("user", user.email);
  } else {
    window.localStorage.removeItem("user");
  }
});

export const getUser = () => window.localStorage.getItem("user");

export const logOut = () => {
  signOut(auth);

  window.location.replace("../index.html");
};
