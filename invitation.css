document.addEventListener("DOMContentLoaded", function() {
    const backgroundMusic = document.getElementById("background-music");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const mainPhoto = document.getElementById("main-photo");
    const invitationSection = document.getElementById("invitation-section");

    function loadStoredSettings() {
        const storedPhotoUrl = localStorage.getItem('photoUrl');
        const storedMusicUrl = localStorage.getItem('musicUrl');

        if (storedPhotoUrl) {
            mainPhoto.src = storedPhotoUrl;
            invitationSection.classList.remove("hidden");
        }

        if (storedMusicUrl) {
            backgroundMusic.src = storedMusicUrl;
            backgroundMusic.play().catch(error => {
                console.error("播放背景音乐失败:", error);
            });
            playMusicButton.style.display = "none";
            stopMusicButton.style.display = "inline";
        }
    }

    function playBackgroundMusic() {
        backgroundMusic.play().catch(error => {
            console.error("播放背景音乐失败:", error);
        });
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    }

    function stopBackgroundMusic() {
        backgroundMusic.pause();
        stopMusicButton.style.display = "none";
        playMusicButton.style.display = "inline";
    }

    playMusicButton.addEventListener("click", playBackgroundMusic);
    stopMusicButton.addEventListener("click", stopBackgroundMusic);

    loadStoredSettings();
});
