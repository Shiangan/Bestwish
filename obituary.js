document.addEventListener('DOMContentLoaded', () => {
    // 轮播照片的 JavaScript
    const carouselImages = document.getElementById('carousel-images');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(index) {
        const totalSlides = slides.length;
        if (index >= totalSlides) currentSlide = 0;
        if (index < 0) currentSlide = totalSlides - 1;
        carouselImages.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    setInterval(nextSlide, 5000); // 每5秒切换一次

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
    const mainPhotoSrc = localStorage.getItem('mainPhotoSrc');
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

    // 播放背景音乐
    document.getElementById('play-music-button').addEventListener('click', () => {
        backgroundMusic.play().catch(error => console.error("播放背景音乐失败:", error));
        localStorage.setItem('musicPlaying', 'true');
    });

    // 停止背景音乐
    document.getElementById('stop-music-button').addEventListener('click', () => {
        backgroundMusic.pause();
        localStorage.setItem('musicPlaying', 'false');
    });

    // 读取存储的音乐播放状态
    if (localStorage.getItem('musicPlaying') === 'true') {
        backgroundMusic.play().catch(error => console.error("播放背景音乐失败:", error));
    }

    // 处理花篮按钮点击事件
    const donateButton = document.getElementById('donate-button');
    const flowerBasket = document.getElementById('flower-basket');

    donateButton.addEventListener('click', () => {
        flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'flex' : 'none';
    });
});
