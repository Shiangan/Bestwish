document.addEventListener("DOMContentLoaded", function() {
    const backgroundMusic = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");

    // 从 localStorage 加载已保存的设置
    function loadStoredSettings() {
        const storedPhotoUrl = localStorage.getItem('photoUrl');
        const storedMusicUrl = localStorage.getItem('musicUrl');
        const storedName = localStorage.getItem('name');
        const storedBirthDate = localStorage.getItem('birthDate');
        const storedDeathDate = localStorage.getItem('deathDate');
        const storedAge = localStorage.getItem('age');
        const storedFuneralSpace = localStorage.getItem('funeralSpace');
        const storedFamilyServiceTime = localStorage.getItem('familyServiceTime');
        const storedPublicServiceTime = localStorage.getItem('publicServiceTime');
        const storedFuneralLocation = localStorage.getItem('funeralLocation');

        if (storedPhotoUrl) {
            document.getElementById('obituary-photo').src = storedPhotoUrl;
        }

        if (storedMusicUrl) {
            backgroundMusic.src = storedMusicUrl;
            backgroundMusic.play().catch(error => {
                console.error("播放背景音乐失败:", error);
            });
            musicToggle.textContent = "🔇";
        }

        if (storedName) document.getElementById('name').textContent = storedName;
        if (storedBirthDate) document.getElementById('birth-date').textContent = storedBirthDate;
        if (storedDeathDate) document.getElementById('death-date').textContent = storedDeathDate;
        if (storedAge) document.getElementById('age').textContent = storedAge;
        if (storedFuneralSpace) document.getElementById('funeral-space').textContent = storedFuneralSpace;
        if (storedFamilyServiceTime) document.getElementById('family-service-time').textContent = storedFamilyServiceTime;
        if (storedPublicServiceTime) document.getElementById('public-service-time').textContent = storedPublicServiceTime;
        if (storedFuneralLocation) document.getElementById('funeral-location').textContent = storedFuneralLocation;
    }

    // 处理音乐开关
    musicToggle.addEventListener("click", function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.error("播放背景音乐失败:", error);
            });
            musicToggle.textContent = "🔇";
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = "🔊";
        }
    });

    // 初始化轮播图
    function initializeCarousel() {
        const additionalPhotos = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
        const carousel = document.querySelector('.carousel');

        additionalPhotos.forEach(photoUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = photoUrl;
            carousel.appendChild(imgElement);
        });

        if (additionalPhotos.length > 0) {
            $(carousel).slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            });
        }
    }

    loadStoredSettings();
    initializeCarousel();
});
