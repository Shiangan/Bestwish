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
});
