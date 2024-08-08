document.addEventListener('DOMContentLoaded', function() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const lastOrder = orders[orders.length - 1];

    if (lastOrder) {
        const mainPhoto = document.getElementById('main-photo');
        const backgroundMusic = document.getElementById('background-music');
        const invitationSection = document.getElementById('invitation-section');
        
        // 显示主要照片
        if (lastOrder.photo) {
            mainPhoto.src = URL.createObjectURL(lastOrder.photo);
        }
        invitationSection.classList.remove('hidden');
        
        // 设置背景音乐
        if (lastOrder.musicChoice) {
            // 如果 musicChoice 是 Blob 对象或 File 对象
            if (lastOrder.musicChoice instanceof Blob || lastOrder.musicChoice instanceof File) {
                backgroundMusic.src = URL.createObjectURL(lastOrder.musicChoice);
            } else {
                // 如果 musicChoice 是 URL 字符串
                backgroundMusic.src = lastOrder.musicChoice;
            }
        } else if (lastOrder.customMusic) {
            // 如果 customMusic 是 Blob 对象或 File 对象
            if (lastOrder.customMusic instanceof Blob || lastOrder.customMusic instanceof File) {
                backgroundMusic.src = URL.createObjectURL(lastOrder.customMusic);
            } else {
                // 如果 customMusic 是 URL 字符串
                backgroundMusic.src = lastOrder.customMusic;
            }
        }
    }

    // 音乐控制
    const playButton = document.getElementById('play-music');
    const stopButton = document.getElementById('stop-music');
    
    playButton.addEventListener('click', function() {
        backgroundMusic.play().catch(error => {
            console.error("播放背景音乐失败:", error);
        });
        playButton.style.display = 'none';
        stopButton.style.display = 'inline';
    });

    stopButton.addEventListener('click', function() {
        backgroundMusic.pause();
        playButton.style.display = 'inline';
        stopButton.style.display = 'none';
    });
});
