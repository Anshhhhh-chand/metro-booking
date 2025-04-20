document.addEventListener("DOMContentLoaded", function () {
    const ticketData = JSON.parse(localStorage.getItem("ticketData"));

    if (!ticketData) {
        document.getElementById("ticketDetails").innerHTML = "<p>No ticket found. Please complete your booking.</p>";
        return;
    }

    document.getElementById("ticketDetails").innerHTML = `
        <p><strong>Passenger Name:</strong> ${ticketData.passengerName}</p>
        <p><strong>Train Number:</strong> ${ticketData.trainNumber}</p>
        <p><strong>Seat Number:</strong> ${ticketData.seatNumber}</p>
        <p><strong>Amount Paid:</strong> ${ticketData.amountPaid}</p>
        <p><strong>Payment Method:</strong> ${ticketData.paymentMethod.toUpperCase()}</p>
    `;
});
