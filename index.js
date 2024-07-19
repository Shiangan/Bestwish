// index.js

document.addEventListener('DOMContentLoaded', () => {
    const infoForm = document.getElementById('info-form');
    const invitationSection = document.getElementById('invitation-section');
    const invitationPhoto = document.getElementById('invitation-photo');
    const goToObituaryButton = document.getElementById('go-to-obituary');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');
    const backgroundMusic = document.getElementById('background-music');

    // 表单提交处理
    infoForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为

        // 处理表单数据
        const formData = new FormData(infoForm);

        // 模拟表单提交成功后的处理
        // 这里你可以添加实际的表单处理代码，比如发送到服务器等

        // 显示渐显照片部分
        invitationSection.style.display = 'block';

        // 设置主要照片的 URL（假设使用 FormData 提交的照片）
        const photoFile = formData.get('photo');
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                invitationPhoto.src = e.target.result;
                setTimeout(() => {
                    invitationPhoto.style.opacity = 1; // 开始渐显
                }, 100); // 延迟显示效果
            };
            reader.readAsDataURL(photoFile);
        }
    });

    // 音乐播放控制
    playMusicButton.addEventListener('click', () => {
        backgroundMusic.play();
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'inline';
    });

    stopMusicButton.addEventListener('click', () => {
        backgroundMusic.pause();
        playMusicButton.style.display = 'inline';
        stopMusicButton.style.display = 'none';
    });

    // 确保音乐控制按钮的状态与音乐播放器的状态同步
    backgroundMusic.addEventListener('play', () => {
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'inline';
    });

    backgroundMusic.addEventListener('pause', () => {
        playMusicButton.style.display = 'inline';
        stopMusicButton.style.display = 'none';
    });
});
