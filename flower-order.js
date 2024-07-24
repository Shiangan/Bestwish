// flower-order.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize quantities to 0
    const quantityElements = document.querySelectorAll('.quantity');
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

// 跳转到订单总结页面
function goToOrderSummary() {
    // 收集购物车商品和其他订单数据
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
        name: '张三', // 根据需要替换为动态数据
        orderName: '花篮订购',
        orderNumber: Date.now(), // 示例订单编号
        ordererNames: '李四,王五', // 根据需要替换为动态数据
        invoiceRequired: false, // 根据需要替换为动态数据
        companyName: '', // 根据需要替换为动态数据（如果需要发票）
        recipientName: '', // 根据需要替换为动态数据（如果需要发票）
        recipientAddress: '', // 根据需要替换为动态数据（如果需要发票）
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
