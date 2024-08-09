document.addEventListener('DOMContentLoaded', () => {
    // 背景音乐控制
    const music = document.getElementById('background-music');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');
    
    // 播放背景音乐
    function playBackgroundMusic() {
        music.play().catch(error => console.error("播放背景音乐失败:", error));
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
        localStorage.setItem('musicPlaying', 'true');
    }

    // 停止背景音乐
    function stopBackgroundMusic() {
        music.pause();
        localStorage.setItem('musicPlaying', 'false');
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    }

    playMusicButton.addEventListener('click', playBackgroundMusic);
    stopMusicButton.addEventListener('click', stopBackgroundMusic);

    // 自动播放背景音乐
    if (localStorage.getItem('musicPlaying') === 'true') {
        playBackgroundMusic();
    } else {
        stopBackgroundMusic();
    }

    // 照片轮播功能
    const images = document.querySelectorAll('#carousel-images img');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.opacity = i === index ? '1' : '0';
        });
    }

    document.getElementById('next-button').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    document.getElementById('prev-button').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    showImage(currentIndex);

    // 留言功能
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('comment-name').value.trim();
        const message = document.getElementById('comment-message').value.trim();

        if (name && message) {
            const comment = document.createElement('div');
            comment.classList.add('comment-item');
            comment.innerHTML = `
                <strong>${name}</strong>
                <p>${message}</p>
            `;
            commentsContainer.appendChild(comment);

            commentForm.reset();
        }
    });

    // 加载存储的设置
    function loadStoredSettings() {
        const storedPhotoUrl = localStorage.getItem('mainPhoto');
        const storedAdditionalPhotos = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
        const storedMusicUrl = localStorage.getItem('musicUrl');
        const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';

        if (storedPhotoUrl) {
            document.getElementById('main-photo').src = storedPhotoUrl;
        }

        if (storedAdditionalPhotos.length > 0) {
            const carouselImages = document.getElementById('carousel-images');
            storedAdditionalPhotos.forEach(photoUrl => {
                const img = document.createElement('img');
                img.src = photoUrl;
                carouselImages.appendChild(img);
            });
        }

        if (storedMusicUrl) {
            music.src = storedMusicUrl;
            if (isMusicPlaying) {
                playBackgroundMusic();
            } else {
                stopBackgroundMusic();
            }
        }
    }

    loadStoredSettings();

    // 温馨名言设置
    function setMotto() {
        const motto = "珍惜每一刻，怀念每一个微笑";
        document.querySelector('.motto').textContent = motto;
    }

    setMotto();
});
