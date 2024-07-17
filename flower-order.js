document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');
    const orderForm = document.getElementById('flower-order-form');

    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const basketType = e.target.dataset.basket;
            const price = e.target.parentElement.dataset.price;

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
        // 保存到本地存储或发送请求到服务器
        // 这里省略了后端部分，可以根据需求进行扩展
        alert('訂單已提交');
        window.location.href = 'thank-you.html';
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
