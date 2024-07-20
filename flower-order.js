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
    window.location.href = 'flower-order.states.html';
}
