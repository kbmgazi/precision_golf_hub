/**
 * Precision Golf Hub - Enquiry Form Handler
 * Validates form fields and submits to Formspree
 */

const FORMSPREE_ID = 'mzdqqdzq'; // Formspree form ID

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format (basic South African format)
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.trim());
}

/**
 * Show form message (success or error)
 */
function showFormMessage(message, isSuccess = false) {
    const messageEl = document.getElementById('form_message');
    if (!messageEl) return;
    
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    messageEl.style.color = isSuccess ? 'var(--green)' : 'var(--text-danger)';
    messageEl.style.backgroundColor = isSuccess ? 'rgba(26, 92, 52, 0.1)' : 'rgba(200, 50, 50, 0.1)';
    messageEl.style.padding = '1rem';
    messageEl.style.borderRadius = '4px';
    messageEl.style.marginBottom = '1rem';
    messageEl.style.border = `1px solid ${isSuccess ? 'var(--green)' : 'var(--text-danger)'}`;
    
    // Auto-hide success message after 5 seconds
    if (isSuccess) {
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
}

// Clear form validation styles
 
function clearFieldValidation(field) {
    field.style.borderColor = '';
    field.style.backgroundColor = '';
}

// Set field validation error
 
function setFieldError(field) {
    field.style.borderColor = 'var(--text-danger)';
    field.style.backgroundColor = 'rgba(200, 50, 50, 0.05)';
}

// Validate form fields
 
function validateEnquiryForm(formData) {
    const errors = [];
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    // Email validation
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    if (!formData.phone || !isValidPhone(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Service selection validation
    if (!formData.service || formData.service === '') {
        errors.push('Please select a service');
    }
    
    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    }
    
    return errors;
}

//Handle form submission
 
async function handleEnquirySubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const phoneField = form.querySelector('[name="phone"]');
    const serviceField = form.querySelector('[name="service"]');
    const messageField = form.querySelector('[name="message"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Clear previous validation styles
    [nameField, emailField, phoneField, serviceField, messageField].forEach(field => {
        if (field) clearFieldValidation(field);
    });
    
    // Gather form data
    const formData = {
        name: nameField?.value || '',
        email: emailField?.value || '',
        phone: phoneField?.value || '',
        service: serviceField?.value || '',
        message: messageField?.value || '',
        date: new Date().toLocaleString()
    };
    
    // Validate form
    const errors = validateEnquiryForm(formData);
    
    if (errors.length > 0) {
        // Show errors
        showFormMessage(errors.join('; '), false);
        
        // Highlight invalid fields
        if (formData.name.trim().length < 2) setFieldError(nameField);
        if (!isValidEmail(formData.email)) setFieldError(emailField);
        if (!isValidPhone(formData.phone)) setFieldError(phoneField);
        if (!formData.service) setFieldError(serviceField);
        if (formData.message.trim().length < 10) setFieldError(messageField);
        
        return;
    }
    
    // Disable submit button during submission
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }
    
    try {
        // Submit to Formspree
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showFormMessage('Thank you! Your enquiry has been sent successfully. We will contact you shortly.', true);
            form.reset();
        } else {
            showFormMessage('Error sending form. Please try again later.', false);
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Network error. Please check your connection and try again.', false);
    } finally {
        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Enquiry';
        }
    }
}

// Initialize enquiry form
 
function initEnquiryForm() {
    const form = document.getElementById('enquiry_form');
    if (!form) return;
    
    // Add real-time validation on blur
    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const phoneField = form.querySelector('[name="phone"]');
    const messageField = form.querySelector('[name="message"]');
    
    if (nameField) {
        nameField.addEventListener('blur', () => {
            if (nameField.value.trim().length < 2) {
                setFieldError(nameField);
            } else {
                clearFieldValidation(nameField);
            }
        });
    }
    
    if (emailField) {
        emailField.addEventListener('blur', () => {
            if (!isValidEmail(emailField.value)) {
                setFieldError(emailField);
            } else {
                clearFieldValidation(emailField);
            }
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('blur', () => {
            if (!isValidPhone(phoneField.value)) {
                setFieldError(phoneField);
            } else {
                clearFieldValidation(phoneField);
            }
        });
    }
    
    if (messageField) {
        messageField.addEventListener('blur', () => {
            if (messageField.value.trim().length < 10) {
                setFieldError(messageField);
            } else {
                clearFieldValidation(messageField);
            }
        });
    }
    
    // Form submission
    form.addEventListener('submit', handleEnquirySubmit);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnquiryForm);
} else {
    initEnquiryForm();
}
