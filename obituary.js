document.addEventListener('DOMContentLoaded', () => {
    // 轮播照片的 JavaScript
    const carouselImages = document.getElementById('carousel-images');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    let currentSlide = 0;
    const slideCount = slides.length;
    const slideWidth = slides[0].offsetWidth;
    let autoPlayInterval;

    function showSlide(index) {
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;
        carouselImages.style.transform = `translateX(-${index * slideWidth}px)`;
        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function initializeCarousel() {
        showSlide(currentSlide);
        startAutoPlay();
    }

    prevButton.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    initializeCarousel();

    window.addEventListener('resize', () => {
        // 在窗口大小变化时调整轮播图片的宽度
        const newSlideWidth = slides[0].offsetWidth;
        carouselImages.style.transition = 'none'; // 临时禁用过渡效果
        showSlide(currentSlide);
        carouselImages.style.transition = 'transform 0.5s ease'; // 恢复过渡效果
    });

    // 添加照片点击放大的功能
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');
    const closeModal = document.getElementsByClassName('close')[0];

    function openModal(src, alt) {
        modal.style.display = 'flex';
        modalImg.src = src;
        captionText.textContent = alt;
    }

    function setupPhotoClick(selector) {
        document.querySelectorAll(selector).forEach(img => {
            img.addEventListener('click', () => openModal(img.src, img.alt));
        });
    }

    setupPhotoClick('#photo-carousel img');
    setupPhotoClick('#paper-obituary');
    setupPhotoClick('#flower-basket img');

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 主要照片和轮播照片的设置
    const mainPhoto = document.getElementById('main-photo');
    const mainPhotoSrc = localStorage.getItem('mainPhotoSrc'); // Example: Load from localStorage
    if (mainPhotoSrc) {
        mainPhoto.src = mainPhotoSrc;
    }

    const carouselImagesSrc = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
    const carouselImagesContainer = document.getElementById('carousel-images');
    carouselImagesContainer.innerHTML = carouselImagesSrc.map(src => `
        <div class="carousel-slide">
            <img src="${src}" alt="轮播照片">
        </div>
    `).join('');

    showSlide(currentSlide);

    // 音乐控制的 JavaScript
    const backgroundMusic = document.getElementById('background-music');
    const musicUrl = localStorage.getItem('musicUrl');
    if (musicUrl) {
        backgroundMusic.src = musicUrl;
        backgroundMusic.play().catch(error => console.error("播放背景音乐失败:", error));
    }

    document.getElementById('play-music-button').addEventListener('click', () => {
        backgroundMusic.play().catch(error => console.error("播放背景音乐失败:", error));
        localStorage.setItem('musicPlaying', 'true');
    });

    document.getElementById('stop-music-button').addEventListener('click', () => {
        backgroundMusic.pause();
        localStorage.setItem('musicPlaying', 'false');
    });

    if (localStorage.getItem('musicPlaying') === 'true') {
        backgroundMusic.play().catch(error => console.error("播放背景音乐失败:", error));
    }
});
