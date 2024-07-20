window.addEventListener('load', function() {
    // 从 localStorage 获取订单信息
    let orderInfo = JSON.parse(localStorage.getItem('orderInfo'));
    if (!orderInfo) {
        alert('订单信息未找到，请返回重新填写。');
        window.location.href = 'flower-order.html';
        return;
    }

    // 显示订单信息
    document.getElementById('confirm-name').innerText = orderInfo.name;
    document.getElementById('confirm-order-name').innerText = orderInfo.orderName;
    document.getElementById('confirm-order-number').innerText = orderInfo.orderNumber;
    document.getElementById('confirm-orderer-names').innerText = orderInfo.ordererNames;
    document.getElementById('confirm-invoice').innerText = orderInfo.isInvoice ? '是' : '否';

    if (orderInfo.isInvoice) {
        document.getElementById('company-name-summary').style.display = 'block';
        document.getElementById('confirm-company-name').innerText = orderInfo.companyName;
        document.getElementById('recipient-name-summary').style.display = 'block';
        document.getElementById('confirm-recipient-name').innerText = orderInfo.recipientName;
        document.getElementById('recipient-address-summary').style.display = 'block';
        document.getElementById('confirm-recipient-address').innerText = orderInfo.recipientAddress;
    }

    let cart = orderInfo.cart;
    let cartItemsSummary = document.getElementById('cartItemsSummary');
    let totalAmount = 0;
    let invoiceCharge = 0;

    cartItemsSummary.innerHTML = '';
    for (let item in cart) {
        let itemTotal = cart[item].price * cart[item].quantity;
        totalAmount += itemTotal;

        let li = document.createElement('li');
        li.innerHTML = `${item} - NT$${cart[item].price} x ${cart[item].quantity}`;
        cartItemsSummary.appendChild(li);
    }

    if (orderInfo.isInvoice) {
        invoiceCharge = totalAmount * 0.05;
    }

    document.getElementById('confirm-total-price').innerText = totalAmount.toFixed(2);
    document.getElementById('confirm-invoice-charge').innerText = invoiceCharge.toFixed(2);
    document.getElementById('confirm-final-amount').innerText = (totalAmount + invoiceCharge).toFixed(2);
});

// 跳转到付款页面
function proceedToPayment() {
    // 进行付款处理
    alert('请继续到付款页面进行结账。');
    // 可以在这里处理付款逻辑
    // 跳转到付款页面（示例）
    window.location.href = 'payment.html';
}
