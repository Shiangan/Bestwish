document.addEventListener('DOMContentLoaded', function () {
    const flowerPhotos = document.querySelectorAll('.flower-photo');
    const flowerOrderForm = document.getElementById('flower-order-form');
    const quantityInput = document.getElementById('quantity');
    const decreaseQuantityButton = document.getElementById('decrease-quantity');
    const increaseQuantityButton = document.getElementById('increase-quantity');
    const invoiceCheckbox = document.getElementById('invoice');
    const totalAmountElement = document.getElementById('total-amount');

    let selectedFlowerPhoto = '';
    let quantity = 1;
    let basePrice = 1000; // 假設每個花籃的基礎價格
    let totalPrice = basePrice;

    flowerPhotos.forEach(photo => {
        photo.addEventListener('click', function () {
            selectedFlowerPhoto = photo.src;
            flowerPhotos.forEach(p => p.classList.remove('selected'));
            photo.classList.add('selected');
        });
    });

    decreaseQuantityButton.addEventListener('click', function () {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateTotalAmount();
        }
    });

    increaseQuantityButton.addEventListener('click', function () {
        quantity++;
        quantityInput.value = quantity;
        updateTotalAmount();
    });

    invoiceCheckbox.addEventListener('change', function () {
        updateTotalAmount();
    });

    function updateTotalAmount() {
        totalPrice = basePrice * quantity;
        if (invoiceCheckbox.checked) {
            totalPrice *= 1.05;
        }
        totalAmountElement.textContent = `總計：$${totalPrice.toFixed(2)}`;
    }

    flowerOrderForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const ordererName = document.getElementById('orderer-name').value;
        const ordererPhone = document.getElementById('orderer-phone').value;
        const deceasedName = document.getElementById('deceased-name').value;
         const senderNames = document.getElementById('sender-names').value;
        const requiresInvoice = invoiceCheckbox.checked;

        const orderData = {
            ordererName,
            ordererPhone,
            deceasedName,
            selectedFlowerPhoto,
            quantity,
            requiresInvoice,
            senderNames,
            totalPrice
        };

        localStorage.setItem('flowerOrder', JSON.stringify(orderData));
        displayConfirmation(orderData);
    });

    function displayConfirmation(orderData) {
        document.getElementById('flower-selection').style.display = 'none';
        document.getElementById('order-details').style.display = 'none';

        if (orderData.requiresInvoice) {
            document.getElementById('address-details').style.display = 'block';
        } else {
            showFinalConfirmation(orderData);
        }
    }

    document.getElementById('address-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const recipientName = document.getElementById('recipient-name').value;
        const recipientPhone = document.getElementById('recipient-phone').value;
        const recipientAddress = document.getElementById('recipient-address').value;
        const orderData = JSON.parse(localStorage.getItem('flowerOrder'));
        orderData.recipientName = recipientName;
        orderData.recipientPhone = recipientPhone;
        orderData.recipientAddress = recipientAddress;

        localStorage.setItem('flowerOrder', JSON.stringify(orderData));
        showFinalConfirmation(orderData);
    });

    function showFinalConfirmation(orderData) {
        document.getElementById('address-details').style.display = 'none';
        document.getElementById('confirmation-section').style.display = 'block';

        document.getElementById('confirm-orderer-name').textContent = orderData.ordererName;
        document.getElementById('confirm-orderer-phone').textContent = orderData.ordererPhone;
        document.getElementById('confirm-deceased-name').textContent = orderData.deceasedName;
        document.getElementById('confirm-flower-style').textContent = orderData.selectedFlowerPhoto;
        document.getElementById('confirm-quantity').textContent = orderData.quantity;
        document.getElementById('confirm-invoice').textContent = orderData.requiresInvoice ? '是' : '否';
        document.getElementById('confirm-sender-names').textContent = orderData.senderNames;
        document.getElementById('confirm-total-amount').textContent = `$${orderData.totalPrice.toFixed(2)}`;

        if (orderData.requiresInvoice) {
            document.getElementById('confirm-recipient-name').textContent = orderData.recipientName;
            document.getElementById('confirm-recipient-phone').textContent = orderData.recipientPhone;
            document.getElementById('confirm-recipient-address').textContent = orderData.recipientAddress;
        }

        document.getElementById('finalize-order').addEventListener('click', function () {
            alert('感謝您的訂購！');
            window.location.href = 'obituary.html';
        });
    }
});
