// Load booking details
function loadBookingDetails() {
    const bookingId = new URLSearchParams(window.location.search).get('bookingId');
    if (!bookingId) {
        window.location.href = 'index.html';
        return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = bookings.find(b => b.bookingId === bookingId);

    if (!booking || booking.status !== 'confirmed') {
        window.location.href = 'index.html';
        return;
    }

    // Update ticket details
    document.getElementById('bookingId').textContent = booking.bookingId;
    document.getElementById('fromStation').textContent = formatStationName(booking.fromStation);
    document.getElementById('toStation').textContent = formatStationName(booking.toStation);
    document.getElementById('journeyDate').textContent = formatDate(booking.journeyDate);
    document.getElementById('journeyTime').textContent = booking.journeyTime;
    document.getElementById('passengerName').textContent = booking.passengerName;
    document.getElementById('ticketType').textContent = formatTicketType(booking.ticketType);
    document.getElementById('totalAmount').textContent = `$${calculateTotal(booking.ticketType).toFixed(2)}`;

    // Generate QR code
    generateQRCode(booking);
}

// Format station name
function formatStationName(station) {
    const stations = {
        central: 'Central Station',
        north: 'North Station',
        south: 'South Station',
        east: 'East Station',
        west: 'West Station'
    };
    return stations[station] || station;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format ticket type for display
function formatTicketType(type) {
    const types = {
        single: 'Single Journey',
        return: 'Return Journey',
        dayPass: 'Day Pass'
    };
    return types[type] || type;
}

// Calculate total amount
function calculateTotal(ticketType) {
    const prices = {
        single: 2.50,
        return: 4.50,
        dayPass: 8.00
    };
    return (prices[ticketType] || 0) + 0.50; // Add service fee
}

// Generate QR code
function generateQRCode(booking) {
    // In a real application, this would generate a QR code containing the booking details
    // For demo purposes, we'll just show a placeholder
    const qrCode = document.querySelector('.qr-code');
    qrCode.innerHTML = '<i class="fas fa-qrcode"></i>';
}

// Print ticket
function printTicket() {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const ticketContent = document.querySelector('.ticket-details').cloneNode(true);
    
    // Add print-specific styles
    const printStyles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .ticket-details {
                border: 1px solid #ddd;
                padding: 20px;
                max-width: 500px;
                margin: 0 auto;
            }
            .journey-details {
                margin: 20px 0;
            }
            .station {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
            }
            .journey-line {
                position: relative;
                height: 2px;
                background: #ddd;
                margin: 10px 0;
            }
            .train-icon {
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 5px;
                border-radius: 50%;
            }
            .passenger-details {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
            }
            .detail-item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
            }
            .ticket-footer {
                margin-top: 20px;
                text-align: center;
            }
            @media print {
                .ticket-actions {
                    display: none;
                }
            }
        </style>
    `;

    // Write the content to the new window
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MetroGo Ticket - ${document.getElementById('bookingId').textContent}</title>
            ${printStyles}
        </head>
        <body>
            ${ticketContent.outerHTML}
        </body>
        </html>
    `);

    // Wait for content to load before printing
    printWindow.document.close();
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
}

// Download ticket
function downloadTicket() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ticketElement = document.querySelector('.ticket-details');

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Draw ticket background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Add ticket content
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000000';

    // Draw header
    ctx.font = 'bold 24px Arial';
    ctx.fillText('MetroGo Ticket', 20, 40);
    ctx.font = '16px Arial';
    ctx.fillText(`Ticket ID: ${document.getElementById('bookingId').textContent}`, 20, 70);

    // Draw journey details
    ctx.fillText(`From: ${document.getElementById('fromStation').textContent}`, 20, 100);
    ctx.fillText(`To: ${document.getElementById('toStation').textContent}`, 20, 130);
    ctx.fillText(`Date: ${document.getElementById('journeyDate').textContent}`, 20, 160);
    ctx.fillText(`Time: ${document.getElementById('journeyTime').textContent}`, 20, 190);

    // Draw passenger details
    ctx.fillText(`Passenger: ${document.getElementById('passengerName').textContent}`, 20, 230);
    ctx.fillText(`Ticket Type: ${document.getElementById('ticketType').textContent}`, 20, 260);
    ctx.fillText(`Amount: ${document.getElementById('totalAmount').textContent}`, 20, 290);

    // Convert canvas to blob and download
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${document.getElementById('bookingId').textContent}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadBookingDetails); 