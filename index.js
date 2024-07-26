document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");

    let currentMusic = '';

    // 处理表单提交
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const photoFile = formData.get("photo");

        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                // 存储其他表单字段到 localStorage
                formData.forEach((value, key) => {
                    localStorage.setItem(key, value);
                });
                localStorage.setItem('musicUrl', currentMusic);

                // 跳转到敬邀您页面
                window.location.href = "invitation.html";
            };
            reader.readAsDataURL(photoFile);
        }
    });

    // 选择音乐
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusic = musicUrl;
        backgroundMusic.src = musicUrl;

        if (playMusicButton.style.display === "none") {
            backgroundMusic.play().catch(function(error) {
                console.log("自动播放音乐失败，需要用户互动", error);
            });
        }
    });

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
});
