document.addEventListener("DOMContentLoaded", function() {
    const backgroundMusic = document.getElementById("background-music");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const mainPhoto = document.getElementById("main-photo");
    const invitationSection = document.getElementById("invitation-section");

    // 加载保存的设置
    function loadStoredSettings() {
        const storedPhotoUrl = localStorage.getItem('photoUrl');
        const storedMusicUrl = localStorage.getItem('musicUrl');

        // 设置照片
        if (storedPhotoUrl) {
            mainPhoto.src = storedPhotoUrl;
            invitationSection.classList.remove("hidden");
        }

        // 设置音乐
        if (storedMusicUrl) {
            backgroundMusic.src = storedMusicUrl;
            backgroundMusic.play().catch(error => {
                console.error("播放背景音乐失败:", error);
            });
            playMusicButton.style.display = "none";
            stopMusicButton.style.display = "inline";
        }
    }

    // 播放背景音乐
    function playBackgroundMusic() {
        backgroundMusic.play().catch(error => {
            console.error("播放背景音乐失败:", error);
        });
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    }

    // 停止背景音乐
    function stopBackgroundMusic() {
        backgroundMusic.pause();
        stopMusicButton.style.display = "none";
        playMusicButton.style.display = "inline";
    }

    // 绑定按钮事件
    playMusicButton.addEventListener("click", playBackgroundMusic);
    stopMusicButton.addEventListener("click", stopBackgroundMusic);

    // 页面加载时加载保存的设置
    loadStoredSettings();
});
