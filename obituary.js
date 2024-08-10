document.addEventListener('DOMContentLoaded', () => {
    const mainPhoto = document.getElementById('main-photo');
    const lifeStory = document.getElementById('life-story');
    const photoCarousel = document.getElementById('photo-carousel');
    const paperObituary = document.getElementById('paper-obituary');
    const donateButton = document.getElementById('donate-button');
    const flowerBasket = document.getElementById('flower-basket');
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    const backgroundMusic = document.getElementById('background-music');

    // Music control buttons
    const playMusicButton = document.createElement('button');
    playMusicButton.textContent = '播放音樂';
    document.body.appendChild(playMusicButton);
    const stopMusicButton = document.createElement('button');
    stopMusicButton.textContent = '停止音樂';
    document.body.appendChild(stopMusicButton);
    stopMusicButton.style.display = 'none'; // Start with stop button hidden

    function loadStoredData() {
        const mainPhotoUrl = localStorage.getItem('mainPhoto');
        const lifeStoryText = localStorage.getItem('lifeStory');
        const additionalPhotoUrls = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
        const paperObituaryUrl = localStorage.getItem('paperObituary');
        const musicUrl = localStorage.getItem('musicUrl');

        if (mainPhotoUrl) mainPhoto.src = mainPhotoUrl;
        if (lifeStoryText) lifeStory.textContent = lifeStoryText;
        if (paperObituaryUrl) paperObituary.src = paperObituaryUrl;

        additionalPhotoUrls.forEach(url => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = url;
            img.alt = '追思照片';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            div.appendChild(img);
            photoCarousel.appendChild(div);
        });

        // Initialize carousel
        $('.carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        });

        if (musicUrl) {
            backgroundMusic.src = musicUrl;
            backgroundMusic.play().catch(error => console.error("播放背景音乐失败", error));
        }

        // Music control buttons
        playMusicButton.addEventListener('click', () => {
            backgroundMusic.play().catch(error => console.error("播放背景音乐失败", error));
            playMusicButton.style.display = 'none';
            stopMusicButton.style.display = 'block';
        });

        stopMusicButton.addEventListener('click', () => {
            backgroundMusic.pause();
            playMusicButton.style.display = 'block';
            stopMusicButton.style.display = 'none';
        });

        // Show/Hide flower baskets
        donateButton.addEventListener('click', () => {
            flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'block' : 'none';
        });

        // Comment form submission
        commentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('comment-name').value;
            const message = document.getElementById('comment-message').value;

            if (name && message) {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `<strong>${name}</strong>: <p>${message}</p>`;
                commentsContainer.appendChild(commentDiv);
                commentForm.reset();
            }
        });
    }

    loadStoredData();
});
