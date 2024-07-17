document.addEventListener('DOMContentLoaded', () => {
    const cart = {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    };

    const updateCart = () => {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        cart.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(li);
        });
        document.getElementById('total-quantity').textContent = cart.totalQuantity;
        document.getElementById('total-price').textContent = cart.totalPrice;
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const basket = button.dataset.basket;
            const price = parseInt(button.parentElement.dataset.price, 10);
            const existingItem = cart.items.find(item => item.name === basket);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ name: basket, price: price, quantity: 1 });
            }

            cart.totalQuantity += 1;
            cart.totalPrice += price;

            updateCart();
        });
    });

    document.getElementById('flower-order-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // 提交訂單處理邏輯
        alert('訂單提交成功！');
        window.location.href = 'thank-you.html';
    });
});
