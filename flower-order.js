document.addEventListener('DOMContentLoaded', function () {
    const quantityButtons = document.querySelectorAll('.quantity-button');
    const form = document.getElementById('flower-order-form');
    const invoiceCheckbox = document.getElementById('invoice');
    const invoiceDetails = document.getElementById('invoice-details');
    const orderSummarySection = document.getElementById('order-summary');
    const confirmOrderButton = document.getElementById('confirm-order');

    quantityButtons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            const price = parseFloat(this.getAttribute('data-price'));
            const id = this.getAttribute('data-id');
            const quantityInput = document.getElementById(`${id}-quantity`);
            const priceElement = document.getElementById(`${id}-price`);
            let currentQuantity = parseInt(quantityInput.value);

            if (action === 'increase') {
                currentQuantity++;
            } else if (action === 'decrease' && currentQuantity > 0) {
                currentQuantity--;
            }

            quantityInput.value = currentQuantity;
            priceElement.textContent = `$${currentQuantity * price}`;
            updateTotalPrice();
        });
    });

    function updateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.flower-item').forEach(item => {
            const priceText = item.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            total += price;
        });
        document.getElementById('summary-total-price').textContent = total.toFixed(2);
    }

    invoiceCheckbox.addEventListener('change', function () {
        if (this.checked) {
            invoiceDetails.disabled = false;
        } else {
            invoiceDetails.disabled = true;
            invoiceDetails.value = '';
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 填寫訂單摘要
        document.getElementById('summary-deceased-name').textContent = data['deceased-name'];
        document.getElementById('summary-sender-name').textContent = data['sender-name'];
        document.getElementById('summary-contact-number').textContent = data['contact-number'];
        document.getElementById('summary-tribute-list').textContent = data['tribute-list'] || '無';
        document.getElementById('summary-invoice-needed').textContent = data['invoice'] ? '需要' : '不需要';
        document.getElementById('summary-invoice-details').textContent = data['invoice-details'] || '無';

        form.style.display = 'none';
        orderSummarySection.style.display = 'block';
    });

    confirmOrderButton.addEventListener('click', function () {
        window.location.href = 'thanks.html';
    });
});
