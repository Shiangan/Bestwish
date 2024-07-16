document.addEventListener('DOMContentLoaded', function() {
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
    const photoUpload = urlParams.get('photo');

    document.getElementById('deceased-name').textContent = name;
    document.getElementById('birth-date-text').textContent = birthDate;
    document.getElementById('death-date-text').textContent = deathDate;
    document.getElementById('funeral-space-text').textContent = funeralSpace;
    document.getElementById('funeral-date-text').textContent = funeralDate;
    document.getElementById('funeral-location-text').textContent = funeralLocation === '其他' ? otherFuneralLocation : funeralLocation;
    document.getElementById('family-service-time-text').textContent = familyServiceTime;
    document.getElementById('public-service-time-text').textContent = publicServiceTime;
    document.getElementById('life-story-text').textContent = lifeStory;

    if (photoUpload) {
        const photoElement = document.getElementById('deceased-photo');
        photoElement.src = photoUpload;
        photoElement.style.display = 'block';
        setTimeout(() => {
            photoElement.style.opacity = '1';
        }, 200);
    }

    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.src = musicChoice;
    backgroundMusic.play();

    document.getElementById('message-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const message = document.getElementById('message-input').value.trim();
        if (message === '') return;

        const messagesDiv = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = message;
        messagesDiv.appendChild(messageDiv);

        document.getElementById('message-form').reset();
    });
});
