import { API_URL, createCard } from './main.js';

const container = document.querySelector('#liked-cards');
async function loadLikedProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    const likedProducts = products.filter(product => product.liked === true);
    renderLikedCards(likedProducts);
  } catch (error) {
    console.error('Xatolik:', error);
  }
}

function renderLikedCards(data) {
  container.innerHTML = ''; 
  if (data.length === 0) {
    container.innerHTML = `<p class="text-xl text-center font-bold text-gray-400">Sizga yoqqanini qoʻshing <br> Malumot yoq </p>`;
  } else {
    data.forEach(item => {
      const card = createCard(item); 
      container.appendChild(card);
    });

    addLikeListeners();
    addCartListeners(); 
  }
}

function addLikeListeners() {
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const isLiked = btn.getAttribute('data-liked') === 'true';
      const newLikeStatus = !isLiked;

      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ liked: newLikeStatus }),
        });

        loadLikedProducts(); 
      } catch (err) {
        console.error('Like yangilashda xatolik:', err);
      }
    });
  });
}

function addCartListeners() {
  const cartButtons = document.querySelectorAll('.add-to-cart');
  cartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const product = JSON.parse(btn.getAttribute('data-product'));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1; 
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });
}

loadLikedProducts();
