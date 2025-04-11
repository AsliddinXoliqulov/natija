const cartWrapper = document.getElementById('korzinka-wrapper');
const totalPriceEl = document.getElementById('jami-narx');
const totalOldPriceEl = document.getElementById('old-narx');
const totalDiscountEl = document.getElementById('tejam');

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    cartWrapper.innerHTML = '<p class="text-center font-bold text-gray-400">NO DATA</p>';
    return;
  }

  cartWrapper.innerHTML = '';

  let jami = 0;
  let eskiNarxJami = 0;

  cart.forEach(item => {
    if (!item.quantity) {
      item.quantity = 1; 
      localStorage.setItem('cart', JSON.stringify(cart)); 
    }

    
    const itemTotal = item.Price * item.quantity;
    const itemOldTotal = item.oldprice * item.quantity;
    jami += itemTotal;
    eskiNarxJami += itemOldTotal;

    const card = document.createElement('div');
    card.className = 'flex justify-between items-center border-b py-4';
    card.innerHTML = `
      <div class="flex items-center gap-4 w-full">
        <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded"/>
        <div class="flex-1">
          <div class="font-semibold">${item.tetle}</div>
          <div class="text-xs text-gray-500 ">Sotuvchi: Uzum_Market</div>
          <div class="flex items-center gap-2 mt-2">
            <button class="minus bg-gray-200 px-2 rounded" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="plus bg-gray-200 px-2 rounded" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="flex flex-col-reverse items-end">
        <div class="text-right">
          <div class="text-lg font-semibold">${itemTotal.toLocaleString()} so'm</div>
          <div class="line-through text-sm text-gray-400">${itemOldTotal.toLocaleString()} so'm</div>
        </div>
        <button class="delete-item text-red-500 ml-4 flex items-center gap-1" data-id="${item.id}">
          <i class='bx bx-trash text-xl'></i>Dalete <!-- Trash icon -->
        </button>
        </div>
      </div>
    `;
    cartWrapper.appendChild(card);
  });

  totalPriceEl.textContent = jami.toLocaleString() + " so'm";
  totalOldPriceEl.textContent = eskiNarxJami.toLocaleString() + " so'm";
  totalDiscountEl.textContent = (eskiNarxJami - jami).toLocaleString() + " so'm";

  attachCartEvents();
}

function attachCartEvents() {
  const plusBtns = document.querySelectorAll('.plus');
  const minusBtns = document.querySelectorAll('.minus');
  const deleteBtns = document.querySelectorAll('.delete-item');

  plusBtns.forEach(btn => {
    btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
  });

  minusBtns.forEach(btn => {
    btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
  });

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', () => deleteItem(btn.dataset.id));
  });
}

function updateQuantity(id, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); 
  }
}
function deleteItem(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart)); 
  renderCart(); 
}

document.addEventListener('DOMContentLoaded', renderCart);
