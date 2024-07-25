let cart = [];
let currentProduct = null;

function openModal(name, image, description, price) {
    currentProduct = { name, image, description, price, quantity: 1 };
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('quantity').innerText = 1;
    document.getElementById('flowerModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('flowerModal').style.display = 'none';
}

function updateQuantity(amount) {
    if (currentProduct && currentProduct.quantity + amount >= 1) {
        currentProduct.quantity += amount;
        document.getElementById('quantity').innerText = currentProduct.quantity;
    }
}

function addToCart() {
    if (currentProduct) {
        cart.push(currentProduct);
        updateCart();
        closeModal();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p>數量: ${item.quantity}</p>
                <p>價格: NT$${item.price * item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-btn">移除</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    document.getElementById('totalPrice').innerText = `總金額（未稅）: NT$${total}`;
    updateTotal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const invoiceChecked = document.getElementById('invoice-checkbox').checked;
    const invoiceCharge = invoiceChecked ? total * 0.05 : 0;
    document.getElementById('invoice-charge').innerText = invoiceCharge.toFixed(0);
    document.getElementById('final-amount').innerText = (total + invoiceCharge).toFixed(0);
    document.getElementById('invoice-details').style.display = invoiceChecked ? 'block' : 'none';
}

function confirmOrder() {
    // 将订单信息存储并跳转到订单状态页面
    const orderDetails = {
        recipientName: document.getElementById('recipient-name').value,
        ordererName: document.getElementById('orderer-name').value,
        ordererPhone: document.getElementById('orderer-phone').value,
        ordererNames: document.getElementById('orderer-names').value,
        companyName: document.getElementById('company-name').value,
        recipientAddress: document.getElementById('recipient-address').value,
        cart,
        finalAmount: document.getElementById('final-amount').innerText
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = 'order-flower-states.html';
    return false;  // Prevent form submission
}

document.getElementById('play-music').addEventListener('click', function() {
    document.getElementById('background-music').play();
    document.getElementById('play-music').style.display = 'none';
    document.getElementById('stop-music').style.display = 'inline';
});

document.getElementById('stop-music').addEventListener('click', function() {
    document.getElementById('background-music').pause();
    document.getElementById('play-music').style.display = 'inline';
    document.getElementById('stop-music').style.display = 'none';
});
