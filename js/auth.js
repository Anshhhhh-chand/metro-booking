// // Form switching functionality
// // Set some dummy user data in localStorage


// // Store this data in localStorage under the 'users' key
// localStorage.setItem('users', JSON.stringify(dummyUsers));

// function showRegisterForm() {
//     document.getElementById('loginForm').parentElement.style.display = 'none';
//     document.getElementById('registerForm').style.display = 'block';
// }

// function showLoginForm() {
//     document.getElementById('registerForm').style.display = 'none';
//     document.getElementById('loginForm').parentElement.style.display = 'block';
// }

// // Login form handler
// function handleLogin(event) {
//     event.preventDefault();
    
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const remember = document.querySelector('input[name="remember"]').checked;

//     // Basic validation
//     if (!email || !password) {
//         showError('Please fill in all fields');
//         return false;
//     }

//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         showError('Please enter a valid email address');
//         return false;
//     }

//     // Simulate API call
//     simulateLogin(email, password, remember);
//     return false;
// }

// // Register form handler
// function handleRegister(event) {
//     event.preventDefault();
//     console.log('Registration form submitted via handler');
    
//     const fullName = document.getElementById('fullName').value;
//     const email = document.getElementById('registerEmail').value;
//     const password = document.getElementById('registerPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     console.log('Form data:', { fullName, email, password, confirmPassword });

//     // Basic validation
//     if (!fullName || !email || !password || !confirmPassword) {
//         console.log('Validation failed: Missing fields');
//         showError('Please fill in all fields');
//         return;
//     }

//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         console.log('Validation failed: Invalid email format');
//         showError('Please enter a valid email address');
//         return;
//     }

//     // Password validation
//     if (password.length < 8) {
//         console.log('Validation failed: Password too short');
//         showError('Password must be at least 8 characters long');
//         return;
//     }

//     // Password confirmation
//     if (password !== confirmPassword) {
//         console.log('Validation failed: Passwords do not match');
//         showError('Passwords do not match');
//         return;
//     }

//     console.log('Form validation passed, proceeding with registration');
//     // Simulate API call
//     simulateRegister(fullName, email, password);
// }

// // Simulate login API call
// function simulateLogin(email, password, remember) {
//     // Show loading state
//     const submitBtn = document.querySelector('#loginForm .submit-btn');
//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = 'Logging in...';
//     submitBtn.disabled = true;

//     // Simulate API delay
//     setTimeout(() => {
//         try {
//             // Get registered users
//             const users = JSON.parse(localStorage.getItem('users') || '[]');
            
//             // Find user
//             const user = users.find(u => u.email === email && u.password === password);
            
//             if (user) {
//                 // Store user session
//                 if (remember) {
//                     localStorage.setItem('userEmail', email);
//                     localStorage.setItem('userName', user.fullName);
//                     localStorage.setItem('rememberMe', 'true');
//                 } else {
//                     sessionStorage.setItem('userEmail', email);
//                     sessionStorage.setItem('userName', user.fullName);
//                 }
                
//                 showSuccess('Login successful! Redirecting...');
                
//                 // Redirect to home page
//                 setTimeout(() => {
//                     window.location.href = 'index.html';
//                 }, 1500);
//             } else {
//                 showError('Invalid email or password');
//             }
//         } catch (error) {
//             showError('Error logging in. Please try again.');
//             console.error('Login error:', error);
//         } finally {
//             submitBtn.textContent = originalText;
//             submitBtn.disabled = false;
//         }
//     }, 1500);
// }

// // Simulate register API call
// function simulateRegister(fullName, email, password) {
//     console.log('Starting registration process');
//     // Show loading state
//     const submitBtn = document.querySelector('#registerFormElement .submit-btn');
//     if (!submitBtn) {
//         console.error('Submit button not found');
//         showError('System error. Please try again.');
//         return;
//     }

//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = 'Creating account...';
//     submitBtn.disabled = true;

//     // Simulate API delay
//     setTimeout(() => {
//         try {
//             console.log('Attempting to store user data');
//             // Store user data in localStorage
//             const users = JSON.parse(localStorage.getItem('users') || '[]');
//             console.log('Existing users:', users);
            
//             // Check if email already exists
//             if (users.some(user => user.email === email)) {
//                 console.log('Email already exists');
//                 showError('Email already registered');
//                 submitBtn.textContent = originalText;
//                 submitBtn.disabled = false;
//                 return;
//             }

//             // Add new user
//             const newUser = {
//                 fullName,
//                 email,
//                 password, // In a real app, this would be hashed
//                 createdAt: new Date().toISOString()
//             };
//             console.log('Adding new user:', newUser);
            
//             users.push(newUser);
//             localStorage.setItem('users', JSON.stringify(users));
//             console.log('User data stored successfully');
            
//             // Store user session
//             sessionStorage.setItem('userEmail', email);
//             sessionStorage.setItem('userName', fullName);
//             console.log('Session data stored');
            
//             showSuccess('Account created successfully! Redirecting...');
            
//             // Redirect to home page after a short delay
//             setTimeout(() => {
//                 console.log('Redirecting to home page');
//                 window.location.href = 'index.html';
//             }, 1500);
//         } catch (error) {
//             console.error('Registration error:', error);
//             showError('Error creating account. Please try again.');
//         } finally {
//             submitBtn.textContent = originalText;
//             submitBtn.disabled = false;
//         }
//     }, 1500);
// }

// // Error message display
// function showError(message) {
//     console.log('Showing error message:', message);
//     const errorDiv = document.createElement('div');
//     errorDiv.className = 'error-message';
//     errorDiv.textContent = message;

//     // Remove any existing error messages
//     const existingError = document.querySelector('.error-message');
//     if (existingError) {
//         existingError.remove();
//     }

//     // Add new error message
//     const form = document.querySelector('#registerFormElement');
//     if (form) {
//         form.insertBefore(errorDiv, form.firstChild);
//     }

//     // Remove error message after 5 seconds
//     setTimeout(() => {
//         errorDiv.remove();
//     }, 5000);
// }

// // Success message display
// function showSuccess(message) {
//     console.log('Showing success message:', message);
//     const successDiv = document.createElement('div');
//     successDiv.className = 'success-message';
//     successDiv.textContent = message;

//     // Remove any existing success messages
//     const existingSuccess = document.querySelector('.success-message');
//     if (existingSuccess) {
//         existingSuccess.remove();
//     }

//     // Add new success message
//     const form = document.querySelector('#registerFormElement');
//     if (form) {
//         form.insertBefore(successDiv, form.firstChild);
//     }
// }

// // Check if user is already logged in
// document.addEventListener('DOMContentLoaded', () => {
//     const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
//     if (userEmail) {
//         window.location.href = 'index.html';
//     }
// }); 

// window.handleRegister = handleRegister;
// Form switching functionality
// Set some dummy user data in localStorage
const dummyUsers = [
    {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
    },
    {
        fullName: 'Jane Smith',
        email: 'janesmith@example.com',
        password: 'password456'
    }
];

// Store this data in localStorage under the 'users' key
localStorage.setItem('users', JSON.stringify(dummyUsers));

function showRegisterForm() {
    document.getElementById('loginForm').parentElement.style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').parentElement.style.display = 'block';
}

// Login form handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.querySelector('input[name="remember"]').checked;

    // Basic validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }

    // Simulate API call
    simulateLogin(email, password, remember);
    return false;
}

// Register form handler
function handleRegister(event) {
    event.preventDefault();
    console.log('Registration form submitted via handler');
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    console.log('Form data:', { fullName, email, password, confirmPassword });

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
        console.log('Validation failed: Missing fields');
        showError('Please fill in all fields');
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('Validation failed: Invalid email format');
        showError('Please enter a valid email address');
        return;
    }

    // Password validation
    if (password.length < 8) {
        console.log('Validation failed: Password too short');
        showError('Password must be at least 8 characters long');
        return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
        console.log('Validation failed: Passwords do not match');
        showError('Passwords do not match');
        return;
    }

    console.log('Form validation passed, proceeding with registration');
    // Simulate API call
    simulateRegister(fullName, email, password);
}

// Simulate login API call
// Simulate login API call
function simulateLogin(email, password, remember) {
    // Show loading state
    const submitBtn = document.querySelector('#loginForm .submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;

    // Simulate API delay
    setTimeout(() => {
        try {
            // Get registered users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            console.log('Registered users:', users);  // Debug: Check users in localStorage
            
            // Find user with matching email and password
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                console.log('User found:', user);  // Debug: User found
                
                // Store user session
                if (remember) {
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userName', user.fullName);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    sessionStorage.setItem('userEmail', email);
                    sessionStorage.setItem('userName', user.fullName);
                }

                showSuccess('Login successful! Redirecting...');
                
                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                console.log('Invalid credentials');  // Debug: Credentials issue
                showError('Invalid email or password');
            }
        } catch (error) {
            showError('Error logging in. Please try again.');
            console.error('Login error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}


// Simulate register API call
function simulateRegister(fullName, email, password) {
    console.log('Starting registration process');
    // Show loading state
    const submitBtn = document.querySelector('#registerFormElement .submit-btn');
    if (!submitBtn) {
        console.error('Submit button not found');
        showError('System error. Please try again.');
        return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;

    // Simulate API delay
    setTimeout(() => {
        try {
            console.log('Attempting to store user data');
            // Store user data in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            console.log('Existing users:', users);
            
            // Check if email already exists
            if (users.some(user => user.email === email)) {
                console.log('Email already exists');
                showError('Email already registered');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }

            // Add new user
            const newUser = {
                fullName,
                email,
                password, // In a real app, this would be hashed
                createdAt: new Date().toISOString()
            };
            console.log('Adding new user:', newUser);
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('User data stored successfully');
            
            // Store user session
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userName', fullName);
            console.log('Session data stored');
            
            showSuccess('Account created successfully! Redirecting...');
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                console.log('Redirecting to home page');
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            console.error('Registration error:', error);
            showError('Error creating account. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

// Error message display
function showError(message) {
    console.log('Showing error message:', message);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const form = document.querySelector('#registerFormElement');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
    }

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Success message display
function showSuccess(message) {
    console.log('Showing success message:', message);
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;

    // Remove any existing success messages
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    // Add new success message
    const form = document.querySelector('#registerFormElement');
    if (form) {
        form.insertBefore(successDiv, form.firstChild);
    }
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    if (userEmail) {
        window.location.href = 'index.html';
    }
});

window.handleRegister = handleRegister;
window.handleLogin = handleLogin;