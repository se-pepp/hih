function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function clearCart() {
  localStorage.removeItem('cart');
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = '0';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('order-form');
  const messageDiv = document.getElementById('order-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Simple validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const date = form['pickup-date'].value;

    if (!name || !email || !date) {
      alert('Please fill all fields.');
      return;
    }

    // Here you could send data to server via fetch/AJAX, but we just simulate success

    messageDiv.textContent = `Thank you, ${name}! Your order has been received and will be ready for pickup on ${date}.`;

    clearCart();
    form.reset();
  });
});
