document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');
    const orderForm = document.getElementById('flower-order-form');
    const needInvoiceCheckbox = document.getElementById('need-invoice');
    const invoiceDetailsTextarea = document.getElementById('invoice-details');

    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const basketType = e.target.parentElement.dataset.baskettpe;
            const price = parseInt(e.target.parentElement.dataset.price);

            const item = cart.find(item => item.basketType === basketType);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ basketType, price, quantity: 1 });
            }

            updateCart();
        });
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // 提交訂單到後端處理
        const formData = new FormData(orderForm);
        const orderData = {
            senderName: formData.get('sender-name'),
            recipientName: formData.get('recipient-name'),
            recipientAddress: formData.get('recipient-address'),
            needInvoice: needInvoiceCheckbox.checked,
            invoiceDetails: needInvoiceCheckbox.checked ? formData.get('invoice-details') : null,
            cart: cart
        };

        // 呼叫後端 API
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            alert('感謝您的訂購與祝福！');
            window.location.href = 'thank-you.html'; // 跳轉到感謝頁面
        })
        .catch(error => console.error('Error submitting order:', error));
    });

    needInvoiceCheckbox.addEventListener('change', () => {
        invoiceDetailsTextarea.disabled = !needInvoiceCheckbox.checked;
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let quantity = 0;
        let price = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.basketType} x ${item.quantity} - $${item.price * item.quantity}`;
            cartItems.appendChild(li);
            quantity += item.quantity;
            price += item.price * item.quantity;
        });

        totalQuantity.textContent = quantity;
        totalPrice.textContent = price;
    }
});
