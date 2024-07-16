// script.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Set deceased information
    document.getElementById('deceased-name').textContent = urlParams.get('name');
    const photo = document.getElementById('deceased-photo');
    if (urlParams.has('photo')) {
        photo.src = URL.createObjectURL(urlParams.get('photo'));
        photo.style.display = 'block';
    }
    document.getElementById('birth-date-text').textContent = urlParams.get('birth-date');
    document.getElementById('death-date-text').textContent = urlParams.get('death-date');
    document.getElementById('funeral-space-text').textContent = urlParams.get('funeral-space');
    document.getElementById('funeral-date-text').textContent = urlParams.get('funeral-date');
    document.getElementById('funeral-location-text').textContent = urlParams.get('funeral-location');
    document.getElementById('family-service-time-text').textContent = urlParams.get('family-service-time');
    document.getElementById('public-service-time-text').textContent = urlParams.get('public-service-time');
    document.getElementById('life-story-text').textContent = urlParams.get('life-story');

    // Set background music
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.src = `music/${urlParams.get('music-choice')}`;
    backgroundMusic.play();

    // Handle messages
    const messageForm = document.getElementById('message-form');
    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const messageInput = document.getElementById('message-input');
        const messages = document.getElementById('messages');

        const newMessage = document.createElement('p');
        newMessage.textContent = messageInput.value;
        messages.appendChild(newMessage);

        messageInput.value = '';
    });

    // Flower order button
    document.getElementById('flower-order-button').addEventListener('click', function () {
        window.location.href = 'flower-order.html';
    });
});
