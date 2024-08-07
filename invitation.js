document.addEventListener('DOMContentLoaded', function() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const lastOrder = orders[orders.length - 1];

    if (lastOrder) {
        const mainPhoto = document.getElementById('main-photo');
        const backgroundMusic = document.getElementById('background-music');
        const invitationSection = document.getElementById('invitation-section');
        
        // 顯示主要照片
        mainPhoto.src = URL.createObjectURL(lastOrder.photo);
        invitationSection.classList.remove('hidden');
        
        // 設置背景音樂
        if (lastOrder.musicChoice) {
            backgroundMusic.src = lastOrder.musicChoice;
        } else if (lastOrder.customMusic) {
            backgroundMusic.src = URL.createObjectURL(lastOrder.customMusic);
        }
    }

    // 音樂控制
    const playButton = document.getElementById('play-music');
    const stopButton = document.getElementById('stop-music');
    
    playButton.addEventListener('click', function() {
        backgroundMusic.play();
        playButton.style.display = 'none';
        stopButton.style.display = 'inline';
    });

    stopButton.addEventListener('click', function() {
        backgroundMusic.pause();
        playButton.style.display = 'inline';
        stopButton.style.display = 'none';
    });
});
