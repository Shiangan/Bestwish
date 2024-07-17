document.addEventListener("DOMContentLoaded", function() {
    const cartItems = [];
    const cartItemsElement = document.getElementById("cart-items");
    const totalQuantityElement = document.getElementById("total-quantity");
    const totalPriceElement = document.getElementById("total-price");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const flowerOption = button.closest(".flower-option");
            const price = parseInt(flowerOption.dataset.price, 10);
            const basketType = button.dataset.basket;

            const cartItem = cartItems.find(item => item.basketType === basketType);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cartItems.push({ basketType, quantity: 1, price });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItemsElement.innerHTML = "";
        let totalQuantity = 0;
        let totalPrice = 0;

        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.basketType}: ${item.quantity} 個 - $${item.price * item.quantity}`;
            cartItemsElement.appendChild(li);
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        totalQuantityElement.textContent = totalQuantity;
        totalPriceElement.textContent = totalPrice;
    }

    document.getElementById("flower-order-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const needsInvoice = formData.get("invoice") === "yes";
        const totalPrice = parseInt(totalPriceElement.textContent, 10);
        const finalPrice = needsInvoice ? totalPrice * 1.1 : totalPrice;

        formData.append("total-price", finalPrice);

        // 这里可以将 formData 发送到服务器
        // 例如：fetch("/order", { method: "POST", body: formData })

        // 跳转到感謝頁面
        window.location.href = `thank-you.html?price=${finalPrice}`;
    });
});
