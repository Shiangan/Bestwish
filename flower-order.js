let cart = [];

function openModal(title, imageSrc, description, price) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = `價格: NT$${price}`;
    document.getElementById('quantity').textContent = 1;
    document.getElementById('flowerModal').style.display = 'block';
    document.getElementById('addToCartBtn').dataset.title = title;
    document.getElementById('addToCartBtn').dataset.price = price;
}

function closeModal() {
    document.getElementById('flowerModal').style.display = 'none';
}

function updateQuantity(amount) {
    const quantityElement = document.getElementById('quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += amount;
    if (quantity < 1) quantity = 1;
    quantityElement.textContent = quantity;
}

function addToCart() {
    const title = document.getElementById('addToCartBtn').dataset.title;
    const price = parseInt(document.getElementById('addToCartBtn').dataset.price);
    const quantity = parseInt(document.getElementById('quantity').textContent);

    // 添加到购物车
    cart.push({ title, price, quantity });

    // 更新购物车显示
    updateCart();
    closeModal();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const invoiceCheckbox = document.getElementById('invoice-checkbox');
    let totalPrice = 0;

    // 清空购物车项目
    cartItems.innerHTML = '';

    // 计算总价
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title} x ${item.quantity} - NT$${item.price * item.quantity}`;
        cartItems.appendChild(listItem);
    });

    // 计算发票附加费用
    const invoiceCharge = invoiceCheckbox.checked ? totalPrice * 0.05 : 0;
    const finalAmount = totalPrice + invoiceCharge;

    // 更新显示的价格
    document.getElementById('totalPrice').textContent = `總金額: NT$${totalPrice}`;
    document.getElementById('invoice-charge').textContent = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').textContent = finalAmount.toFixed(2);
    document.getElementById('final-amount').classList.toggle('hidden', cart.length === 0);
}

function confirmOrder() {
    // 获取表单数据
    const form = document.getElementById('order-form');
    const formData = new FormData(form);

    // 处理发票信息
    const invoiceCheckbox = document.getElementById('invoice-checkbox');
    if (invoiceCheckbox.checked) {
        // 需要发票
        const companyName = formData.get('company-name');
        const recipientName = formData.get('recipient-name');
        const recipientAddress = formData.get('recipient-address');

        if (!companyName || !recipientName || !recipientAddress) {
            alert('请填写所有发票信息');
            return;
        }
    }

    // 提交订单数据
    // 你可以在这里添加代码来将订单数据发送到服务器
    alert('訂單已確認！');

    // 重置购物车和表单
    cart = [];
    document.getElementById('cartItems').innerHTML = '';
    document.getElementById('invoice-checkbox').checked = false;
    document.getElementById('invoice-details').classList.add('hidden');
    document.getElementById('final-amount').classList.add('hidden');
    form.reset();
}
