document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Obituary Page
    if (window.location.pathname.includes('obituary.html')) {
        const name = urlParams.get('name');
        const photo = urlParams.get('photo');
        const additionalPhotos = urlParams.get('additional-photos') ? urlParams.get('additional-photos').split(',') : [];
        const birthDate = urlParams.get('birth-date');
        const deathDate = urlParams.get('death-date');
        const funeralSpace = urlParams.get('funeral-space');
        const funeralDate = urlParams.get('funeral-date');
        const funeralLocation = urlParams.get('funeral-location');
        const familyServiceTime = urlParams.get('family-service-time');
        const publicServiceTime = urlParams.get('public-service-time');
        const lifeStory = urlParams.get('life-story');
        const musicChoice = urlParams.get('music-choice');

        document.getElementById('deceased-name').textContent = name;
        document.getElementById('deceased-photo').src = photo;
        document.getElementById('deceased-photo').style.display = 'block';

        const additionalPhotosContainer = document.getElementById('additional-photos-container');
        additionalPhotos.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.classList.add('additional-photo');
            additionalPhotosContainer.appendChild(img);
        });

        const obituaryText = `
            ${name}，出生於${birthDate}，逝世於${deathDate}，享年${calculateAge(birthDate, deathDate)}歲。奠禮將於${funeralDate}在${funeralLocation}舉行，家奠禮時間為${familyServiceTime}，公奠禮時間為${publicServiceTime}。生前${lifeStory}。${funeralSpace ? `牌位安置地點在${funeralSpace}` : ''}。
        `;
        document.getElementById('obituary-text').textContent = obituaryText;

        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.src = musicChoice;
        backgroundMusic.play();
    }

    // Flower Order Page
    document.getElementById('flower-order-button').addEventListener('click', function() {
        window.location.href = 'flower-order.html';
    });

    const cartItems = document.getElementById('cart-items');
    let totalQuantity = 0;
    let totalPrice = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const basketType = button.dataset.basket;
            const basketPrice = parseInt(button.parentElement.dataset.price, 10);

            const li = document.createElement('li');
            li.textContent = `${basketType} 花籃 - $${basketPrice}`;
            cartItems.appendChild(li);

            totalQuantity++;
            totalPrice += basketPrice;

            document.getElementById('total-quantity').textContent = totalQuantity;
            document.getElementById('total-price').textContent = totalPrice;
        });
    });

    // Message Form
    document.getElementById('message-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        if (message) {
            const messageContainer = document.getElementById('messages');
            const p = document.createElement('p');
            p.textContent = message;
            messageContainer.appendChild(p);
            messageInput.value = '';
        }
    });

    // Helper function to calculate age
    function calculateAge(birthDate, deathDate) {
        const birth = new Date(birthDate);
        const death = new Date(deathDate);
        let age = death.getFullYear() - birth.getFullYear();
        const monthDiff = death.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
});
