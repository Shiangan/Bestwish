document.addEventListener('DOMContentLoaded', function() {
    // 获取页面元素
    const mainPhotoElement = document.getElementById('main-photo');
    const invitationOverlay = document.getElementById('invitation-overlay');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');
    const backgroundMusic = document.getElementById('background-music');
    const musicChoice = document.getElementById('music-choice');

    // 从 localStorage 获取数据
    const photoUrl = localStorage.getItem('photoUrl');
    const musicUrl = localStorage.getItem('musicUrl') || ''; // 从 localStorage 获取音乐 URL

    // 设置主照片 URL
    if (photoUrl) {
        mainPhotoElement.src = photoUrl;
    }

    // 设置背景音乐
    if (musicUrl) {
        backgroundMusic.src = musicUrl;
    }

    // 播放音乐
    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play();
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    });

    // 停止音乐
    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });

    // 处理“敬邀您”按钮点击事件
    document.getElementById('go-to-invitation').addEventListener('click', function() {
        window.location.href = 'obituary.html';
    });

    // 音乐控制逻辑
    backgroundMusic.addEventListener('ended', function() {
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });

    // 初始化音乐选择器
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const selectedMusicUrl = selectedOption.value;
        backgroundMusic.src = selectedMusicUrl;
        localStorage.setItem('musicUrl', selectedMusicUrl); // 保存音乐 URL 到 localStorage
    });
});
