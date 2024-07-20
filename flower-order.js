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
                         <button onclick="changeQuantity('${item}', 1)">+1</button> 
                         <button onclick="showDetails('${item}')">查看详情</button>`;
        cartItems.appendChild(li);
    }

    let isInvoice = document.getElementById('invoice-checkbox').checked;
    if (isInvoice) {
        invoiceCharge = totalAmount * 0.05;
    }

    document.getElementById('totalPrice').innerText = `总金额（未税）: NT$${totalAmount.toFixed(2)}`;
    document.getElementById('invoice-charge').innerText = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').innerText = (totalAmount + invoiceCharge).toFixed(2);
}

// 显示商品详情模态窗口
function showDetails(itemName) {
    let item = cart[itemName];
    document.getElementById('modalTitle').innerText = itemName;
    document.getElementById('modalImage').src = item.imageUrl;
    document.getElementById('modalDescription').innerText = item.description;
    document.getElementById('flowerModal').style.display = 'block';
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
    let invoiceDetails = document.getElementById('invoice-details');
    let receiptDetails = document.getElementById('receipt-details');
    let isInvoice = document.getElementById('invoice-checkbox').checked;
    
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
    let name = document.getElementById('name').value;
    let orderName = document.getElementById('order-name').value;
    let orderNumber = document.getElementById('order-number').value;
    let ordererNames = document.getElementById('orderer-names').value;
    let isInvoice = document.getElementById('invoice-checkbox').checked;
    let companyName = isInvoice ? document.getElementById('company-name').value : '';
    let recipientName = isInvoice ? document.getElementById('recipient-name').value : '';
    let recipientAddress = isInvoice ? document.getElementById('recipient-address').value : '';

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

window.addEventListener('load', function() {
    document.getElementById('play-music').style.display = 'block';
    document.getElementById('stop-music').style.display = 'none';
});
