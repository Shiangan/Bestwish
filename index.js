document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const photoForm = document.getElementById("photo-form");
    const invitationSection = document.getElementById("invitation-section");
    const mainPhotoElement = document.getElementById("main-photo");
    const invitationOverlay = document.getElementById("invitation-overlay");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");

    let currentMusic = '';

    // 处理表单提交
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const photoFile = formData.get("photo");

        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                localStorage.setItem('name', formData.get('name'));
                localStorage.setItem('birthDate', formData.get('birth-date'));
                localStorage.setItem('deathDate', formData.get('death-date'));
                localStorage.setItem('funeralSpace', formData.get('funeral-space'));
                localStorage.setItem('funeralDate', formData.get('funeral-date'));
                localStorage.setItem('funeralLocation', formData.get('funeral-location'));
                localStorage.setItem('familyServiceTime', formData.get('family-service-time'));
                localStorage.setItem('publicServiceTime', formData.get('public-service-time'));

                // 显示敬邀您页面
                invitationSection.style.display = "flex";
                mainPhotoElement.src = e.target.result;
                document.querySelector("#invitation-overlay p").textContent = '敬邀您';

                // 播放音乐
                if (currentMusic) {
                    backgroundMusic.src = currentMusic;
                    backgroundMusic.play().catch(function(error) {
                        console.log("自动播放音乐失败，需要用户互动", error);
                    });
                }
            };
            reader.readAsDataURL(photoFile);
        }

        form.style.display = "none";
    });

    // 处理照片上传表单提交
    photoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const mainPhoto = document.getElementById('main-photo').files[0];
        const additionalPhotos = document.getElementById('additional-photos').files;

        if (mainPhoto) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('mainPhotoUrl', e.target.result);

                const additionalPhotoUrls = [];
                for (let i = 0; i < additionalPhotos.length; i++) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        additionalPhotoUrls.push(e.target.result);
                        if (i === additionalPhotos.length - 1) {
                            localStorage.setItem('additionalPhotoUrls', JSON.stringify(additionalPhotoUrls));
                            window.location.href = 'obituary.html';
                        }
                    };
                    reader.readAsDataURL(additionalPhotos[i]);
                }

                // 如果没有额外的照片，直接跳转
                if (additionalPhotos.length === 0) {
                    window.location.href = 'obituary.html';
                }
            };
            reader.readAsDataURL(mainPhoto);
        }
    });

    // 选择音乐
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusic = musicUrl;
        backgroundMusic.src = musicUrl;

        if (playMusicButton.style.display === "none") {
            backgroundMusic.play();
        }
    });

    // 播放音乐
    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play();
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    });

    // 停止音乐
    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });
});

// obituary.js

document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 获取图片 URL
    const mainPhotoUrl = localStorage.getItem('mainPhotoUrl');
    const additionalPhotoUrls = JSON.parse(localStorage.getItem('additionalPhotoUrls')) || [];

    // 显示主照片
    if (mainPhotoUrl) {
        document.getElementById('obituary-photo').src = mainPhotoUrl;
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

    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");

    let currentMusic = '';

    // 选择音乐
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusic = musicUrl;
        backgroundMusic.src = musicUrl;

        if (playMusicButton.style.display === "none") {
            backgroundMusic.play();
        }
    });

    // 播放音乐
    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play();
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    });

    // 停止音乐
    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });
});
