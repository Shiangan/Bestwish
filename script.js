document.addEventListener('DOMContentLoaded', function() {
    // 從 URL 參數中獲取資料
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

    // 填充訃聞內容
    document.getElementById('deceased-name').textContent = name;
    document.getElementById('birth-date-text').textContent = birthDate
    document.getElementById('death-date-text').textContent = deathDate;
    document.getElementById('funeral-space-text').textContent = funeralSpace;
    document.getElementById('funeral-date-text').textContent = funeralDate;
    document.getElementById('funeral-location-text').textContent = funeralLocation === '其他' ? otherFuneralLocation : funeralLocation;
    document.getElementById('family-service-time-text').textContent = familyServiceTime;
    document.getElementById('public-service-time-text').textContent = publicServiceTime;
    document.getElementById('life-story-text').textContent = lifeStory;

    // 設置背景音樂
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.src = musicChoice;
    backgroundMusic.play();

    // 處理照片上傳
    const photoInput = document.getElementById('photo');
    const additionalPhotosInput = document.getElementById('additional-photos');
    
    if (photoInput && additionalPhotosInput) {
        const photoFiles = Array.from(photoInput.files);
        const additionalPhotoFiles = Array.from(additionalPhotosInput.files);

        // 主照片顯示
        if (photoFiles.length > 0) {
            const photo = photoFiles[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const deceasedPhoto = document.getElementById('deceased-photo');
                deceasedPhoto.src = e.target.result;
                deceasedPhoto.style.display = 'block';
            }
            reader.readAsDataURL(photo);
        }

        // 額外照片顯示
        if (additionalPhotoFiles.length > 0) {
            const additionalPhotosContainer = document.getElementById('additional-photos');
            additionalPhotoFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = "追思照片";
                    additionalPhotosContainer.appendChild(img);
                }
                reader.readAsDataURL(file);
            });
        }
    }

    // 處理花籃訂購
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');

    let cart = [];
    let totalPriceValue = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const basketType = button.getAttribute('data-basket');
            const price = basketType === 'standard' ? 1000 : 2000; // 假設標準花籃1000元，高級花籃2000元

            cart.push({ type: basketType, price: price });

            // 更新購物車顯示
            const listItem = document.createElement('li');
            listItem.textContent = `${basketType === 'standard' ? '標準花籃' : '高級花籃'} - $${price}`;
            cartItems.appendChild(listItem);

            // 更新總數量和總價
            totalQuantity.textContent = cart.length;
            totalPriceValue += price;
            totalPrice.textContent = totalPriceValue;
        });
    });

    // 處理花籃訂單提交
    const flowerOrderForm = document.getElementById('flower-order-form');
    flowerOrderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const recipientName = document.getElementById('recipient-name').value;
        const recipientAddress = document.getElementById('recipient-address').value;
        const invoice = document.getElementById('invoice').value;
        const paymentMethod = document.getElementById('payment-method').value;
        const paymentProof = document.getElementById('payment-proof').files[0];

        let orderTotal = totalPriceValue;
        if (invoice === 'yes') {
            orderTotal *= 1.1; // 加 10%
        }

        const formData = new FormData();
        formData.append('recipientName', recipientName);
        formData.append('recipientAddress', recipientAddress);
        formData.append('invoice', invoice);
        formData.append('paymentMethod', paymentMethod);
        formData.append('paymentProof', paymentProof);
        formData.append('orderTotal', orderTotal);
        formData.append('cart', JSON.stringify(cart));

        // 將訂單數據發送到後台（這裡只是模擬，實際應該發送到服務器）
        console.log('訂單數據:', {
            recipientName,
            recipientAddress,
            invoice,
            paymentMethod,
            paymentProof,
            orderTotal,
            cart
        });

        // 清空購物車
        cart = [];
        totalPriceValue = 0;
        cartItems.innerHTML = '';
        totalQuantity.textContent = 0;
        totalPrice.textContent = 0;

        alert('訂單已提交！');
    });
});
