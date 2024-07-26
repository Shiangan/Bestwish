document.addEventListener('DOMContentLoaded', function() {
    // 获取页面元素
    const mainPhotoElement = document.getElementById('main-photo');
    const invitationOverlay = document.getElementById('invitation-overlay');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');
    const backgroundMusic = document.getElementById('background-music');
    const musicChoice = document.getElementById('music-choice');
    const infoForm = document.getElementById('info-form');

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

    // 音乐控制逻辑
    backgroundMusic.addEventListener('ended', function() {
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });

    // 音乐选择逻辑
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const selectedMusicUrl = selectedOption.value;
        backgroundMusic.src = selectedMusicUrl;
        localStorage.setItem('musicUrl', selectedMusicUrl); // 保存音乐 URL 到 localStorage
    });

    // 表单提交逻辑
    infoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止默认的表单提交行为

        // 提交表单数据（例如通过 AJAX）
        const formData = new FormData(infoForm);
        fetch('upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // 提交成功后跳转到邀请页面
            window.location.href = 'invitation.html';
        })
        .catch(error => {
            console.error('提交表单失败:', error);
        });
    });
});
