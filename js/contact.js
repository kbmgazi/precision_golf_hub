//Precision Golf Hub - Contact Form Handler
//Validates form fields and submits to EmailJS


// Initialize EmailJS (update with your service and template IDs)
const EMAILJS_SERVICE_ID = 'service_l4ejcdq';
const EMAILJS_TEMPLATE_ID = 'template_n17kih6';
const EMAILJS_PUBLIC_KEY = 'ENki-4PcM6J_9GEyC';

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//Validate phone format (basic South African format)
 
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.trim());
}

//Show form message (success or error)

function showContactMessage(message, isSuccess = false) {
    const messageEl = document.getElementById('contact_form_message');
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

//Clear field validation styles
 
function clearFieldValidation(field) {
    field.style.borderColor = '';
    field.style.backgroundColor = '';
}

// Set field validation error
function setFieldError(field) {
    field.style.borderColor = 'var(--text-danger)';
    field.style.backgroundColor = 'rgba(200, 50, 50, 0.05)';
}

//Validate contact form
 
function validateContactForm(formData) {
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
    
    // Subject validation
    if (!formData.subject || formData.subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters');
    }
    
    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    }
    
    return errors;
}

// Handle contact form submission
 
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const phoneField = form.querySelector('[name="phone"]');
    const subjectField = form.querySelector('[name="subject"]');
    const messageField = form.querySelector('[name="message"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Clear previous validation styles
    [nameField, emailField, phoneField, subjectField, messageField].forEach(field => {
        if (field) clearFieldValidation(field);
    });
    
    // Gather form data
    const formData = {
        name: nameField?.value || '',
        email: emailField?.value || '',
        phone: phoneField?.value || '',
        subject: subjectField?.value || '',
        message: messageField?.value || ''
    };
    
    // Validate form
    const errors = validateContactForm(formData);
    
    if (errors.length > 0) {
        // Show errors
        showContactMessage(errors.join('; '), false);
        
        // Highlight invalid fields
        if (formData.name.trim().length < 2) setFieldError(nameField);
        if (!isValidEmail(formData.email)) setFieldError(emailField);
        if (!isValidPhone(formData.phone)) setFieldError(phoneField);
        if (formData.subject.trim().length < 5) setFieldError(subjectField);
        if (formData.message.trim().length < 10) setFieldError(messageField);
        
        return;
    }
    
    // Disable submit button during submission
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }
    
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            // Fallback to email submission without EmailJS
            showContactMessage('Preparing to send message...', true);
            
            // Send via form submission (requires backend)
            form.submit();
            return;
        }
        
        // Initialize EmailJS
        emailjs.init(EMAILJS_PUBLIC_KEY);
        
        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                to_email: 'info@precisiongolfhub.co.za',
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                reply_to: formData.email
            }
        );
        
        if (response.status === 200) {
            showContactMessage('Thank you! Your message has been sent successfully. We will contact you shortly.', true);
            form.reset();
        } else {
            showContactMessage('Error sending message. Please try again.', false);
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showContactMessage('Error sending message. Please try again or contact us directly.', false);
    } finally {
        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }
}

//Initialize contact form
 
function initContactForm() {
    const form = document.getElementById('contact_form');
    if (!form) return;
    
    // Load EmailJS library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js';
    document.head.appendChild(script);
    
    // Add real-time validation on blur
    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const phoneField = form.querySelector('[name="phone"]');
    const subjectField = form.querySelector('[name="subject"]');
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
    
    if (subjectField) {
        subjectField.addEventListener('blur', () => {
            if (subjectField.value.trim().length < 5) {
                setFieldError(subjectField);
            } else {
                clearFieldValidation(subjectField);
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
    form.addEventListener('submit', handleContactSubmit);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}
