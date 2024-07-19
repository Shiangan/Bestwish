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
        const senderNames = document.getElementById('sender-n
