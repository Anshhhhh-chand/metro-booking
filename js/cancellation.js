document.getElementById("cancellationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const bookingId = document.getElementById("bookingId").value.trim();
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const bookingIndex = bookings.findIndex(b => b.bookingId === bookingId);

    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = "cancelled";
        localStorage.setItem("bookings", JSON.stringify(bookings));
        document.getElementById("message").textContent = "Your ticket has been cancelled successfully.";
    } else {
        document.getElementById("message").textContent = "Booking ID not found. Please check and try again.";
    }
});
    