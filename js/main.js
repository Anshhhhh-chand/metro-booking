// Mobile navigation toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Close mobile navigation when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation helper
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Add input validation listeners
document.querySelectorAll('form').forEach(form => {
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.remove('error');
            }
        });
    });
});

// Date picker initialization (if needed)
function initializeDatePicker() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = today;
        
        // Set default value to today
        if (!input.value) {
            input.value = today;
        }
    });
}

// Time picker initialization (if needed)
function initializeTimePicker() {
    const timeInputs = document.querySelectorAll('input[type="time"]');
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    timeInputs.forEach(input => {
        input.min = currentTime;
        
        // Set default value to current time
        if (!input.value) {
            input.value = currentTime;
        }
    });
}

// Initialize date and time pickers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDatePicker();
    initializeTimePicker();
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        if (this.form && validateForm(this.form)) {
            this.classList.add('loading');
            this.disabled = true;
        }
    });
});

// Handle form submission
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            showError('Please fill in all required fields');
        }
    });
});

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.firstChild);

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;

    // Remove any existing success messages
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    // Add new success message
    const form = document.querySelector('form');
    form.insertBefore(successDiv, form.firstChild);
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    window.location.href = 'login.html';
}

// Check authentication status
function checkAuth() {
    // For demo purposes, we'll allow access to all pages without authentication
    return true;
}

// Initialize authentication check
document.addEventListener('DOMContentLoaded', checkAuth); 