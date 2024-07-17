document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const photo = urlParams.get('photo');
    const additionalPhotos = urlParams.getAll('additional-photos');
    const birthDate = urlParams.get('birth-date');
    const deathDate = urlParams.get('death-date');
    const funeralSpace = urlParams.get('funeral-space');
    const funeralDate = urlParams.get('funeral-date');
    const funeralLocation = urlParams.get('funeral-location');
    const familyServiceTime = urlParams.get('family-service-time');
    const publicServiceTime = urlParams.get('public-service-time');
    const lifeStory = urlParams.get('life-story');
    const musicChoice = urlParams.get('music-choice');

    if (name) document.getElementById('deceased-name').textContent = name;
    if (photo) document.getElementById('deceased-photo').src = photo;
    if (birthDate) document.getElementById('birth-date-text').textContent = birthDate;
    if (deathDate) document.getElementById('death-date-text').textContent = deathDate;
    if (funeralSpace) document.getElementById('funeral-space-text').textContent = funeralSpace;
    if (funeralDate) document.getElementById('funeral-date-text').textContent = funeralDate;
    if (funeralLocation) document.getElementById('funeral-location-text').textContent = funeralLocation;
    if (familyServiceTime) document.getElementById('family-service-time-text').textContent = familyServiceTime;
    if (publicServiceTime) document.getElementById('public-service-time-text').textContent = publicServiceTime;
    if (lifeStory) document.getElementById('life-story-text').textContent = lifeStory;
    
    if (musicChoice) {
        const music = document.getElementById('background-music');
        music.src = musicChoice;
        music.play();
    }

    const messageForm = document.getElementById('message-form');
    const messagesDiv = document.getElementById('messages');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageInput = document.getElementById('message-input');
        const messageText = messageInput.value;
        if (messageText) {
            const newMessage = document.createElement('p');
            newMessage.textContent = messageText;
            messagesDiv.appendChild(newMessage);
            messageInput.value = '';
        }
    });

    document.getElementById('flower-order-button').addEventListener('click', () => {
        window.location.href = 'flower-order.html';
    });
});
