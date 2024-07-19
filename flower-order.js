document.addEventListener('DOMContentLoaded', function () {
    const flowerTypeButtons = document.querySelectorAll('.plus-minus');
    const totalAmountElement = document.getElementById('total-amount');
    const flowerOrderForm = document.getElementById('flower-order-form');
    
    let flowerPrices = {
        flower1: 2500, // 示例價格，根據實際情況修改
        flower2: 3000,
        flower3: 3500,
        flower4: 4000,
        flower5: 4500,
        flower6: 5500,
        // 其他花籃樣式
    };

    let orderData = {
        flower1: 0,
        flower2: 0,
        flower3: 0,
        // 初始化其他花籃樣式數量
    };

    function updateTotalAmount() {
        let total = 0;
        for (let type in orderData) {
            total += orderData[type] * flowerPrices[type];
        }
        totalAmountElement.textContent = total.toFixed(2);
    }

    flowerTypeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            if (this.textContent === '+1') {
                orderData[type]++;
            } else if (this.textContent === '-1' && orderData[type] > 0) {
                orderData[type]--;
            }
            updateTotalAmount();
        });
    });

    flowerOrderForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // 確認訂單處理
        alert('訂單已提交！');
    });

    // 初始化
    updateTotalAmount();
});
