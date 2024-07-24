document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 读取订单信息
    const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));

    if (orderInfo) {
        document.getElementById('name').textContent = orderInfo.name;
        document.getElementById('order-name').textContent = orderInfo.orderName;
        document.getElementById('order-number').textContent = orderInfo.orderNumber;
        document.getElementById('orderer-names').textContent = orderInfo.ordererNames;
        document.getElementById('invoice').textContent = orderInfo.isInvoice ? '是' : '否';

        if (orderInfo.isInvoice) {
            document.getElementById('invoice-info').style.display = 'block';
            document.getElementById('company-name').textContent = orderInfo.companyName;
            document.getElementById('recipient-name').textContent = orderInfo.recipientName;
            document.getElementById('recipient-address').textContent = orderInfo.recipientAddress;
        }

        let signerNames = document.getElementById('signer-names');
        orderInfo.signerNames.forEach(function(signer) {
            let li = document.createElement('li');
            li.textContent = signer;
            signerNames.appendChild(li);
        });

        let cartItems = document.getElementById('cartItems');
        for (let item in orderInfo.cart) {
            let li = document.createElement('li');
            li.textContent = `${item} - NT$${orderInfo.cart[item].price} x ${orderInfo.cart[item].quantity}`;
            cartItems.appendChild(li);
        }
    } else {
        alert('没有找到订单信息。');
    }
});

function goToPayment() {
    // 显示感谢模态框
    document.getElementById('thankYouModal').style.display = 'block';
}

function closeThankYouModal() {
    document.getElementById('thankYouModal').style.display = 'none';
}

function redirectToPaymentPage() {
    // 假设付款完成后清除 localStorage
    localStorage.removeItem('orderInfo');
    // 重定向到付款页面
    window.location.href = 'payment-page.html'; // 付款页面地址
}

// 音乐控制
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
