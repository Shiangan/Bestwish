document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to product buttons
    const productButtons = document.querySelectorAll('.product button');
    productButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.parentElement.querySelector('h2').textContent;
            const productPrice = parseFloat(this.parentElement.querySelector('p').textContent.replace('價格: NT$', ''));
            addToCart(productName, productPrice);
        });
    });

    // Handle invoice checkbox change
    document.getElementById('invoice-checkbox').addEventListener('change', calculateTotal);

    // Handle confirm order button click
    document.querySelector('button[type="button"]').addEventListener('click', confirmOrder);

    function addToCart(name, price) {
        const cartItems = document.getElementById('cartItems');
        const existingItem = document.querySelector(`#cartItems li[data-name="${name}"]`);

        if (existingItem) {
            const quantityElem = existingItem.querySelector('.quantity');
            quantityElem.textContent = parseInt(quantityElem.textContent) + 1;
        } else {
            const li = document.createElement('li');
            li.setAttribute('data-name', name);
            li.setAttribute('data-price', price);
            li.innerHTML = `
                ${name} - NT$${price.toFixed(2)} <span class="quantity">1</span>
                <button onclick="removeFromCart(this)">移除</button>
            `;
            cartItems.appendChild(li);
        }

        calculateTotal();
    }

    function removeFromCart(button) {
        button.parentElement.remove();
        calculateTotal();
    }

    function calculateTotal() {
        const cartItems = [...document.querySelectorAll('#cartItems li')];
        let subtotal = 0;

        cartItems.forEach(item => {
            const price = parseFloat(item.getAttribute('data-price'));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            subtotal += price * quantity;
        });

        const needsInvoice = document.getElementById('invoice-checkbox').checked;
        const invoiceCharge = needsInvoice ? subtotal * 0.05 : 0;
        const finalAmount = subtotal + invoiceCharge;

        document.getElementById('total-amount').textContent = subtotal.toFixed(2);
        document.getElementById('invoice-charge').textContent = invoiceCharge.toFixed(2);
        document.getElementById('final-amount').textContent = finalAmount.toFixed(2);
    }

    function confirmOrder() {
        const name = document.getElementById('name').value;
        const ordererName = document.getElementById('order-name').value;
        const orderNumber = document.getElementById('order-number').value;
        const ordererNames = document.getElementById('orderer-names').value;
        const needsInvoice = document.getElementById('invoice-checkbox').checked;
        const companyName = document.getElementById('company-name').value;
        const recipientName = document.getElementById('recipient-name').value;
        const recipientAddress = document.getElementById('recipient-address').value;

        if (!name || !ordererName || !orderNumber || !ordererNames) {
            alert('請填寫所有必填項目！');
            return;
        }

        if (needsInvoice) {
            if (!companyName || !recipientName || !recipientAddress) {
                alert('若需要發票，請填寫公司抬頭及收件人信息！');
                return;
            }
        }

        // Assuming form submission here or redirect to states.html
        window.location.href = 'flower-order-states.html';
    }
});
