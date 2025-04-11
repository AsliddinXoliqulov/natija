export const API_URL = "https://67f57460913986b16fa4a14c.mockapi.io/imtihon2/Cards";

const container = document.querySelector('#cards');

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    renderCards(products);
  } catch (error) {
    console.error('Xatolik:', error);
  }
}

export function renderCards(data) {
  container.innerHTML = '';
  data.forEach(item => {
    const card = createCard(item);  
    container.appendChild(card);
  });

  addLikeListeners();
  addCartListeners();
}

export function createCard(item) {
  const card = document.createElement('div');
  card.className = 'w-60 rounded-xl border p-2 shadow-sm font-sans';

  card.innerHTML = `
    <div class="relative">
      <div class="overflow-hidden rounded-xl h-56">
        <img
          src="${item.image}"
          alt="${item.tetle}"
          class="rounded-xl w-full transition-transform duration-300 hover:scale-125"
        />
      </div>
      <button 
        class="like-btn absolute top-2 right-2 bg-white rounded-full p-1 shadow flex justify-center items-center" 
        data-id="${item.id}" 
        data-liked="${item.liked}">
        <i class="bx ${item.liked ? 'bxs-heart text-red-500' : 'bx-heart text-gray-700'} text-2xl hover:text-red-500 shadow-2xl"></i>
      </button>
    </div>

    <div class="flex gap-2 mt-2 h-5">
      ${item.aksiya ? `<span class="text-xs px-2 py-0.5 bg-pink-500 text-white rounded-full">Aksiya</span>` : ''}
      ${item.orginal ? `<span class="text-xs px-2 py-0.5 bg-indigo-900 text-white rounded-full">Original</span>` : ''}
    </div>

    <p class="text-sm mt-2 line-clamp-2 h-10">${item.tetle}</p>

    <div class="flex items-center text-xs text-gray-600 h-4 p-1 gap-2">
      <i class="bx bxs-star text-yellow-400 text-sm"></i>
      ${item.rating}
    </div>

    <div class="text-sm bg-yellow-100 text-yellow-800 inline-block px-2 py-0.5 mt-1 rounded">
      ${(item.Price / 12).toLocaleString()} so'm/oyiga
    </div>

    <div class="flex justify-between items-center">
      <div class="mt-1">
        <div class="line-through text-gray-400 text-sm">${item.oldprice.toLocaleString()} so'm</div>
        <div class="text-lg font-medium">${item.Price.toLocaleString()} so'm</div>
      </div>
      <div class="mt-2 flex justify-end">
        <button class="add-to-cart hover:bg-green-500 rounded-full active:bg-red-500" data-product='${JSON.stringify(item)}'>
          <i class="bx bx-basket text-xl p-3 rounded-full border"></i>
        </button>
      </div>
    </div>
  `;

  return card;
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

        loadProducts(); 
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

      const existingProductIndex = cart.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        product.quantity = 1; 
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });
}


loadProducts();
