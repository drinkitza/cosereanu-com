document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');
            
            // Show loading state
            const submitButton = contactForm.querySelector('.submit-button');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'sending...';
            submitButton.disabled = true;
            
            // Send form data using fetch
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                formStatus.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                
                // Reset form
                contactForm.reset();
            })
            .catch(error => {
                // Show error message
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.className = 'form-status error';
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
});
