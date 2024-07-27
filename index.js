document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");

    let currentMusicUrl = '';

    // 从 localStorage 加载已保存的设置
    function loadStoredSettings() {
        const storedPhotoUrl = localStorage.getItem('photoUrl');
        const storedMusicUrl = localStorage.getItem('musicUrl');

        if (storedPhotoUrl) {
            document.getElementById("main-photo").src = storedPhotoUrl;
            document.getElementById("invitation-section").classList.remove("hidden");
        }

        if (storedMusicUrl) {
            currentMusicUrl = storedMusicUrl;
            backgroundMusic.src = storedMusicUrl;
            playMusicButton.style.display = "none";
            stopMusicButton.style.display = "inline";
        }
    }

    // 处理表单提交
    function handleFormSubmit(event) {
        event.preventDefault();

        const photoFile = document.getElementById("photo").files[0];
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // 保存照片 URL 并更新 UI
                localStorage.setItem('photoUrl', e.target.result);
                document.getElementById("main-photo").src = e.target.result;
                document.getElementById("invitation-section").classList.remove("hidden");

                // 播放背景音乐（如果有选择）
                if (currentMusicUrl) {
                    backgroundMusic.src = currentMusicUrl;
                    backgroundMusic.play().catch(error => {
                        console.error("播放音乐失败:", error);
                    });
                }

                // 跳转到 invitation.html
                setTimeout(() => {
                    window.location.href = "invitation.html";
                }, 100); // 确保 UI 更新完成后再跳转
            };
            reader.readAsDataURL(photoFile);
        } else {
            console.error("未选择照片文件。");
        }

        form.style.display = "none";
    }

    // 处理音乐选择
    function handleMusicChoiceChange() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusicUrl = musicUrl;
        backgroundMusic.src = musicUrl;
        localStorage.setItem('musicUrl', musicUrl);

        // 如果已经在播放音乐，则播放选中的音乐
        if (playMusicButton.style.display === "none") {
            backgroundMusic.play().catch(error => {
                console.error("播放选中音乐失败:", error);
            });
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

    // 绑定事件监听器
    form.addEventListener("submit", handleFormSubmit);
    musicChoice.addEventListener("change", handleMusicChoiceChange);
    playMusicButton.addEventListener("click", playBackgroundMusic);
    stopMusicButton.addEventListener("click", stopBackgroundMusic);

    // 页面加载时加载保存的设置
    loadStoredSettings();
});
