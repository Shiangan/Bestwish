// 获取音频元素
const backgroundMusic = document.getElementById('background-music');

// 检查音频是否播放完毕，如果是则重新播放
backgroundMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
});

// 提交订单表单处理
const flowerOrderForm = document.getElementById('flower-order-form');
flowerOrderForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单提交默认行为

    // 获取订单信息
    const senderName = document.getElementById('sender-name').value;
    const recipientName = document.getElementById('recipient-name').value;
    const deceasedName = document.getElementById('deceased-name').value;
    const tributeList = document.getElementById('tribute-list').value;
    const needInvoice = document.getElementById('need-invoice').checked;

    // 计算总金额
    let totalPrice = calculateTotalPrice(); // 自行编写计算总金额的函数

    // 如果需要发票，增加5%
    if (needInvoice) {
        totalPrice *= 1.05;
    }

    // 显示订单确认模态框
    showOrderConfirmation(senderName, recipientName, deceasedName, tributeList, totalPrice);
});

// 显示订单确认模态框
function showOrderConfirmation(senderName, recipientName, deceasedName, tributeList, totalPrice) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>订单确认</h2>
            <p><strong>往生者姓名：</strong> ${deceasedName}</p>
            <p><strong>訂購人姓名：</strong> ${senderName}</p>
            <p><strong>落款名單：</strong> ${tributeList}</p>
            <p><strong>總金額：</strong> $${totalPrice.toFixed(2)}</p>
            <button id="checkout-button">結帳</button>
        </div>
    `;
    document.body.appendChild(modal);

    // 结算按钮点击事件
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', function() {
        // 处理结算逻辑，例如跳转到支付页面或显示支付方式信息
        alert('点击了结算按钮！');
        // 可以根据具体情况进行跳转或处理
    });
}
