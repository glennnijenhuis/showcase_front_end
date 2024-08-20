import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { getCookie, setCookie } from './cookieUtils.js';
import { generateCaptcha, checkFormValidity } from './captchaUtils.js';

// Check if the cookie exists and show the GDPR modal if needed
window.addEventListener('load', function () {
  const consent = getCookie('cookieConsent');
  if (!consent) {
    const myModal = new bootstrap.Modal(document.getElementById('gdprModal'));
    myModal.show();
  }
});

// Handle 'Accept Cookies' button click
document.addEventListener('DOMContentLoaded', () => {
  const acceptCookiesBtn = document.getElementById('acceptCookies');
  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', function () {
      setCookie('cookieConsent', 'accepted', 365); // Cookie expires in 1 year
      const myModal = bootstrap.Modal.getInstance(document.getElementById('gdprModal'));
      if (myModal) {
        myModal.hide();
      }
    });
  }

  const declineCookiesBtn = document.getElementById('declineCookies');
  if (declineCookiesBtn) {
    declineCookiesBtn.addEventListener('click', function () {
      setCookie('cookieConsent', 'declined', 365); // Cookie expires in 1 year
      const myModal = bootstrap.Modal.getInstance(document.getElementById('gdprModal'));
      if (myModal) {
        myModal.hide();
      }
    });
  }

  // Generate CAPTCHA when the page loads
  generateCaptcha();

  // Add event listeners to form inputs for CAPTCHA
  const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
  inputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
  });

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    document.getElementById('submitBtn').setAttribute('disabled', 'disabled'); // Disable the submit button
    document.getElementById('submitBtn').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verzenden...`    ; // Change the submit button text
    const userAnswer = document.getElementById('captcha').value;
    const correctAnswer = document.getElementById('captchaAnswer').value;

    // CAPTCHA verification
    if (userAnswer != correctAnswer) {
        alert('CAPTCHA verification failed. Please try again.');
        return; // Stop further execution if CAPTCHA fails
    }

    // Assuming your form data is gathered here (you may need to adjust this based on your form structure)
    const formData = new FormData(this);

    // Example API call using fetch (replace with your actual API endpoint)
    fetch('your-api-endpoint', {
        method: 'POST',
        body: formData,
        // Include headers if necessary
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => {
        if (data.success) { // Check if the API call was successful
            // Close the modal
            const modalElement = document.getElementById('myModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        } else {
            // Handle API error
            alert('Submission failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during submission.');
    });
});

  // Initialize popovers
  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(popover => {
      new bootstrap.Popover(popover);
    });
});
