const cupcakes = [
  { id: 1, name: "Vanilla Dream", price: 2.5 },
  { id: 2, name: "Chocolate Blast", price: 3.0 },
  { id: 3, name: "Strawberry Sweet", price: 3.5 },
];

// Cart functions
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  saveCart(cart);
  alert('Added to cart!');
}

function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (!cartCountEl) return;
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = total;
}

// Contact form submission (dummy)
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const messageEl = document.getElementById('contact-message');
      messageEl.textContent = 'Thank you for your message! We will get back to you soon.';
      contactForm.reset();
    });
  }
});
