document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 获取图片 URL
    const mainPhotoUrl = localStorage.getItem('mainPhotoUrl');
    const additionalPhotoUrls = JSON.parse(localStorage.getItem('additionalPhotoUrls')) || [];

    // 显示主照片
    if (mainPhotoUrl) {
        document.getElementById('main-photo').src = mainPhotoUrl;
    }

    // 显示轮播图
    const carouselContainer = document.querySelector('.carousel');
    additionalPhotoUrls.forEach(url => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = url;
        img.alt = '追思照片';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        div.appendChild(img);
        carouselContainer.appendChild(div);
    });

    // 初始化轮播图
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    // 照片点击放大功能
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

    setupPhotoClick('.carousel img');
    setupPhotoClick('#main-photo');
    setupPhotoClick('#flower-basket img');

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

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
