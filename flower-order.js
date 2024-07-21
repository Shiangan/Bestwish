let cart = {};

// 添加商品到购物车
function addToCart(name, price, imageUrl, description) {
    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        cart[name] = { price: price, quantity: 1, imageUrl: imageUrl, description: description };
    }
    updateCart();
}

// 更新购物车显示
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmountElem = document.getElementById('totalPrice');
    const invoiceChargeElem = document.getElementById('invoice-charge');
    const finalAmountElem = document.getElementById('final-amount');
    let totalAmount = 0;
    let invoiceCharge = 0;

    cartItems.innerHTML = '';
    for (const item in cart) {
        const itemTotal = cart[item].price * cart[item].quantity;
        totalAmount += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item} - NT$${cart[item].price} x ${cart[item].quantity} 
            <button onclick="changeQuantity('${item}', -1)">-</button> 
            <button onclick="changeQuantity('${item}', 1)">+1</button> 
            <button onclick="showDetails('${item}')">查看详情</button>
        `;
        cartItems.appendChild(li);
    }

    const isInvoice = document.getElementById('invoice-checkbox').checked;
    if (isInvoice) {
        invoiceCharge = totalAmount * 0.05;
    }

    totalAmountElem.innerText = `总金额（未税）: NT$${totalAmount.toFixed(2)}`;
    invoiceChargeElem.innerText = `发票附加费: NT$${invoiceCharge.toFixed(2)}`;
    finalAmountElem.innerText = `总金额（含税）: NT$${(totalAmount + invoiceCharge).toFixed(2)}`;
}

// 显示商品详情模态窗口
function showDetails(itemName) {
    const item = cart[itemName];
    if (item) {
        document.getElementById('modalTitle').innerText = itemName;
        document.getElementById('modalImage').src = item.imageUrl;
        document.getElementById('modalDescription').innerText = item.description;
        document.getElementById('flowerModal').style.display = 'block';
    }
}

// 关闭模态窗口
function closeModal() {
    document.getElementById('flowerModal').style.display = 'none';
}

// 改变商品数量
function changeQuantity(item, change) {
    if (cart[item]) {
        cart[item].quantity += change;
        if (cart[item].quantity <= 0) {
            delete cart[item];
        }
        updateCart();
    }
}

// 切换发票详细信息显示
function toggleInvoiceDetails() {
    const invoiceDetails = document.getElementById('invoice-details');
    const receiptDetails = document.getElementById('receipt-details');
    const isInvoice = document.getElementById('invoice-checkbox').checked;
    
    if (isInvoice) {
        invoiceDetails.style.display = 'block';
        receiptDetails.style.display = 'none';
    } else {
        invoiceDetails.style.display = 'none';
        receiptDetails.style.display = 'block';
    }
}

// 确认订单
function confirmOrder() {
    const name = document.getElementById('name').value;
    const orderName = document.getElementById('order-name').value;
    const orderNumber = document.getElementById('order-number').value;
    const ordererNames = document.getElementById('orderer-names').value;
    const isInvoice = document.getElementById('invoice-checkbox').checked;
    const companyName = isInvoice ? document.getElementById('company-name').value : '';
    const recipientName = isInvoice ? document.getElementById('recipient-name').value : '';
    const recipientAddress = isInvoice ? document.getElementById('recipient-address').value : '';

    if (name && orderName && orderNumber && ordererNames && (!isInvoice || (companyName && recipientName && recipientAddress))) {
        // 保存订单信息到 localStorage
        localStorage.setItem('orderInfo', JSON.stringify({
            name: name,
            orderName: orderName,
            orderNumber: orderNumber,
            ordererNames: ordererNames,
            isInvoice: isInvoice,
            companyName: companyName,
            recipientName: recipientName,
            recipientAddress: recipientAddress,
            cart: cart
        }));

        // 跳转到确认页面
        window.location.href = 'flower-order-states.html';
    } else {
        alert('请填写所有必要的字段。');
    }
}

// 音乐控制
const playMusicButton = document.getElementById('play-music');
const stopMusicButton = document.getElementById('stop-music');
const backgroundMusic = document.getElementById('background-music');

playMusicButton.addEventListener('click', function() {
    if (backgroundMusic) {
        backgroundMusic.play();
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'block';
    }
});

stopMusicButton.addEventListener('click', function() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        stopMusicButton.style.display = 'none';
        playMusicButton.style.display = 'block';
    }
});

window.addEventListener('load', function() {
    playMusicButton.style.display = 'block';
    stopMusicButton.style.display = 'none';
});
