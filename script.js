document.addEventListener('DOMContentLoaded', function () {
    const welcomeSection = document.getElementById('welcome-section');
    const enterButton = document.getElementById('enter-button');
    const infoFormSection = document.getElementById('info-form-section');
    const mainPhoto = document.getElementById('main-photo');
    const backgroundMusic = document.getElementById('background-music');

    // 淡入主要照片
    mainPhoto.style.opacity = 1;

    // 播放背景音樂
    backgroundMusic.play();

    // 點擊進入頁面按鈕
    enterButton.addEventListener('click', function () {
        welcomeSection.style.display = 'none';
        infoFormSection.style.display = 'block';
    });

    // 表單提交
    const infoForm = document.getElementById('info-form');
    infoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(infoForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 將表單數據保存到本地存儲
        localStorage.setItem('deceasedInfo', JSON.stringify(data));

        // 導向到訃聞頁面
        window.location.href = 'obituary.html';
    });

    // 讀取並顯示訃聞信息
    const deceasedInfo = JSON.parse(localStorage.getItem('deceasedInfo'));
    if (deceasedInfo) {
        const obituaryText = `我們的至親 ${deceasedInfo.name} 於 ${deceasedInfo['death-date']} 往生，享年 ${calculateAge(deceasedInfo['birth-date'], deceasedInfo['death-date'])} 歲。牌位安置於 ${deceasedInfo['funeral-space']}。`;
        document.getElementById('obituary-text').textContent = obituaryText;

        const photoContainer = document.getElementById('deceased-photo');
        if (deceasedInfo.photo) {
            const photoElement = document.createElement('img');
            photoElement.src = deceasedInfo.photo;
            photoContainer.appendChild(photoElement);
        }

        // 顯示其他照片
        const photoSlider = document.getElementById('photo-slider');
        if (deceasedInfo['additional-photos']) {
            deceasedInfo['additional-photos'].forEach(photo => {
                const photoElement = document.createElement('img');
                photoElement.src = photo;
                photoSlider.appendChild(photoElement);
            });
        }
    }

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

    // 留言提交
    const messageForm = document.getElementById('message-form');
    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name-input').value;
        const message = document.getElementById('message-input').value;

        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ name, message });
        localStorage.setItem('messages', JSON.stringify(messages));

        displayMessages();
    });

    function displayMessages() {
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = '';
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(msg => {
            const messageElement = document.createElement('p');
            messageElement.textContent = `${msg.name}: ${msg.message}`;
            messagesContainer.appendChild(messageElement);
        });
    }

    displayMessages();
});
