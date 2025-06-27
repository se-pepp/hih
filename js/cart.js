const cupcakes = [
  { id: 1, name: "Vanilla Dream", price: 2.5 },
  { id: 2, name: "Chocolate Blast", price: 3.0 },
  { id: 3, name: "Strawberry Sweet", price: 3.5 },
];

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (!cartCountEl) return;
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = total;
}

function renderCartItems() {
  const cartItemsSection = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('empty-message');
  const checkoutSection = document.getElementById('checkout-section');
  if (!cartItemsSection || !emptyMessage || !checkoutSection) return;

  const cart = getCart();
  if (cart.length === 0) {
    cartItemsSection.innerHTML = '';
    emptyMessage.style.display = 'block';
    checkoutSection.style.display = 'none';
    return;
  }

  emptyMessage.style.display = 'none';
  checkoutSection.style.display = 'block';

  let html = '';
  let totalPrice = 0;

  cart.forEach(({ id, qty }) => {
    const cupcake = cupcakes.find(c => c.id === id);
    if (!cupcake) return;
    const subtotal = cupcake.price * qty;
    totalPrice += subtotal;

    html += `
      <div class="cart-item">
        <img src="images/${cupcake.name.toLowerCase().replace(/ /g, '-')}.jpg" alt="${cupcake.name}" />
        <div class="cart-item-info">
          <h3>${cupcake.name}</h3>
          <p>Price: £${cupcake.price.toFixed(2)}</p>
          <p>Quantity: ${qty}</p>
          <p>Subtotal: £${subtotal.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <button onclick="changeQuantity(${id}, 1)">+</button>
          <button onclick="changeQuantity(${id}, -1)">-</button>
          <button onclick="removeItem(${id})">Remove</button>
        </div>
      </div>
    `;
  });

  html += `<h3>Total Price: £${totalPrice.toFixed(2)}</h3>`;

  cartItemsSection.innerHTML = html;
}

function changeQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeItem(id);
  } else {
    saveCart(cart);
  }
}

function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCartItems();

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Order placed! Thank you.');
      localStorage.removeItem('cart');
      updateCartCount();
      renderCartItems();
      checkoutForm.reset();
      document.getElementById('order-message').textContent = 'Your order has been placed successfully!';
    });
  }
});
