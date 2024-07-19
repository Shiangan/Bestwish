document.addEventListener('DOMContentLoaded', function() {
    const infoForm = document.getElementById('info-form');
    const mainPhotoSection = document.getElementById('main-photo-section');
    const mainPhoto = document.getElementById('main-photo');
    const invitationText = document.getElementById('invitation-text');
    const photoInput = document.getElementById('photo');

    // 当表单提交时
    infoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 防止表单默认提交行为

        // 获取用户上传的照片文件
        const file = photoInput.files[0];
        if (file) {
            // 使用FileReader读取照片文件
            const reader = new FileReader();
            reader.onload = function(e) {
                // 设置主要照片的src
                mainPhoto.src = e.target.result;

                // 显示渐显照片部分
                mainPhotoSection.style.display = 'block';

                // 使主要照片渐显
                mainPhoto.style.opacity = 1;

                // 隐藏表单部分
                infoForm.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    });

    // 音乐控制按钮功能
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');
    const musicChoice = document.getElementById('music-choice');

    let audio = new Audio();

    function loadMusic(url) {
        audio.src = url;
        audio.play();
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'inline-block';
    }

    playMusicButton.addEventListener('click', function() {
        if (!audio.src) {
            loadMusic(musicChoice.value);
        } else {
            audio.play();
            playMusicButton.style.display = 'none';
            stopMusicButton.style.display = 'inline-block';
        }
    });

    stopMusicButton.addEventListener('click', function() {
        audio.pause();
        playMusicButton.style.display = 'inline-block';
        stopMusicButton.style.display = 'none';
    });

    // 选择音乐时
    musicChoice.addEventListener('change', function() {
        if (audio.src) {
            loadMusic(musicChoice.value);
        }
    });
});
