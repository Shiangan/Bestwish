let cart = [];
let currentProduct = null;

function openModal(title, image, description, price) {
    currentProduct = { title, image, description, price, quantity: 1 };
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('quantity').innerText = 1;
    document.getElementById('flowerModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('flowerModal').style.display = 'none';
}

function updateQuantity(amount) {
    const quantityElement = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityElement.innerText);
    currentQuantity = Math.max(1, currentQuantity + amount);
    quantityElement.innerText = currentQuantity;
}

function addToCart() {
    if (currentProduct) {
        const quantity = parseInt(document.getElementById('quantity').innerText);
        const existingItem = cart.find(item => item.title === currentProduct.title);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...currentProduct, quantity });
        }
        closeModal();
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <li>${item.title} - NT$${item.price} x ${item.quantity}</li>
        `;
    });

    const invoiceCheckbox = document.getElementById('invoice-checkbox');
    const invoiceCharge = invoiceCheckbox.checked ? total * 0.05 : 0;
    const finalAmount = total + invoiceCharge;

    document.getElementById('totalPrice').innerText = `總金額（未稅）: NT$${total}`;
    document.getElementById('invoice-charge').innerText = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').innerText = finalAmount.toFixed(2);
}

function updateTotal() {
    updateCart();
    document.getElementById('invoice-details').style.display = document.getElementById('invoice-checkbox').checked ? 'block' : 'none';
}

function confirmOrder() {
    const form = document.getElementById('order-form');
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        orderName: formData.get('order-name'),
        orderNumber: formData.get('order-number'),
        ordererNames: formData.get('orderer-names'),
        companyName: formData.get('company-name') || null,
        recipientName: formData.get('recipient-name') || null,
        recipientAddress: formData.get('recipient-address') || null,
        invoiceRequired: document.getElementById('invoice-checkbox').checked
    };

    // Perform validation
    if (!data.name || !data.orderName || !data.orderNumber || !data.ordererNames) {
        alert('请填写所有必填项！');
        return;
    }

    // Log the order data for now
    console.log('Order data:', data);

    // Redirect to the order status page
    window.location.href = 'flower-order-states.html';
}

// Audio controls
document.getElementById('play-music').addEventListener('click', function() {
    document.getElementById('background-music').play();
    this.style.display = 'none';
    document.getElementById('stop-music').style.display = 'block';
});

document.getElementById('stop-music').addEventListener('click', function() {
    document.getElementById('background-music').pause();
    this.style.display = 'none';
    document.getElementById('play-music').style.display = 'block';
});
