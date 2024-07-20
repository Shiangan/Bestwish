window.onload = function() {
    const orderSummary = JSON.parse(sessionStorage.getItem('orderSummary'));

    if (!orderSummary) {
        alert('訂單無效！');
        window.location.href = 'flower-order.html';
        return;
    }

    const summaryDiv = document.getElementById('order-summary');
    summaryDiv.innerHTML = `
        <p>致贈給：${orderSummary.name}</p>
        <p>訂購人姓名：${orderSummary.orderName}</p>
        <p>訂購人電話：${orderSummary.orderNumber}</p>
        <p>落款名單：${orderSummary.ordererNames}</p>
        <p>總金額：$${orderSummary.totalAmount}</p>
        <p>發票附加費 (5%)：$${orderSummary.invoiceCharge}</p>
        <p>最終金額：$${orderSummary.finalAmount}</p>
        ${orderSummary.companyName ? `<p>公司抬頭：${orderSummary.companyName}</p>` : ''}
        <p>收件人姓名：${orderSummary.recipientName}</p>
        <p>收件地址：${orderSummary.recipientAddress}</p>
    `;
}

function makePayment() {
    // Redirect to payment page
    window.location.href = 'thanks.html';
}
