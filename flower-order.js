document.addEventListener('DOMContentLoaded', function() {
    // Initialize quantities to 0
    const quantityElements = document.querySelectorAll('.quantity-controls span');
    quantityElements.forEach(element => element.textContent = '0');
});

// 修改数量
function changeQuantity(itemId, delta) {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantityElement.textContent, 10);
    quantity += delta;

    // 确保数量不为负
    if (quantity < 0) {
        quantity = 0;
    }

    quantityElement.textContent = quantity;
}

// 显示放大图片
function showImage(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightboxImg.src = imgElement.src;
    lightbox.style.display = 'flex';
}

// 关闭放大图片
function hideImage() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// 更新总金额
function updateTotal() {
    const invoiceCheckbox = document.getElementById('invoice-checkbox').checked;
    const receiptCheckbox = document.getElementById('receipt-checkbox').checked;
    const sameDayPickup = document.getElementById('same-day-pickup').checked;
    
    let totalPrice = 0;
    const cartItems = document.querySelectorAll('.flower-item');
    cartItems.forEach(item => {
        const itemId = item.getAttribute('data-item-id');
        const quantity = parseInt(document.getElementById(`quantity-${itemId}`).textContent, 10);
        const price = parseFloat(item.querySelector('p').textContent.split(' - NT$')[1].replace(',', ''));
        totalPrice += price * quantity;
    });

    let invoiceCharge = 0;
    if (invoiceCheckbox) {
        invoiceCharge = totalPrice * 0.05;
    }

    document.getElementById('invoice-charge').innerText = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').innerText = (totalPrice + invoiceCharge).toFixed(2);

    document.getElementById('invoice-details').style.display = invoiceCheckbox || receiptCheckbox ? 'block' : 'none';
    document.getElementById('receipt-details').style.display = receiptCheckbox ? 'block' : 'none';
}

// 跳转到订单总结页面
function confirmOrder() {
    const form = document.getElementById('order-form');
    const invoiceCheckbox = document.getElementById('invoice-checkbox').checked;
    const receiptCheckbox = document.getElementById('receipt-checkbox').checked;
    const sameDayPickup = document.getElementById('same-day-pickup').checked;

    if (invoiceCheckbox || receiptCheckbox) {
        const recipientName = document.getElementById('recipient-name').value;
        const recipientAddress = document.getElementById('recipient-address').value;

        if (!recipientName || !recipientAddress) {
            alert('请填写收件人姓名和收件地址。');
            return;
        }
    }

    if (!form.checkValidity()) {
        alert('请填写所有必填字段。');
        return;
    }

    const cartItems = [];
    const flowerItems = document.querySelectorAll('.flower-item');
    flowerItems.forEach(item => {
        const itemId = item.getAttribute('data-item-id');
        const quantity = parseInt(document.getElementById(`quantity-${itemId}`).textContent, 10);
        if (quantity > 0) {
            const title = item.querySelector('p').textContent;
            const price = parseFloat(title.split(' - NT$')[1].replace(',', ''));
            cartItems.push({ title, price, quantity });
        }
    });

    // 准备订单数据
    const orderData = {
        name: document.getElementById('name').value,
        orderName: document.getElementById('order-name').value,
        orderNumber: Date.now(), // 示例订单编号
        ordererNames: document.getElementById('orderer-names').value,
        invoiceRequired: invoiceCheckbox,
        companyName: invoiceCheckbox ? document.getElementById('company-name').value : '',
        recipientName: invoiceCheckbox ? document.getElementById('recipient-name').value : '',
        recipientAddress: invoiceCheckbox ? document.getElementById('recipient-address').value : '',
        cartItems: JSON.stringify(cartItems)
    };

    // 跳转到订单总结页面，并传递订单数据作为查询参数
    const queryString = new URLSearchParams(orderData).toString();
    window.location.href = `order-summary.html?${queryString}`;
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
