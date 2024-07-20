// 初始化購物車
let cart = {};

// 添加商品到購物車
function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        cart[name] = { price: price, quantity: 1 };
    }
    updateCart();
}

// 更新購物車顯示
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
                         <button onclick="changeQuantity('${item}', 1)">+1</button>`;
        cartItems.appendChild(li);
    }

    let isInvoice = document.getElementById('invoice-checkbox').checked;
    if (isInvoice) {
        invoiceCharge = totalAmount * 0.05;
    }

    document.getElementById('totalPrice').innerText = `總金額（未稅）: NT$${totalAmount.toFixed(2)}`;
    document.getElementById('invoice-charge').innerText = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').innerText = (totalAmount + invoiceCharge).toFixed(2);
}

// 改變商品數量
function changeQuantity(item, change) {
    if (cart[item]) {
        cart[item].quantity += change;
        if (cart[item].quantity <= 0) {
            delete cart[item];
        }
        updateCart();
    }
}

// 切換發票詳細信息顯示
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

// 確認訂單
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
        window.location.href = 'states.html';
    } else {
        alert('請填寫所有必要的欄位。');
    }
}

// 音樂控制
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

// 頁面加載完成後，初始化音樂控制
window.addEventListener('load', function() {
    document.getElementById('play-music').style.display = 'block';
    document.getElementById('stop-music').style.display = 'none';
});
