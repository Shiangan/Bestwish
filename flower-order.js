document.addEventListener('DOMContentLoaded', function() {
  const flowerOptions = document.querySelectorAll('.flower-option');
  const cartItems = document.getElementById('cart-items');
  const totalQuantity = document.getElementById('total-quantity');
  const totalPrice = document.getElementById('total-price');
  const flowerOrderForm = document.getElementById('flower-order-form');
  const needInvoiceCheckbox = document.getElementById('need-invoice');
  const invoiceDetailsTextarea = document.getElementById('invoice-details');

  let cart = [];

  // 添加到购物车按钮点击事件
  flowerOptions.forEach(option => {
      option.querySelector('.add-to-cart').addEventListener('click', function() {
          let basketType = option.dataset.baskettpe;
          let price = parseInt(option.dataset.price);

          // 将选项添加到购物车
          cart.push({ type: basketType, price: price });

          // 更新购物车显示
          displayCart();
      });
  });

  // 更新购物车显示
  function displayCart() {
      cartItems.innerHTML = '';
      let totalQty = 0;
      let totalPriceValue = 0;

      cart.forEach(item => {
          let li = document.createElement('li');
          li.textContent = `${item.type} - $${item.price}`;
          cartItems.appendChild(li);
          totalQty++;
          totalPriceValue += item.price;
      });

      // 增加10%税金如果需要发票
      if (needInvoiceCheckbox.checked) {
          totalPriceValue *= 1.1;
      }

      totalQuantity.textContent = totalQty;
      totalPrice.textContent = totalPriceValue.toFixed(2);
  }

  // 是否需要发票复选框事件
  needInvoiceCheckbox.addEventListener('change', function() {
      if (this.checked) {
          invoiceDetailsTextarea.removeAttribute('disabled');
      } else {
          invoiceDetailsTextarea.setAttribute('disabled', 'disabled');
      }
      displayCart(); // 更新总价
  });

  // 提交订单表单事件
  flowerOrderForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // 获取表单数据
      let formData = new FormData(this);
      formData.append('cart', JSON.stringify(cart));

      // 提交订单到服务器（假设API接口为/submit-order）
      fetch('/submit-order', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          console.log('訂單提交成功:', data);
          window.location.href = '/thanks.html';  // 跳转到感谢页面
      })
      .catch(error => {
          console.error('訂單提交失败:', error);
      });
  });
});
