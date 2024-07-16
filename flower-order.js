// flower-order.js
document.addEventListener('DOMContentLoaded', function () {
    const cartItems = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const basket = this.getAttribute('data-basket');
            const price = parseInt(this.closest('.flower-option').getAttribute('data-price'));

            const item = cartItems.find(item => item.basket === basket);
            if (item) {
                item.quantity += 1;
            } else {
                cartItems.push({ basket, price, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalQuantityValue = 0;
        let totalPriceValue = 0;

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.basket} - $${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(listItem);

            totalQuantityValue += item.quantity;
            totalPriceValue += item.price * item.quantity;
        });

        totalQuantity.textContent = totalQuantityValue;
        totalPrice.textContent = totalPriceValue;
    }

    // Handle order submission
    const flowerOrderForm = document.getElementById('flower-order-form');
    flowerOrderForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const formData = new FormData(flowerOrderForm);
        formData.append('cartItems', JSON.stringify(cartItems));

        fetch('order-processing-endpoint', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                alert('訂單提交成功！');
                window.location.href = 'thank-you.html';
            } else {
                alert('訂單提交失敗，請稍後再試。');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('訂單提交失敗，請稍後再試。');
        });
    });
});
