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
        const storedPaperObituary = localStorage.getItem('paperObituary');

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

        if (storedPaperObituary) {
            const paperObituaryContainer = document.getElementById('paper-obituary-container');
            paperObituaryContainer.innerHTML = '';
            const fileType = storedPaperObituary.split(';')[0].split(':')[1];
            if (fileType.includes('image')) {
                const imgElement = document.createElement('img');
                imgElement.src = storedPaperObituary;
                paperObituaryContainer.appendChild(imgElement);
            } else if (fileType.includes('pdf')) {
                const pdfElement = document.createElement('embed');
                pdfElement.src = storedPaperObituary;
                pdfElement.type = 'application/pdf';
                pdfElement.width = '100%';
                pdfElement.height = '500px';
                paperObituaryContainer.appendChild(pdfElement);
            }
        }
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

    // 处理留言提交
    const messageForm = document.getElementById('message-form');
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('message-name').value;
        const content = document.getElementById('message-content').value;
        const photoInput = document.getElementById('message-photo');
        let photoUrl = '';

        if (photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoUrl = e.target.result;
                saveMessage(name, content, photoUrl);
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            saveMessage(name, content);
        }

        messageForm.reset();
    });

    // 保存留言
    function saveMessage(name, content, photoUrl = '') {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ name, content, photoUrl });
        localStorage.setItem('messages', JSON.stringify(messages));

        // 如果有照片，将其添加到追思照片中
        if (photoUrl) {
            const additionalPhotos = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
            additionalPhotos.push(photoUrl);
            localStorage.setItem('additionalPhotos', JSON.stringify(additionalPhotos));
            updateCarousel();
        }

        loadMessages();
    }

    // 更新轮播图
    function updateCarousel() {
        const carousel = document.querySelector('.carousel');
        $(carousel).slick('unslick'); // 卸载 slick
        carousel.innerHTML = ''; // 清空现有图片

        const additionalPhotos = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
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

    // 加载留言
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = '';         // 清空现有留言
        messagesContainer.innerHTML = '';

        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');

            const nameElement = document.createElement('h3');
            nameElement.textContent = message.name;

            const contentElement = document.createElement('p');
            contentElement.textContent = message.content;

            messageElement.appendChild(nameElement);
            messageElement.appendChild(contentElement);

            if (message.photoUrl) {
                const photoElement = document.createElement('img');
                photoElement.src = message.photoUrl;
                photoElement.classList.add('message-photo');
                messageElement.appendChild(photoElement);
            }

            messagesContainer.appendChild(messageElement);
        });
    }

    loadStoredSettings();
    initializeCarousel();
    loadMessages();
});
