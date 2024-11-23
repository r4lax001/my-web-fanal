const form = document.querySelector('.contact-form form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const subject = form.querySelector('input[name="subject"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  // Perform client-side validation
  if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
    alert('Please fill in all the required fields.');
    return;
  }

  // Send the form data to the server
  // (You would need to implement the server-side code to handle the form submission)
  console.log('Submitting form data:', { name, email, subject, message });
  form.reset();
});