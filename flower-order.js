document.addEventListener('DOMContentLoaded', () => {
    const flowerOptions = document.querySelectorAll('.flower-option');
    const cartItems = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');
    const flowerOrderForm = document.getElementById('flower-order-form');
    const viewCartBtn = document.getElementById('view-cart');
    const needInvoiceCheckbox = document.getElementById('need-invoice');
    const invoiceDetailsTextarea = document.getElementById('invoice-details');
    const paymentMethodSection = document.getElementById('payment-method');

    let cart = [];

    // 添加到購物車按鈕點擊事件
    flowerOptions.forEach(option => {
        option.querySelector('.add-to-cart').addEventListener('click', () => {
            const basketType = option.dataset.baskettpe;
            const price = parseInt(option.dataset.price);

            // 檢查購物車中是否已存在該類型的花籃
            let item = cart.find(i => i.type === basketType);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ type: basketType, price: price, quantity: 1 });
            }

            // 更新購物車顯示
            displayCart();
        });
    });

    // 查看我的購物車按鈕點擊事件
    viewCartBtn.addEventListener('click', () => {
        displayCart();
        // 滾動到購物車部分
        document.getElementById('shopping-cart').scrollIntoView({ behavior: 'smooth' });
    });

    // 更新購物車顯示
    function displayCart() {
        cartItems.innerHTML = '';
        let totalQty = 0;
        let totalPriceValue = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.type} - $${item.price} x ${item.quantity}`;

            // 添加 +1 和 -1 按鈕
            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+1';
            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                displayCart();
            });

            const decreaseBtn = document.createElement('button');
            decreaseBtn.textContent = '-1';
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(i => i.type !== item.type);
                }
                displayCart();
            });

            li.appendChild(increaseBtn);
            li.appendChild(decreaseBtn);
            cartItems.appendChild(li);

            totalQty += item.quantity;
            totalPriceValue += item.price * item.quantity;
        });

        // 如果需要發票，增加5%稅金
        if (needInvoiceCheckbox.checked) {
            totalPriceValue *= 1.05;
        }

        totalQuantity.textContent = totalQty;
        totalPrice.textContent = totalPriceValue.toFixed(2);

        // 显示支付方式部分
        paymentMethodSection.style.display = 'block';
    }

    // 是否需要發票複選框事件
    needInvoiceCheckbox.addEventListener('change', () => {
        if (needInvoiceCheckbox.checked) {
            invoiceDetailsTextarea.removeAttribute('disabled');
        } else {
            invoiceDetailsTextarea.setAttribute('disabled', 'disabled');
        }
        displayCart(); // 更新總價
    });

    // 提交訂單表單事件
    flowerOrderForm.addEventListener('submit', event => {
        event.preventDefault();

        // 獲取表單數據
        const formData = new FormData(flowerOrderForm);
        formData.append('cart', JSON.stringify(cart));

        // 提交訂單到服務器（假設API接口為/submit-order）
        fetch('/submit-order', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('訂單提交成功:', data);
            // 清空購物車
            cart = [];
            displayCart(); // 更新購物車顯示
            // 顯示支付成功信息，例如匯款單號等
            alert(`訂單提交成功！匯款單號：${data.remittanceNumber}`);
            // 跳轉到感謝頁面
            window.location.href = '/thanks.html';
        })
        .catch(error => {
            console.error('訂單提交失敗:', error);
            // 提示訂單提交失敗
            alert('訂單提交失敗，請重試！');
        });
    });

    // 當需要發票時，啟用發票詳細信息輸入框
    needInvoiceCheckbox.addEventListener('change', () => {
        if (needInvoiceCheckbox.checked) {
            invoiceDetailsTextarea.removeAttribute('disabled');
        } else {
            invoiceDetailsTextarea.setAttribute('disabled', 'disabled');
        }
        displayCart(); // 更新總價
    });
});
