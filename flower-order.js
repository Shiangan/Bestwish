document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('flower-order-form');
    const totalPriceElement = document.getElementById('total-price');
    const invoiceSelect = document.getElementById('invoice');
    const invoiceDetails = document.getElementById('invoice-details');

    // 更新價格
    function updatePrice() {
        let total = 0;
        const flowerOptions = document.querySelectorAll('.flower-option');

        flowerOptions.forEach(option => {
            const price = parseFloat(option.querySelector('.increase').getAttribute('data-price'));
            const quantity = parseInt(option.querySelector('.quantity').value);
            total += price * quantity;
        });

        const isInvoice = invoiceSelect.value === 'yes';
        if (isInvoice) {
            total *= 1.05; // 加上5%的發票費用
        }

        totalPriceElement.textContent = `總計: $${total.toFixed(2)}`;
    }

    // 事件處理: +1 和 -1 按鈕
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function () {
            const quantityInput = this.parentElement.querySelector('.quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updatePrice();
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function () {
            const quantityInput = this.parentElement.querySelector('.quantity');
            quantityInput.value = Math.max(parseInt(quantityInput.value) - 1, 0);
            updatePrice();
        });
    });

    // 顯示/隱藏發票詳細資訊
    invoiceSelect.addEventListener('change', function () {
        if (this.value === 'yes') {
            invoiceDetails.style.display = 'block';
        } else {
            invoiceDetails.style.display = 'none';
        }
    });

    // 提交表單
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // 收集表單數據
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 保存數據到 localStorage（可選）
        localStorage.setItem('flowerOrder', JSON.stringify(data));

        // 跳轉到訂單狀態頁面
        window.location.href = 'flower-order-states.html';
    });
});
