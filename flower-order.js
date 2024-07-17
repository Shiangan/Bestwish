document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');
    const orderForm = document.getElementById('flower-order-form');

    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const basketType = e.target.dataset.basket;
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
        const senderName = document.getElementById('sender-name').value;
        const recipientName = document.getElementById('recipient-name').value;
        const recipientAddress = document.getElementById('recipient-address').value;
        const needsInvoice = document.getElementById('invoice').checked;
        const sendersNames = document.getElementById('senders-names').value;

        const order = {
            senderName,
            recipientName,
            recipientAddress,
            needsInvoice,
            sendersNames,
            cart,
        };

        // 將 order 發送到後端或存儲在本地，這裡假設發送到後端
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // 顯示訂單已提交的提示
            window.location.href = 'thank-you.html'; // 導向到感謝頁面
        })
        .catch(error => console.error('Error:', error));
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
