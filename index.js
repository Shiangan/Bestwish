document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const invitationSection = document.getElementById("invitation-section");
    const mainPhotoElement = document.getElementById("main-photo");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");

    let currentMusic = '';

    // 从 localStorage 获取数据并设置初始状态
    const storedPhotoUrl = localStorage.getItem('photoUrl');
    const storedMusicUrl = localStorage.getItem('musicUrl');

    if (storedPhotoUrl) {
        mainPhotoElement.src = storedPhotoUrl;
        invitationSection.classList.remove("hidden");
    }

    if (storedMusicUrl) {
        currentMusic = storedMusicUrl;
        backgroundMusic.src = storedMusicUrl;
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    }

    // 处理表单提交
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const photoFile = formData.get("photo");

        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                // 其他表单字段存储到 localStorage

                // 显示敬邀您页面
                invitationSection.classList.remove("hidden");
                mainPhotoElement.src = e.target.result;

                // 播放音乐
                if (currentMusic) {
                    backgroundMusic.src = currentMusic;
                    backgroundMusic.play().catch(function(error) {
                        console.log("自动播放音乐失败，需要用户互动", error);
                    });
                }
            };
            reader.readAsDataURL(photoFile);
        }

        form.style.display = "none";
    });

    // 选择音乐
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusic = musicUrl;
        backgroundMusic.src = musicUrl;
        localStorage.setItem('musicUrl', musicUrl); // 保存到 localStorage

        // 播放选择的音乐
        if (playMusicButton.style.display === "none") {
            backgroundMusic.play().catch(function(error) {
                console.log("自动播放音乐失败，需要用户互动", error);
            });
        }
    });

    // 播放音乐
    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play().catch(function(error) {
            console.log("自动播放音乐失败，需要用户互动", error);
        });
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    });

    // 停止音乐
    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });
});
