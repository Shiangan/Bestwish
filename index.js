document.addEventListener('DOMContentLoaded', function () {
    const infoFormSection = document.getElementById('info-form-section');
    const welcomeSection = document.getElementById('welcome-section');
    const enterButton = document.getElementById('enter-button');
    const musicChoice = document.getElementById('music-choice');
    const musicPreview = document.getElementById('music-preview');
    const backgroundMusic = document.getElementById('background-music');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');

    // 播放背景音樂
    backgroundMusic.play();

    // 音樂選擇預覽
    musicChoice.addEventListener('change', function () {
        const selectedMusic = this.value;
        musicPreview.src = selectedMusic;
        musicPreview.play();
    });

    // 播放和停止音樂按鈕
    playMusicButton.addEventListener('click', function () {
        backgroundMusic.play();
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'inline';
    });

    stopMusicButton.addEventListener('click', function () {
        backgroundMusic.pause();
        playMusicButton.style.display = 'inline';
        stopMusicButton.style.display = 'none';
    });

    // 表單提交
    const infoForm = document.getElementById('info-form');
    infoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // 獲取表單數據
        const formData = new FormData(infoForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 保存數據到本地存儲
        localStorage.setItem('deceasedInfo', JSON.stringify(data));

        // 隱藏表單區域，顯示敬邀您頁面
        infoFormSection.style.display = 'none';
        welcomeSection.style.display = 'block';

        // 設置主要照片為第一張
        const mainPhoto = document.getElementById('main-photo');
        const additionalPhotos = document.getElementById('additional-photos').files;
        if (additionalPhotos.length > 0) {
            const firstPhotoFile = additionalPhotos[0]; // 第一張照片
            const reader = new FileReader();
            reader.onload = function(e) {
                mainPhoto.src = e.target.result;
            };
            reader.readAsDataURL(firstPhotoFile);
        }
    });

    // 點擊進入頁面按鈕
    enterButton.addEventListener('click', function () {
        window.location.href = 'obituary.html';
    });
});
