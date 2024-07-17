document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);

    const name = params.get('name');
    const photoUrl = params.get('photo-url');
    const additionalPhotoUrls = params.getAll('additional-photo-urls');
    const birthDate = params.get('birth-date');
    const deathDate = params.get('death-date');
    const funeralSpace = params.get('funeral-space');
    const funeralDate = params.get('funeral-date');
    const funeralLocation = params.get('funeral-location');
    const familyServiceTime = params.get('family-service-time');
    const publicServiceTime = params.get('public-service-time');
    const lifeStory = params.get('life-story');
    const musicChoice = params.get('music-choice');

    document.getElementById('deceased-name').textContent = name;
    document.getElementById('deceased-photo').src = photoUrl;

    const additionalPhotosContainer = document.getElementById('additional-photos-container');
    additionalPhotoUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = '追思照片';
        additionalPhotosContainer.appendChild(img);
    });

      const obituaryText = `
        我們摯愛的 ${name} 於 ${deathDate} 已逝世，生於 ${birthDate}，
        享年 ${calculateAge(birthDate, deathDate)} 歲。牌位安置於 ${funeralSpace}，
        出殯將於 ${funeralDate} 在 ${funeralLocation} 舉行。家奠禮時間為 ${familyServiceTime}，
        公奠禮時間為 ${publicServiceTime}。${lifeStory}
    `;
    document.getElementById('obituary-text').textContent = obituaryText;

    // 背景音樂
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.src = `path/to/music/${musicChoice}`;
    backgroundMusic.play();

    // 計算年齡
    function calculateAge(birthDate, deathDate) {
        const birth = new Date(birthDate);
        const death = new Date(deathDate);
        let age = death.getFullYear() - birth.getFullYear();
        const m = death.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && death.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    // 照片輪播
    const additionalPhotosContainer = document.getElementById('additional-photos-container');
    let currentPhotoIndex = 0;

    function showNextPhoto() {
        const photos = additionalPhotosContainer.querySelectorAll('img');
        if (photos.length > 0) {
            photos.forEach((photo, index) => {
                photo.style.display = index === currentPhotoIndex ? 'block' : 'none';
            });
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        }
    }

    setInterval(showNextPhoto, 5000); // 每5秒切換一次

    // 設置留言功能
    const messageForm = document.getElementById('message-form');
    const messages = document.getElementById('messages');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const messageInput = document.getElementById('message-input');
        const messageText = messageInput.value.trim();

        if (messageText !== '') {
            const messageElement = document.createElement('p');
            messageElement.textContent = messageText;
            messages.appendChild(messageElement);
            messageInput.value = '';
        }
    });

    // 花籃訂購按鈕
    document.getElementById('flower-order-button').addEventListener('click', function() {
        window.location.href = 'flower-order.html';
    });
});
