let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - NT$${item.price}`;
        cartItems.appendChild(li);
        totalPrice += item.price;
    });
    document.getElementById('totalPrice').textContent = `總金額（未稅）: NT$${totalPrice}`;
    
    const invoiceCheckbox = document.getElementById('invoice-checkbox').checked;
    const invoiceCharge = invoiceCheckbox ? totalPrice * 0.05 : 0;
    const finalAmount = totalPrice + invoiceCharge;
    
    document.getElementById('invoice-charge').textContent = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').textContent = finalAmount.toFixed(2);
    document.getElementById('total-amount').textContent = totalPrice.toFixed(2);
}

function toggleInvoiceDetails() {
    const invoiceCheckbox = document.getElementById('invoice-checkbox').checked;
    const invoiceDetails = document.getElementById('invoice-details');
    const receiptDetails = document.getElementById('receipt-details');
    
    if (invoiceCheckbox) {
        invoiceDetails.style.display = 'block';
        receiptDetails.style.display = 'none';
    } else {
        invoiceDetails.style.display = 'none';
        receiptDetails.style.display = 'block';
    }
}

function confirmOrder() {
    const totalAmount = parseFloat(document.getElementById('total-amount').textContent);
    const invoiceCharge = parseFloat(document.getElementById('invoice-charge').textContent);
    const finalAmount = parseFloat(document.getElementById('final-amount').textContent);
    
    // Validate form inputs
    const name = document.getElementById('name').value;
    const orderName = document.getElementById('order-name').value;
    const orderNumber = document.getElementById('order-number').value;
    const ordererNames = document.getElementById('orderer-names').value;
    
    if (!name || !orderName || !orderNumber || !ordererNames) {
        alert('請填寫所有必填項目！');
        return;
    }
    
    const invoiceCheckbox = document.getElementById('invoice-checkbox').checked;
    let companyName = '';
    let recipientName = '';
    let recipientAddress = '';
    if (invoiceCheckbox) {
        companyName = document.getElementById('company-name').value;
        recipientName = document.getElementById('recipient-name').value;
        recipientAddress = document.getElementById('recipient-address').value;
        if (!companyName || !recipientName || !recipientAddress) {
            alert('若選擇開立發票，必須填寫公司抬頭、收件人及地址！');
            return;
        }
    } else {
        recipientName = document.getElementById('receipt-recipient').value;
        recipientAddress = document.getElementById('receipt-address').value;
        if (!recipientName || !recipientAddress) {
            alert('若只需收據，請填寫收件人及地址！');
            return;
        }
    }
    
    // Create order summary object
    const orderSummary = {
        name,
        orderName,
        orderNumber,
        ordererNames,
        totalAmount,
        invoiceCharge,
        finalAmount,
        companyName,
        recipientName,
        recipientAddress
    };

    // Save orderSummary to sessionStorage or send to backend
    sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    
    // Redirect to states.html
    window.location.href = 'flower-order-states.html';
}
