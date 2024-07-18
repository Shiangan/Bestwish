document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const photo = urlParams.get('photo');
    const birthDate = urlParams.get('birth-date');
    const deathDate = urlParams.get('death-date');
    const funeralSpace = urlParams.get('funeral-space');
    const funeralDate = urlParams.get('funeral-date');
    const funeralLocation = urlParams.get('funeral-location');
    const familyServiceTime = urlParams.get('family-service-time');
    const publicServiceTime = urlParams.get('public-service-time');
    const lifeStory = urlParams.get('life-story');

    const deceasedNameElem = document.getElementById('deceased-name');
    const deceasedPhotoElem = document.getElementById('deceased-photo');
    const deceasedDetailsElem = document.getElementById('deceased-details');
    const backgroundMusic = document.getElementById('background-music');

    deceasedNameElem.textContent = name;
    if (photo) {
        deceasedPhotoElem.src = photo;
        deceasedPhotoElem.style.display = 'block';
    }
    
    const birthDateObj = new Date(birthDate);
    const deathDateObj = new Date(deathDate);
    const age = deathDateObj.getFullYear() - birthDateObj.getFullYear();
    
    const detailsText = `${name}，生於 ${birthDateObj.getFullYear()} 年 ${birthDateObj.getMonth() + 1} 月 ${birthDateObj.getDate()} 日，享年 ${age} 歲，牌位安置地點為 ${funeralSpace}，出殯日期定於 ${funeralDate}，出殯地點為 ${funeralLocation}，家奠禮時間為 ${familyServiceTime}，公奠禮時間為 ${publicServiceTime}。${lifeStory}`;
    deceasedDetailsElem.textContent = detailsText;

    backgroundMusic.src = urlParams.get('music-choice');
    backgroundMusic.play();

    // Handle message form submission
    const messageForm = document.getElementById('message-form');
    const messagesDiv = document.getElementById('messages');
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('name-input').value;
        const messageInput = document.getElementById('message-input').value;
        if (nameInput && messageInput) {
            const messageDiv = document.createElement('div');
            messageDiv.innerHTML = `<strong>${nameInput}</strong>: ${messageInput}`;
            messagesDiv.appendChild(messageDiv);
            messageForm.reset();
        }
    });

    // Handle flower order button
    const flowerOrderButton = document.getElementById('flower-order-button');
    flowerOrderButton.addEventListener('click', function () {
        window.location.href = 'flower-order.html';
    });
});
