document.getElementById("menu").addEventListener("click", function () {
    const menu = document.getElementById("mobile");
    menu.classList.toggle("hidden");
  });

  import { API_URL } from "./main.js";
const likesCounter = document.querySelector('#likes');
const shopsCounter = document.querySelector('#shops');

export async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    updateCounters(products); 
  } catch (error) {
    console.error('Xatolik:', error);
  }
}

function updateCounters(products = []) {
  const likedCount = products.filter(product => product.liked).length;
  likesCounter.textContent = likedCount;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  shopsCounter.textContent = cart.length;
}

loadProducts();
