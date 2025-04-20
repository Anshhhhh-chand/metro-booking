document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("paymentForm");
    const successMessage = document.getElementById("payment-success");
    const countdownTimer = document.getElementById("countdown-timer");
    const paymentButton = document.getElementById("payment-button");

    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const cardDetails = document.getElementById("card-details");
    const upiDetails = document.getElementById("upi-details");
    const netbankingDetails = document.getElementById("netbanking-details");
    const walletDetails = document.getElementById("wallet-details");
    
    // Card input formatting and validation
    const cardNumberInput = document.getElementById("card-number");
    const expiryDateInput = document.getElementById("expiry-date");
    const cvvInput = document.getElementById("cvv");
    const cardNameInput = document.getElementById("card-name");
    
    // Wallet additional fields
    const walletProviderSelect = document.getElementById("wallet-provider");
    const walletPhoneContainer = document.getElementById("wallet-phone-container");
    
    // Format card number as user types (XXXX XXXX XXXX XXXX)
    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", function(e) {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Add spaces after every 4 digits
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue.trim();
        });
    }
    
    // Format expiry date as MM/YY
    if (expiryDateInput) {
        expiryDateInput.addEventListener("input", function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                this.value = value.substring(0, 2) + "/" + value.substring(2, 4);
            } else {
                this.value = value;
            }
        });
    }
    
    // Show wallet phone field when wallet provider is selected
    if (walletProviderSelect) {
        walletProviderSelect.addEventListener("change", function() {
            if (this.value) {
                walletPhoneContainer.classList.remove("hidden");
            } else {
                walletPhoneContainer.classList.add("hidden");
            }
        });
    }

    // Toggle Payment Fields Based on Selection
    paymentMethods.forEach(method => {
        method.addEventListener("change", function () {
            // Hide all payment details
            cardDetails.classList.add("hidden");
            upiDetails.classList.add("hidden");
            netbankingDetails.classList.add("hidden");
            walletDetails.classList.add("hidden");

            // Show the selected payment details
            if (this.value === "card") cardDetails.classList.remove("hidden");
            else if (this.value === "upi") upiDetails.classList.remove("hidden");
            else if (this.value === "netbanking") netbankingDetails.classList.remove("hidden");
            else if (this.value === "wallet") walletDetails.classList.remove("hidden");
            
            // Clear previous error messages when switching payment methods
            clearErrorMessages();
        });
    });
    
    // Clear all error messages
    function clearErrorMessages() {
        const errorElements = document.querySelectorAll(".error-message");
        errorElements.forEach(element => {
            element.textContent = "";
        });
    }
    
    // Validate card details
    function validateCardDetails() {
        let isValid = true;
        
        // Card number validation - should be 16 digits (ignoring spaces)
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cardNumber)) {
            document.getElementById("card-number-error").textContent = "Please enter a valid 16-digit card number";
            isValid = false;
        } else {
            document.getElementById("card-number-error").textContent = "";
        }
        
        // Cardholder name validation
        if (!cardNameInput.value.trim()) {
            document.getElementById("card-name-error").textContent = "Please enter the name on the card";
            isValid = false;
        } else {
            document.getElementById("card-name-error").textContent = "";
        }
        
        // Expiry date validation (MM/YY format)
        const expiryValue = expiryDateInput.value;
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryValue)) {
            document.getElementById("expiry-date-error").textContent = "Please enter a valid expiry date (MM/YY)";
            isValid = false;
        } else {
            // Check if card is expired
            const [month, year] = expiryValue.split('/');
            const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
            const currentDate = new Date();
            
            if (expiryDate < currentDate) {
                document.getElementById("expiry-date-error").textContent = "Your card has expired";
                isValid = false;
            } else {
                document.getElementById("expiry-date-error").textContent = "";
            }
        }
        
        // CVV validation - should be 3 digits
        if (!/^\d{3}$/.test(cvvInput.value)) {
            document.getElementById("cvv-error").textContent = "Please enter a valid 3-digit CVV";
            isValid = false;
        } else {
            document.getElementById("cvv-error").textContent = "";
        }
        
        return isValid;
    }
    
    // Validate UPI ID
    function validateUpiDetails() {
        let isValid = true;
        const upiId = document.getElementById("upi-id").value.trim();
        
        if (!/^[a-zA-Z0-9.]+@[a-zA-Z]+$/.test(upiId)) {
            document.getElementById("upi-id-error").textContent = "Please enter a valid UPI ID (e.g., username@bank)";
            isValid = false;
        } else {
            document.getElementById("upi-id-error").textContent = "";
        }
        
        return isValid;
    }
    
    // Validate Netbanking details
    function validateNetbankingDetails() {
        let isValid = true;
        const bank = document.getElementById("bank").value;
        
        if (!bank) {
            document.getElementById("bank-error").textContent = "Please select a bank";
            isValid = false;
        } else {
            document.getElementById("bank-error").textContent = "";
        }
        
        return isValid;
    }
    
    // Validate Wallet details
    function validateWalletDetails() {
        let isValid = true;
        const walletProvider = document.getElementById("wallet-provider").value;
        
        if (!walletProvider) {
            document.getElementById("wallet-error").textContent = "Please select a wallet provider";
            isValid = false;
        } else {
            document.getElementById("wallet-error").textContent = "";
            
            // If wallet provider is selected, validate phone number
            if (!walletPhoneContainer.classList.contains("hidden")) {
                const phoneInput = document.getElementById("wallet-phone");
                if (!/^\d{10}$/.test(phoneInput.value.trim())) {
                    document.getElementById("wallet-phone-error").textContent = "Please enter a valid 10-digit mobile number";
                    isValid = false;
                } else {
                    document.getElementById("wallet-phone-error").textContent = "";
                }
            }
        }
        
        return isValid;
    }

    // Form Submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Get the selected payment method
        const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;
        let isValid = true;

        // Validate according to the selected payment method
        if (selectedPayment === "card") {
            isValid = validateCardDetails();
        } else if (selectedPayment === "upi") {
            isValid = validateUpiDetails();
        } else if (selectedPayment === "netbanking") {
            isValid = validateNetbankingDetails();
        } else if (selectedPayment === "wallet") {
            isValid = validateWalletDetails();
        }

        if (isValid) {
            // Show processing state
            paymentButton.disabled = true;
            paymentButton.textContent = "Processing...";
            countdownTimer.classList.remove("hidden");
            
            // Simulate payment processing
            setTimeout(function() {
                // Show success message
                successMessage.textContent = "Payment Successful! Thank you for using MetroGo. Redirecting to confirmation page...";
                successMessage.style.display = "block";
                
                // Hide the form
                form.style.opacity = "0.5";
                countdownTimer.classList.add("hidden");
                
                // Simulate redirect after successful payment
                setTimeout(function() {
                    // Reset form for demo purposes (in real world, would redirect to confirmation page)
                    form.reset();
                    form.style.opacity = "1";
                    successMessage.style.display = "none";
                    paymentButton.disabled = false;
                    paymentButton.textContent = "Proceed to Pay ";
                    
                    // Reset payment method to card (default)
                    document.getElementById("card-payment").checked = true;
                    cardDetails.classList.remove("hidden");
                    upiDetails.classList.add("hidden");
                    netbankingDetails.classList.add("hidden");
                    walletDetails.classList.add("hidden");
                    walletPhoneContainer.classList.add("hidden");
                    
                    // Clear all error messages
                    clearErrorMessages();
                }, 3000);
            }, 2000);
        }
    });
});

document.getElementById("paymentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Fetching form inputs dynamically
    const passengerName = localStorage.getItem("passengerName") || "John Doe"; // Replace with actual input
    const trainNumber = localStorage.getItem("trainNumber") || "12345"; // Replace with actual input
    const seatNumber = localStorage.getItem("seatNumber") || "A1"; // Replace with actual input
    const amountPaid = document.getElementById("amount").value || "₹500";
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // Store ticket data in localStorage
    const ticketData = {
        passengerName,
        trainNumber,
        seatNumber,
        amountPaid,
        paymentMethod
    };
    localStorage.setItem("ticketData", JSON.stringify(ticketData));

    // Redirect to ticket page
    window.location.href = "ticket.html";
});
