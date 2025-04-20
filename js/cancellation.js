document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("searchForm");
    const searchSection = document.getElementById("searchSection");
    const ticketDetailsSection = document.getElementById("ticketDetailsSection");
    const resultSection = document.getElementById("resultSection");
    const ticketDetails = document.getElementById("ticketDetails");
    const confirmCancelButton = document.getElementById("confirmCancelButton");
    const backButton = document.getElementById("backButton");
    const homeButton = document.getElementById("homeButton");
    const idError = document.getElementById("idError");
    
    let currentBooking = null;

    // Step 1: Search for ticket
    searchForm.addEventListener("submit", function(e) {
        e.preventDefault();
        idError.textContent = "";
        
        const bookingId = document.getElementById("bookingId").value.trim();
        
        // Validate booking ID format (assuming it should be alphanumeric and at least 6 chars)
        if (!bookingId.match(/^[A-Za-z0-9]{6,}$/)) {
            idError.textContent = "Please enter a valid booking ID (at least 6 alphanumeric characters)";
            return;
        }
        
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const booking = bookings.find(b => b.bookingId === bookingId);
        
        if (booking) {
            if (booking.status === "cancelled") {
                idError.textContent = "This ticket has already been cancelled.";
                return;
            }
            
            currentBooking = booking;
            displayTicketDetails(booking);
            searchSection.classList.add("hidden");
            ticketDetailsSection.classList.remove("hidden");
        } else {
            idError.textContent = "Booking ID not found. Please check and try again.";
        }
    });
    
    // Display ticket details
    function displayTicketDetails(booking) {
        const departureDate = new Date(booking.departureDate);
        const currentDate = new Date();
        const hoursRemaining = (departureDate - currentDate) / (1000 * 60 * 60);
        
        let refundPercentage = 0;
        if (hoursRemaining > 24) {
            refundPercentage = 100;
        } else if (hoursRemaining >= 3) {
            refundPercentage = 50;
        }
        
        const refundAmount = (booking.fare * refundPercentage / 100).toFixed(2);
        currentBooking.refundPercentage = refundPercentage;
        currentBooking.refundAmount = refundAmount;
        
        ticketDetails.innerHTML = `
            <div class="detail-row">
                <span class="label">Booking ID:</span>
                <span class="value">${booking.bookingId}</span>
            </div>
            <div class="detail-row">
                <span class="label">From:</span>
                <span class="value">${booking.from}</span>
            </div>
            <div class="detail-row">
                <span class="label">To:</span>
                <span class="value">${booking.to}</span>
            </div>
            <div class="detail-row">
                <span class="label">Departure:</span>
                <span class="value">${formatDate(booking.departureDate)}</span>
            </div>
            <div class="detail-row">
                <span class="label">Passengers:</span>
                <span class="value">${booking.passengers}</span>
            </div>
            <div class="detail-row">
                <span class="label">Fare:</span>
                <span class="value">$${booking.fare.toFixed(2)}</span>
            </div>
            <div class="detail-row highlight">
                <span class="label">Refund Amount:</span>
                <span class="value">$${refundAmount} (${refundPercentage}%)</span>
            </div>
        `;
    }
    
    // Go back to search
    backButton.addEventListener("click", function() {
        ticketDetailsSection.classList.add("hidden");
        searchSection.classList.remove("hidden");
    });
    
    // Confirm cancellation
    confirmCancelButton.addEventListener("click", function() {
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const bookingIndex = bookings.findIndex(b => b.bookingId === currentBooking.bookingId);
        
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = "cancelled";
            bookings[bookingIndex].cancellationDate = new Date().toISOString();
            bookings[bookingIndex].refundAmount = currentBooking.refundAmount;
            localStorage.setItem("bookings", JSON.stringify(bookings));
            
            // Display result message
            const resultMessage = document.getElementById("resultMessage");
            resultMessage.innerHTML = `
                <div class="success-message">
                    <h3>Ticket Cancelled Successfully</h3>
                    <p>Your booking with ID ${currentBooking.bookingId} has been cancelled.</p>
                </div>
            `;
            
            const refundDetails = document.getElementById("refundDetails");
            if (currentBooking.refundPercentage > 0) {
                refundDetails.innerHTML = `
                    <p>Refund Amount: $${currentBooking.refundAmount}</p>
                    <p>The refund will be processed to your original payment method within 3-5 business days.</p>
                `;
            } else {
                refundDetails.innerHTML = `
                    <p>No refund is applicable as per the cancellation policy.</p>
                `;
            }
            
            ticketDetailsSection.classList.add("hidden");
            resultSection.classList.remove("hidden");
        }
    });
    
    // Return to home
    homeButton.addEventListener("click", function() {
        window.location.href = "index.html";
    });
    
    // Helper function for date formatting
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
});