document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const photo = urlParams.get('photo');
    const additionalPhotos = urlParams.getAll('additional-photos');
    const birthDate = new Date(urlParams.get('birth-date'));
    const deathDate = new Date(urlParams.get('death-date'));
    const funeralSpace = urlParams.get('funeral-space');
    const funeralDate = new Date(urlParams.get('funeral-date'));
    const funeralLocation = urlParams.get('funeral-location');
    const otherFuneralLocation = urlParams.get('other-funeral-location');
    const familyServiceTime = urlParams.get('family-service-time');
    const publicServiceTime = urlParams.get('public-service-time');
    const lifeStory = urlParams.get('life-story');
    const musicChoice = urlParams.get('music-choice');

    // 设置往生者信息
    document.getElementById('deceased-name').textContent = name;
    document.getElementById('birth-date-text').textContent = birthDate.toLocaleDateString();
    document.getElementById('death-date-text').textContent = deathDate.toLocaleDateString();
    document.getElementById('funeral-space-text').textContent = funeralSpace;
    document.getElementById('funeral-date-text').textContent = funeralDate.toLocaleDateString();
    document.getElementById('funeral-location-text').textContent = funeralLocation === '其他' ? otherFuneralLocation : funeralLocation;
    document.getElementById('family-service-time-text').textContent = familyServiceTime;
    document.getElementById('public-service-time-text').textContent = publicServiceTime;
    document.getElementById('life-story-text').textContent = lifeStory;

    // 计算享年
    const age = deathDate.getFullYear() - birthDate.getFullYear();
    document.getElementById('age').textContent = age;

    // 设置追思照片
    const deceasedPhoto = document.getElementById('deceased-photo');
    if (photo) {
        deceasedPhoto.src = URL.createObjectURL(photo);
        deceasedPhoto.style.display = 'block';
    }

    // 设置其他照片
    const additionalPhotosContainer = document.getElementById('additional-photos-container');
    additionalPhotos.forEach(photo => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(photo);
        img.alt = '追思照片';
        additionalPhotosContainer.appendChild(img);
    });

    // 设置背景音乐
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.src = musicChoice;
    backgroundMusic.play();

    // 处理留言提交
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageInput = document.getElementById('message-input');
        const messagePhoto = document.getElementById('message-photo');

        const messageDiv = document.createElement('div');
        messageDiv.textContent = messageInput.value;

        if (messagePhoto.files.length > 0) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(messagePhoto.files[0]);
            img.alt = '留言照片';
            messageDiv.appendChild(img);
        }

        messagesContainer.appendChild(messageDiv);
        messageInput.value = '';
        messagePhoto.value = '';
    });
});
