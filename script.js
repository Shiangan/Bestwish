document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const birthDate = urlParams.get('birth-date');
    const deathDate = urlParams.get('death-date');
    const funeralSpace = urlParams.get('funeral-space');
    const funeralDate = urlParams.get('funeral-date');
    const funeralLocation = urlParams.get('funeral-location');
    const otherFuneralLocation = urlParams.get('other-funeral-location');
    const familyServiceTime = urlParams.get('family-service-time');
    const publicServiceTime = urlParams.get('public-service-time');
    const lifeStory = urlParams.get('life-story');
    const musicChoice = urlParams.get('music-choice');
    const photoUpload = urlParams.get('photo');

    document.getElementById('deceased-name').textContent = name;
    document.getElementById('birth-date-text').textContent = birthDate;
    document.getElementById('death-date-text').textContent = deathDate;
    document.getElementById('funeral-space-text').textContent = funeralSpace;
    document.getElementById('funeral-date-text').textContent = funeralDate;
    document.getElementById('funeral-location-text').textContent = funeralLocation === '其他' ? otherFuneralLocation : funeralLocation;
    document.getElementById('family-service-time-text').textContent = familyServiceTime;
    document.getElementById('public-service-time-text').textContent = publicServiceTime;
    document.getElementById('life-story-text').textContent = lifeStory;

    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.src = musicChoice;
    backgroundMusic.play();

    if (photoUpload) {
        const photoElement = document.getElementById('deceased-photo');
        photoElement.src = photoUpload;
        photoElement.style.display = 'block';
        photoElement.style.opacity = 0;
        setTimeout(() => {
            photoElement.style.transition = 'opacity 2s';
            photoElement.style.opacity = 1;
        }, 100);
    }

    document.getElementById('message-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const message = document.getElementById('message-input').value.trim();
        if (message === '') return;

        const messagesDiv = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = message;
        messagesDiv.appendChild(messageDiv);

        document.getElementById('message-form').reset();
    });

    document.getElementById('flower-order-button').addEventListener('click', function() {
        window.location.href = 'flower-order.html';
    });
});
    document.addEventListener('DOMContentLoaded', function() {
       const cartItems = document.getElementById('cart-items');
       const totalQuantity = document.getElementById('total-quantity');
       const totalPrice = document.getElementById('total-price');
       let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const cartItems = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');
    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const basketType = this.getAttribute('data-basket');
            const price = parseInt(this.parentElement.getAttribute('data-price'));

            const existingItem = cart.find(item => item.type === basketType);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ type: basketType, price: price, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let totalQuantityValue = 0;
        let totalPriceValue = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.type} 花籃 - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(listItem);

            totalQuantityValue += item.quantity;
            totalPriceValue += item.price * item.quantity;
        });

        totalQuantity.textContent = totalQuantityValue;
        totalPrice.textContent = totalPriceValue;

        document.getElementById('invoice').addEventListener('change', function() {
            if (this.value === 'yes') {
                totalPrice.textContent = totalPriceValue * 1.1;
            } else {
                totalPrice.textContent = totalPriceValue;
            }
        });
    }

    document.getElementById('flower-order-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const orderDetails = {
            senderName: document.getElementById('sender-name').value,
            recipientName: document.getElementById('recipient-name').value,
            recipientAddress: document.getElementById('recipient-address').value,
            invoice: document.getElementById('invoice').value,
            paymentMethod: document.getElementById('payment-method').value,
            message: document.getElementById('flower-basket-message').value,
            cart: cart
        };

        // 在這裡處理訂單提交，例如發送到伺服器或儲存到本地
        console.log(orderDetails);
        
        // 重置表單
        this.reset();
        cart = [];
        updateCart();
    });
});
