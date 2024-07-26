document.addEventListener('DOMContentLoaded', function() {
    // 获取页面元素
    const mainPhotoElement = document.getElementById('main-photo');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');
    const backgroundMusic = document.getElementById('background-music');
    const musicChoice = document.getElementById('music-choice');
    const goToObituaryButton = document.getElementById('go-to-obituary');

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

    // 音乐结束后自动显示播放按钮
    backgroundMusic.addEventListener('ended', function() {
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });

    // 音乐选择逻辑
    if (musicChoice) {
        musicChoice.addEventListener("change", function() {
            const selectedOption = musicChoice.options[musicChoice.selectedIndex];
            const selectedMusicUrl = selectedOption.value;
            backgroundMusic.src = selectedMusicUrl;
            localStorage.setItem('musicUrl', selectedMusicUrl); // 保存音乐 URL 到 localStorage

            // 如果音乐正在播放，更新背景音乐并继续播放
            if (!playMusicButton.style.display) {
                backgroundMusic.play().catch(function(error) {
                    console.log("自动播放音乐失败，需要用户交互", error);
                });
            }
        });
    }

    // 点击“进入訃闻”按钮后跳转到 obituary.html
    if (goToObituaryButton) {
        goToObituaryButton.addEventListener('click', function() {
            // 可以在这里处理其他逻辑，比如保存表单数据到 localStorage
            window.location.href = 'obituary.html';
        });
    }
});
