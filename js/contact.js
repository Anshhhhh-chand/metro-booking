document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const successMessage = document.getElementById("success-message");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        if (validateForm()) {
            successMessage.textContent = "Your message has been sent successfully!";
            successMessage.style.color = "green";
            form.reset();
        }
    });

    function validateForm() {
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            alert("Please fill in all fields before submitting.");
            return false;
        }
        return true;
    }
});
