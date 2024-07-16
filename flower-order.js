document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');
    let cart = [];

    function updateCart() {
        cartItems.innerHTML = '';
        let totalQty = 0;
        let totalAmt = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(listItem);

            totalQty += item.quantity;
            totalAmt += item.price * item.quantity;
        });

        totalQuantity.textContent = totalQty;
        totalPrice.textContent = totalAmt.toFixed(2);
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const basketType = this.dataset.basket;
            const price = this.parentElement.dataset.price;

            const existingItem = cart.find(item => item.name === basketType);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: basketType, price: parseFloat(price), quantity: 1 });
            }

            updateCart();
        });
    });

    document.getElementById('flower-order-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const senderName = document.getElementById('sender-name').value.trim();
        const recipientName = document.getElementById('recipient-name').value.trim();
        const recipientAddress = document.getElementById('recipient-address').value.trim();
        const invoiceRequired = document.getElementById('invoice').value === 'yes';
        const paymentMethod = document.getElementById('payment-method').value;
        const flowerBasketMessage = document.getElementById('flower-basket-message').value.trim();
        let totalAmt = parseFloat(totalPrice.textContent);

        if (invoiceRequired) {
            totalAmt *= 1.1;
        }

        alert(`訂購人姓名: ${senderName}\n收件人姓名: ${recipientName}\n收件人地址: ${recipientAddress}\n是否需要發票: ${invoiceRequired}\n付款方式: ${paymentMethod}\n花籃留言: ${flowerBasketMessage}\n總金額: $${totalAmt.toFixed(2)}`);

        document.getElementById('flower-order-form').reset();
        cart = [];
        updateCart();
    });
});
