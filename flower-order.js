        cart[name] = { price: price, quantity: 1 };
    }
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cartItems');
    let totalAmount = 0;
    let invoiceCharge = 0;

    cartItems.innerHTML = '';
    for (let item in cart) {
        let itemTotal = cart[item].price * cart[item].quantity;
        totalAmount += itemTotal;

        let li = document.createElement('li');
        li.innerHTML = `${item} - NT$${cart[item].price} x ${cart[item].quantity} 
                         <button onclick="changeQuantity('${item}', -1)">-</button> 
                         <button onclick="changeQuantity('${item}', 1)">+</button>`;
        cartItems.appendChild(li);
    }

    let isInvoice = document.getElementById('invoice-checkbox').checked;
    if (isInvoice) {
        invoiceCharge = totalAmount * 0.05;
    }

    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
    document.getElementById('invoice-charge').innerText = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').innerText = (totalAmount + invoiceCharge).toFixed(2);
}

function changeQuantity(item, change) {
    if (cart[item]) {
        cart[item].quantity += change;
        if (cart[item].quantity <= 0) {
            delete cart[item];
        }
        updateCart();
    }
}

function toggleInvoiceDetails() {
    let invoiceDetails = document.getElementById('invoice-details');
    if (document.getElementById('invoice-checkbox').checked) {
        invoiceDetails.style.display = 'block';
    } else {
        invoiceDetails.style.display = 'none';
    }
}

function confirmOrder() {
    let name = document.getElementById('name').value;
    let orderName = document.getElementById('order-name').value;
    let orderNumber = document.getElementById('order-number').value;
    let ordererNames = document.getElementById('orderer-names').value;
    let isInvoice = document.getElementById('invoice-checkbox').checked;
    let companyName = isInvoice ? document.getElementById('company-name').value : '';
    let recipientName = isInvoice ? document.getElementById('recipient-name').value : '';
    let recipientAddress = isInvoice ? document.getElementById('recipient-address').value : '';

    if (name && orderName && orderNumber && ordererNames && (!isInvoice || (companyName && recipientName && recipientAddress))) {
        // Redirect to states.html
        window.location.href = 'flower-order-states.html';
    } else {
        alert('請填寫所有必要的欄位。');
    }
}

// Music controls
document.getElementById('play-music').addEventListener('click', function() {
    document.getElementById('background-music').play();
    this.style.display = 'none';
    document.getElementById('stop-music').style.display = 'inline-block';
});

document.getElementById('stop-music').addEventListener('click', function() {
    document.getElementById('background-music').pause();
    this.style.display = 'none';
    document.getElementById('play-music').style.display = 'inline-block';
});
