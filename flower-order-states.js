<script>
    document.addEventListener('DOMContentLoaded', function() {
        const order = JSON.parse(localStorage.getItem('order'));
        if (!order) {
            alert('沒有找到訂單信息，請返回重新填寫訂單。');
            window.location.href = 'flower-order.html';
            return;
        }

        const orderSummary = `
            <p>花籃樣式: ${order.selectedStyle}</p>
            <p>數量: ${order.quantity} 對</p>
            <p>單價: $${order.unitPrice}</p>
            <p>總金額: $${order.totalAmount}</p>
            <p>發票附加費: $${order.invoiceCharge.toFixed(2)}</p>
            <p>最終金額: $${order.finalAmount.toFixed(2)}</p>
            <p>故人姓名: ${order.name}</p>
            <p>訂購人姓名: ${order.orderName}</p>
            <p>訂購人聯絡電話: ${order.orderNumber}</p>
            <p>落款人名單: ${order.ordererNames}</p>
            ${order.needsInvoice ? `<p>發票抬頭: ${order.companyName}</p><p>收件人姓名: ${order.recipientName}</p><p>收件地址: ${order.recipientAddress}</p>` : ''}
        `;
        document.getElementById('order-summary').innerHTML = orderSummary;
    });

    function confirmPayment() {
        // 模拟付款确认
        alert('付款已確認，感謝您的訂購！');
        window.location.href = 'thanks.html';
    }
</script>
<button onclick="confirmPayment()">確認付款</button>
