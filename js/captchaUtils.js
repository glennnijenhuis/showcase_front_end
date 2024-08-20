// Function to generate a random arithmetic question
export function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';
    const captchaAnswer = operator === '+' ? num1 + num2 : num1 - num2;
  
    // Set the CAPTCHA question in the HTML
    document.getElementById('captchaQuestion').textContent = `${num1} ${operator} ${num2} = ?`;
    document.getElementById('captchaAnswer').value = captchaAnswer; // Store the answer in a hidden input
  }
  
  // Function to check form validity and CAPTCHA
  export function checkFormValidity() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const captchaInput = document.getElementById('captcha');
    const correctCaptchaAnswer = document.getElementById('captchaAnswer').value;
    // Check if all required fields are valid and CAPTCHA is correct
    if (form.checkValidity() && captchaInput.value === correctCaptchaAnswer) {
        console.log('valid');
        submitBtn.removeAttribute("disabled");

    } else {
        console.log('invalid');
        submitBtn.setAttribute("disabled", "disabled");

    }
  }
  