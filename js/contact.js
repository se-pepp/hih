document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const messageBox = document.getElementById('contact-message-box');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form['contact-name'].value.trim();
    const email = form['contact-email'].value.trim();
    const message = form['contact-message'].value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulate sending message
    messageBox.textContent = `Thanks for reaching out, ${name}! We will get back to you soon.`;

    form.reset();
  });
});
