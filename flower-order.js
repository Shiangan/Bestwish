document.addEventListener('DOMContentLoaded', () => {
    const selectButtons = document.querySelectorAll('.select-basket');
    const totalPriceElement = document.getElementById('total-price');
    const invoiceCheckbox = document.getElementById('invoice');
    const invoiceInfo = document.getElementById('invoice-info');
    const nextStepBtn = document.getElementById('next-step-btn');
    let selectedPrice = 0;

    // 選擇花籃
    selectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const basketPrice = e.target.closest('.flower-option').getAttribute('data-price');
            selectedPrice = parseFloat(basketPrice);
            totalPriceElement.textContent = selectedPrice.toFixed(2);
        });
    });

    // 顯示/隱藏發票資訊
    invoiceCheckbox.addEventListener('change', () => {
        if (invoiceCheckbox.checked) {
            invoiceInfo.classList.remove('hidden');
        } else {
            invoiceInfo.classList.add('hidden');
        }
    });

    // 確認訂購按鈕事件
    nextStepBtn.addEventListener('click', () => {
        const ordererName = document.getElementById('orderer-name').value.trim();
        const contactPhone = document.getElementById('contact-phone').value.trim();
        const deceasedName = document.getElementById('deceased-name').value.trim();
        const invoiceChecked = invoiceCheckbox.checked;
        const invoiceHeader = document.getElementById('invoice-header')?.value.trim();
        const invoiceAddress = document.getElementById('invoice-address')?.value.trim();

        if (!ordererName || !contactPhone || !deceasedName) {
            alert('請填寫所有必填項目');
            return;
        }

        if (invoiceChecked && (!invoiceHeader || !invoiceAddress)) {
            alert('發票資訊不完整');
            return;
        }

        // 這裡可以添加代碼將訂單資料提交到伺服器
        alert('訂單已確認，請進行付款');
        window.location.href = 'flower-order-states.html'; // 跳轉到訂單狀態頁面
    });
});
