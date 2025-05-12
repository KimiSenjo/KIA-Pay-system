document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const checkAmountBtn = document.getElementById('check-amount');
    const amountSection = document.getElementById('amount-section');
    const momoOption = document.getElementById('momo-option');
    const cardOption = document.getElementById('card-option');
    const momoForm = document.getElementById('momo-form');
    const cardForm = document.getElementById('card-form');
    const payMomoBtn = document.getElementById('pay-momo');
    const payCardBtn = document.getElementById('pay-card');
    const backToPaymentBtn = document.getElementById('back-to-payment');
    const backToPaymentCardBtn = document.getElementById('back-to-payment-card');
    const successSection = document.getElementById('success-section');
    const newPaymentBtn = document.getElementById('new-payment');
    const ticketInput = document.getElementById('ticket-number');
    const feeAmount = document.getElementById('fee-amount');
    const receiptNumber = document.getElementById('receipt-number');
    const ticketSection = document.querySelector('.ticket-section');
    const paymentOptionsSection = document.getElementById('payment-options-section');

    // Initially hide all sections except ticket section
    amountSection.style.display = 'none';
    momoForm.style.display = 'none';
    cardForm.style.display = 'none';
    successSection.style.display = 'none';

    // Check Amount Button Click
    checkAmountBtn.addEventListener('click', function() {
        if (ticketInput.value.trim() === '') {
            alert('Please enter a ticket number');
            return;
        }
        
        // Simulate API call to get amount
        checkAmountBtn.textContent = 'Checking...';
        checkAmountBtn.disabled = true;
        
        setTimeout(() => {
            // Generate a random amount between 5 and 50 GHS
            const amount = (Math.random() * 45 + 5).toFixed(2);
            feeAmount.textContent = `GHS ${amount}`;
            
            // Hide ticket section and show amount section with payment options
            ticketSection.style.display = 'none';
            amountSection.style.display = 'block';
            paymentOptionsSection.style.display = 'block'; // Ensure payment options are visible
            momoForm.style.display = 'none'; // Hide payment forms
            cardForm.style.display = 'none';
            
            // Reset button state
            checkAmountBtn.textContent = 'Check Amount';
            checkAmountBtn.disabled = false;
            
            // Scroll to amount section
            amountSection.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });

    // Payment Method Selection
    momoOption.addEventListener('click', function() {
        document.getElementById('mobile-money').checked = true;
        momoOption.classList.add('active');
        cardOption.classList.remove('active');
        
        // Hide payment options section and show mobile money form
        paymentOptionsSection.style.display = 'none';
        momoForm.style.display = 'block';
        cardForm.style.display = 'none';
        
        // Focus on the first input field in the Mobile Money form
        setTimeout(() => {
            document.getElementById('network-provider').focus();
        }, 100);
    });

    cardOption.addEventListener('click', function() {
        document.getElementById('card').checked = true;
        cardOption.classList.add('active');
        momoOption.classList.remove('active');
        
        // Hide payment options section and show card form
        paymentOptionsSection.style.display = 'none';
        cardForm.style.display = 'block';
        momoForm.style.display = 'none';
        
        // Focus on the first input field in the Card form
        setTimeout(() => {
            document.getElementById('card-number').focus();
        }, 100);
    });

    // Back to payment options from Mobile Money form
    backToPaymentBtn.addEventListener('click', function() {
        momoForm.style.display = 'none';
        paymentOptionsSection.style.display = 'block';
    });
    
    // Back to payment options from Card form
    backToPaymentCardBtn.addEventListener('click', function() {
        cardForm.style.display = 'none';
        paymentOptionsSection.style.display = 'block';
    });

    // Pay with Mobile Money
    payMomoBtn.addEventListener('click', function() {
        const networkProvider = document.getElementById('network-provider');
        const momoNumber = document.getElementById('momo-number');
        
        if (momoNumber.value.trim() === '') {
            alert('Please enter your mobile money number');
            return;
        }
        
        // Simulate payment processing
        payMomoBtn.textContent = 'Processing...';
        payMomoBtn.disabled = true;
        backToPaymentBtn.disabled = true;
        
        setTimeout(() => {
            processPayment();
        }, 2000);
    });

    // Pay with Card
    payCardBtn.addEventListener('click', function() {
        const cardNumber = document.getElementById('card-number');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');
        const cardName = document.getElementById('card-name');
        
        if (cardNumber.value.trim() === '' || 
            expiryDate.value.trim() === '' || 
            cvv.value.trim() === '' || 
            cardName.value.trim() === '') {
            alert('Please fill in all card details');
            return;
        }
        
        // Simulate payment processing
        payCardBtn.textContent = 'Processing...';
        payCardBtn.disabled = true;
        backToPaymentCardBtn.disabled = true;
        
        setTimeout(() => {
            processPayment();
        }, 2000);
    });

    // Process Payment (common function)
    function processPayment() {
        // Generate a random receipt number
        const randomReceipt = 'KIA-' + Math.floor(Math.random() * 90000 + 10000) + '-' + 
                             String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                             String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                             String.fromCharCode(65 + Math.floor(Math.random() * 26));
        
        receiptNumber.textContent = randomReceipt;
        
        // Hide all previous sections and show success section
        ticketSection.style.display = 'none';
        amountSection.style.display = 'none';
        momoForm.style.display = 'none';
        cardForm.style.display = 'none';
        successSection.style.display = 'block';
        
        // Scroll to success section
        successSection.scrollIntoView({ behavior: 'smooth' });
    }

    // New Payment Button
    newPaymentBtn.addEventListener('click', function() {
        // Reset all forms
        document.getElementById('ticket-number').value = '';
        document.getElementById('momo-number').value = '';
        document.getElementById('card-number').value = '';
        document.getElementById('expiry-date').value = '';
        document.getElementById('cvv').value = '';
        document.getElementById('card-name').value = '';
        
        // Reset buttons
        payMomoBtn.textContent = 'Pay Now';
        payMomoBtn.disabled = false;
        payCardBtn.textContent = 'Pay Now';
        payCardBtn.disabled = false;
        backToPaymentBtn.disabled = false;
        backToPaymentCardBtn.disabled = false;
        
        // Reset payment method selection
        momoOption.classList.remove('active');
        cardOption.classList.remove('active');
        
        // Show only ticket section and hide all other sections
        ticketSection.style.display = 'block';
        amountSection.style.display = 'none';
        momoForm.style.display = 'none';
        cardForm.style.display = 'none';
        successSection.style.display = 'none';
        
        // Make sure payment options section is ready for next use
        paymentOptionsSection.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Focus on ticket number input
        setTimeout(() => {
            ticketInput.focus();
        }, 300);
    });

    // Format card number with spaces
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue.substring(0, 19); // Limit to 16 digits + 3 spaces
        });
    }

    // Format expiry date
    const expiryDateInput = document.getElementById('expiry-date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            e.target.value = value.substring(0, 5); // MM/YY format
        });
    }

    // Format CVV - numbers only
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 3);
        });
    }

    // Format mobile money number - numbers only
    const momoNumberInput = document.getElementById('momo-number');
    if (momoNumberInput) {
        momoNumberInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 10);
        });
    }
});