document.addEventListener('DOMContentLoaded', () => {
    // 获取元素
    const mainPhoto = document.getElementById('main-photo');
    const carouselImages = document.getElementById('carousel-images');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const backgroundMusic = document.getElementById('background-music');
    const playMusicButton = document.getElementById('play-music-button');
    const stopMusicButton = document.getElementById('stop-music-button');

    // 设置主要照片
    function setMainPhoto(photoUrl) {
        mainPhoto.src = photoUrl;
    }

    // 设置轮播照片
    function setCarouselPhotos(photoUrls) {
        carouselImages.innerHTML = photoUrls.map(url => `
            <div class="carousel-slide">
                <img src="${url}" alt="轮播照片">
            </div>
        `).join('');
        updateCarousel();
    }

    // 轮播控制
    let currentIndex = 0;
    const slidesToShow = 3; // 一次显示多少张照片

    function updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        const slideWidth = slides[0].offsetWidth;
        const containerWidth = slideWidth * slidesToShow;
        
        carouselImages.style.width = `${slideWidth * totalSlides}px`;
        carouselImages.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // 设置按钮可见性
        prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentIndex >= totalSlides - slidesToShow ? 'none' : 'block';
    }

    function showNext() {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex++;
            updateCarousel();
        }
    }

    function showPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // 事件监听
    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);

    // 音乐控制
    function playBackgroundMusic() {
        backgroundMusic.play().catch(error => console.error("播放背景音乐失败:", error));
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    }

    function stopBackgroundMusic() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    }

    playMusicButton.addEventListener('click', playBackgroundMusic);
    stopMusicButton.addEventListener('click', stopBackgroundMusic);

    // 初始化
    function initialize() {
        // 设置主要照片
        setMainPhoto('path/to/your/main-photo.jpg');

        // 设置轮播照片
        setCarouselPhotos([
            'path/to/photo1.jpg',
            'path/to/photo2.jpg',
            'path/to/photo3.jpg',
            'path/to/photo4.jpg',
            'path/to/photo5.jpg'
            // 添加更多照片
        ]);
    }

    initialize();
});
