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
    const playMusicButton = document.createElement('button');
    playMusicButton.textContent = '播放音樂';
    document.body.appendChild(playMusicButton);
    const stopMusicButton = document.createElement('button');
    stopMusicButton.textContent = '停止音樂';
    document.body.appendChild(stopMusicButton);

    let currentSlide = 0;

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

        $('.carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        });

        if (musicUrl) {
            backgroundMusic.src = musicUrl;
            backgroundMusic.play().catch(error => console.error("播放背景音乐失败        });

        // 音乐播放按钮事件
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

        // 轮播按钮事件
        document.getElementById('prev-button').addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });

        document.getElementById('next-button').addEventListener('click', () => {
            if (currentSlide < photoCarousel.children.length - 1) {
                currentSlide++;
                updateCarousel();
            }
        });

        function updateCarousel() {
            Array.from(photoCarousel.children).forEach((slide, index) => {
                slide.style.display = (index === currentSlide) ? 'block' : 'none';
            });
        }

        // 显示/隐藏花篮
        donateButton.addEventListener('click', () => {
            flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'block' : 'none';
        });

        // 评论表单提交事件
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

        loadStoredData();
    });
                                                                
