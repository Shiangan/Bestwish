// flower-order.js

// 更新购物车数量和金额
function updateQuantity(change) {
    const quantityElement = document.getElementById('quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + change); // 保证数量至少为 1
    quantityElement.textContent = quantity;
    updateTotal();
}

// 打开模态窗口
function openModal(title, imageUrl, description, price) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImage').src = imageUrl;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('addToCartBtn').dataset.price = price;
    document.getElementById('flowerModal').style.display = 'flex';
}

// 关闭模态窗口
function closeModal() {
    document.getElementById('flowerModal').style.display = 'none';
}

// 更新总金额
function updateTotal() {
    const quantity = parseInt(document.getElementById('quantity').textContent);
    const price = parseInt(document.getElementById('addToCartBtn').dataset.price);
    const subtotal = quantity * price;
    const invoiceCheckbox = document.getElementById('invoice-checkbox').checked;
    const invoiceCharge = invoiceCheckbox ? subtotal * 0.05 : 0;
    const finalAmount = subtotal + invoiceCharge;

    document.getElementById('totalPrice').textContent = `總金額（未稅）: NT$${subtotal}`;
    document.getElementById('invoice-charge').textContent = invoiceCharge.toFixed(0);
    document.getElementById('final-amount').textContent = finalAmount.toFixed(0);
}

// 添加到购物车
function addToCart() {
    const title = document.getElementById('modalTitle').textContent;
    const quantity = parseInt(document.getElementById('quantity').textContent);
    const price = parseInt(document.getElementById('addToCartBtn').dataset.price);
    const item = `${title} x${quantity} - NT$${quantity * price}`;

    const cartItems = document.getElementById('cartItems');
    const listItem = document.createElement('li');
    listItem.textContent = item;
    cartItems.appendChild(listItem);

    closeModal();
    updateTotal();
}

// 处理表单提交
function handleOrderSubmit() {
    // 表单数据验证（例如，可以在这里添加更多的验证逻辑）
    const form = document.getElementById('order-form');
    if (form.checkValidity()) {
        // 提交表单的逻辑（可以是 AJAX 请求）
        // 这里模拟表单提交后重定向到 order-flower-states 页面
        window.location.href = 'order-flower-states.html';
        return false; // 阻止表单的默认提交行为
    }
    return false; // 阻止表单的默认提交行为
}

// 控制背景音乐
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
