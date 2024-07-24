function startLinePay() {
    // Redirect to LinePay payment page
    window.location.href = 'https://your-linepay-url.com';
}

function showBankTransfer() {
    // Show bank transfer details section
    document.getElementById('payment-details').style.display = 'block';
}

function submitReceipt() {
    const receiptFile = document.getElementById('receipt').files[0];
    if (receiptFile) {
        const formData = new FormData();
        formData.append('receipt', receiptFile);

        // Simulate form submission for the receipt
        fetch('/submit-receipt', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert('回单已提交成功！');
            window.location.href = 'thank-you.html';  // Redirect to thank you page
        })
        .catch(error => {
            console.error('Error:', error);
            alert('提交回单失败，请重试！');
        });
    } else {
        alert('请上传回单！');
    }
}
