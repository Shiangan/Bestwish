window.addEventListener('load', function() {
    // Retrieve and display order data
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('name').innerText = urlParams.get('name');
    document.getElementById('order-name').innerText = urlParams.get('orderName');
    document.getElementById('order-number').innerText = urlParams.get('orderNumber');
    document.getElementById('orderer-names').innerText = urlParams.get('ordererNames');
    document.getElementById('invoice').innerText = urlParams.get('invoiceRequired') === 'true' ? '是' : '否';

    if (urlParams.get('invoiceRequired') === 'true') {
        document.getElementById('invoice-info').style.display = 'block';
        document.getElementById('company-name').innerText = urlParams.get('companyName');
        document.getElementById('recipient-name').innerText = urlParams.get('recipientName');
        document.getElementById('recipient-address').innerText = urlParams.get('recipientAddress');
    }

    // Populate cart items
    const cartItems = JSON.parse(urlParams.get('cartItems') || '[]');
    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';
    cartItems.forEach(item => {
        cartItemsList.innerHTML += `<li>${item.title} - NT$${item.price} x ${item.quantity}</li>`;
    });

    // Populate signer names
    const signerNames = urlParams.get('signerNames').split(',');
    const signerNamesList = document.getElementById('signer-names');
    signerNames.forEach(name => {
        signerNamesList.innerHTML += `<li>${name}</li>`;
    });
});

function goToPayment() {
    // Redirect to the payment page with the same order data
    const urlParams = new URLSearchParams(window.location.search);
    window.location.href = `payment-page.html?${urlParams.toString()}`;
}

// Audio controls
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
