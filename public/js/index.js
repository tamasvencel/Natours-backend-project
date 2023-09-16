/* eslint-disable */ /*because it is configured for node.js */

import "@babel/polyfill";
import { login, logout } from "./login";
import { signup } from "./signup";
import { displayMap } from "./map";
import { updateData } from "./updateUserData";
import { bookTour } from "./stripe";
import { showAlert } from "./alerts";

// DOM ELEMENT
const loginForm = document.querySelector(".form--login");
const mapEl = document.getElementById("map");
const logOutBtn = document.querySelector(".nav__el--logout");
const signUpForm = document.querySelector(".form--signup");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const bookTourBtn = document.getElementById("book-tour");
const alertMessage = document.querySelector("body").dataset.alert;

// DELEGATION
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    e.preventDefault();
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    e.preventDefault();
    signup(name, email, password, passwordConfirm);
  });
}

if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateData(form, "data");
  });

if (userPasswordForm)
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".btn--save-password").textContent = "Updating...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    await updateData(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );

    document.querySelector(".btn--save-password").textContent = "Save password";

    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });

if (bookTourBtn)
  bookTourBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    // e.target is the element which was clicked
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (alertMessage) showAlert("success", alertMessage, 20);
