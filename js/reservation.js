// Function to generate a random booking ID
function generateBookingId() {
    return 'MG-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Handle the reservation form submission
function handleReservationSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const fromStation = document.getElementById('fromStation').value;
    const toStation = document.getElementById('toStation').value;
    const journeyDate = document.getElementById('journeyDate').value;
    const journeyTime = document.getElementById('journeyTime').value;
    const ticketType = document.getElementById('ticketType').value;
    const numPassengers = document.getElementById('numPassengers').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Basic validation
    if (!fromStation || !toStation || !journeyDate || !journeyTime || !ticketType || !email || !phone) {
        showError('Please fill in all required fields');
        return false;
    }
    
    // Create booking object
    const bookingId = generateBookingId();
    const booking = {
        bookingId: bookingId,
        fromStation: fromStation,
        toStation: toStation,
        journeyDate: journeyDate,
        journeyTime: journeyTime,
        ticketType: ticketType,
        numPassengers: numPassengers,
        passengerName: email.split('@')[0], // Using email username as passenger name for demo
        email: email,
        phone: phone,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Get existing bookings or initialize empty array
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Add new booking
    bookings.push(booking);
    
    // Save to localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    console.log('Booking created:', booking);
    console.log('All bookings:', bookings);
    
    // Redirect to payment page with booking ID
    window.location.href = `payment.html?bookingId=${bookingId}`;
    
    return false;
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.backgroundColor = '#ffebee';
    errorDiv.style.color = '#d32f2f';
    errorDiv.style.padding = '10px';
    errorDiv.style.marginBottom = '15px';
    errorDiv.style.borderRadius = '4px';
    errorDiv.style.borderLeft = '4px solid #d32f2f';

    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message to the top of the form
    const form = document.getElementById('reservationForm');
    form.insertBefore(errorDiv, form.firstChild);

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reservation page loaded');
    
    // Attach event listener to the form
    const form = document.getElementById('reservationForm');
    if (form) {
        form.addEventListener('submit', handleReservationSubmit);
    } else {
        console.error('Reservation form not found in the DOM'); 
    }
    
    // Alternative: attach event listener to the button directly
    const proceedBtn = document.querySelector('button[type="submit"], .proceed-btn, button:contains("Proceed to Payment")');
    if (proceedBtn && !form) {
        proceedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleReservationSubmit(e);
        });
    }
});