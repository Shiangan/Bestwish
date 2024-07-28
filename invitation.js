document.addEventListener('DOMContentLoaded', () => {
    const photoUpload = document.getElementById('photo-upload');
    const mainPhoto = document.getElementById('main-photo');
    const musicUpload = document.getElementById('music-upload');
    const backgroundMusic = document.getElementById('background-music');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');

    // 处理照片上传
    photoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            mainPhoto.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // 处理音乐上传
    musicUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            backgroundMusic.src = e.target.result;
            backgroundMusic.play();
        };
        reader.readAsDataURL(file);
    });

    // 控制音乐播放
    playMusicButton.addEventListener('click', () => {
        backgroundMusic.play();
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'inline';
    });

    stopMusicButton.addEventListener('click', () => {
        backgroundMusic.pause();
        stopMusicButton.style.display = 'none';
        playMusicButton.style.display = 'inline';
    });
});
