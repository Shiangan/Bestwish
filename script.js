document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('deceased-form');
    const flowerOrderForm = document.getElementById('flower-order-form');
    const cartItems = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    let cart = {};

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const photo = document.getElementById('photo').files[0];
        const birthDate = document.getElementById('birth-date').value;
        const deathDate = document.getElementById('death-date').value;
        const funeralSpace = document.getElementById('funeral-space').value;
        const funeralDate = document.getElementById('funeral-date').value;
        const funeralLocation = document.getElementById('funeral-location').value;
        const otherFuneralLocation = document.getElementById('other-funeral-location').value;
        const familyServiceTime = document.getElementById('family-service-time').value;
        const publicServiceTime = document.getElementById('public-service-time').value;
        const lifeStory = document.getElementById('life-story').value;
        const musicChoice = document.getElementById('music-choice').value;

        const queryParams = new URLSearchParams({
            name,
            birthDate,
            deathDate,
            funeralSpace,
            funeralDate,
            funeralLocation: funeralLocation === '其他' ? otherFuneralLocation : funeralLocation,
            familyServiceTime,
            publicServiceTime,
            lifeStory,
            musicChoice
        });

        const reader = new FileReader();
        reader.onload = function(e) {
            queryParams.append('photo', e.target.result);
            window.location.href = `obituary.html?${queryParams.toString()}`;
        };
        reader.readAsDataURL(photo);
    });

    if (window.location.pathname.endsWith('obituary.html')) {
        const params = new URLSearchParams(window.location.search);

        document.getElementById('deceased-name').textContent = params.get('name');
        document.getElementById('birth-date-text').textContent = params.get('birthDate');
        document.getElementById('death-date-text').textContent = params.get('deathDate');
        document.getElementById('funeral-space-text').textContent = params.get('funeralSpace');
        document.getElementById('funeral-date-text').textContent = params.get('funeralDate');
        document.getElementById('funeral-location-text').textContent = params.get('funeralLocation');
        document.getElementById('family-service-time-text').textContent = params.get('familyServiceTime');
        document.getElementById('public-service-time-text').textContent = params.get('publicServiceTime');
        document.getElementById('life-story-text').textContent = params.get('lifeStory');

        const photo = document.getElementById('deceased-photo');
        photo.src = params.get('photo');
        photo.onload = function() {
            photo.style.display = 'block';
            photo.classList.add('fade-in');
        };

        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.src = params.get('musicChoice');
        backgroundMusic.play();

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const basketType = button.getAttribute('data-basket');
                if (!cart[basketType]) {
                    cart[basketType] = 0;
                }
                cart[basketType]++;
                updateCart();
            });
        });
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        for (const [basketType, quantity] of Object.entries(cart)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${basketType}: ${quantity}`;
            cartItems.appendChild(listItem);
            total += quantity;
        }
        totalQuantity.textContent = total;
    }
});
