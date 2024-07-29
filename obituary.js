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
            const paperObituaryElement = document.createElement('img');
            paperObituaryElement.src = storedPaperObituary;
            paperObituaryContainer.appendChild(paperObituaryElement);
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
        const photoFile = document.getElementById('message-photo').files[0];
        const messagesContainer = document.getElementById('messages-container');

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${name}</strong><p>${content}</p>`;

        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                messageElement.appendChild(imgElement);
                messagesContainer.appendChild(messageElement);
                saveMessage(name, content, e.target.result);
            };
            reader.readAsDataURL(photoFile);
        } else {
            messagesContainer.appendChild(messageElement);
            saveMessage(name, content, null);
        }

        // 重置表单
        messageForm.reset();
    });

    // 保存留言到 localStorage
    function saveMessage(name, content, photoUrl) {
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

        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `<strong>${message.name}</strong><p>${message.content}</p>`;
            if (message.photoUrl) {
                const imgElement = document.createElement('img');
                imgElement.src = message.photoUrl;
                messageElement.appendChild(imgElement);
            }
            messagesContainer.appendChild(messageElement);
        });
    }

    // 处理纸本訃聞上传
    const paperObituaryFileInput = document.getElementById('paper-obituary-file');
    paperObituaryFileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const paperObituaryContainer = document.getElementById('paper-obituary-container');
                paperObituaryContainer.innerHTML = ''; // 清空现有内容
                if (file.type.includes('image')) {
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    paperObituaryContainer.appendChild(imgElement);
                } else if (file.type.includes('pdf')) {
                    const pdfElement = document.createElement('embed');
                    pdfElement.src = e.target.result;
                    pdfElement.type = 'application/pdf';
                    pdfElement.width = '100%';
                    pdfElement.height = '500px';
                    paperObituaryContainer.appendChild(pdfElement);
                }
                localStorage.setItem('paperObituary', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    loadStoredSettings();
    initializeCarousel();
    loadMessages();
});
