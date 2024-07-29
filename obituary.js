document.addEventListener("DOMContentLoaded", function() {
    // 从 localStorage 中获取数据并显示在页面上
    function loadObituaryData() {
        const photoUrl = localStorage.getItem('photoUrl');
        const name = localStorage.getItem('name');
        const birthDate = localStorage.getItem('birthDate');
        const deathDate = localStorage.getItem('deathDate');
        const age = localStorage.getItem('age');
        const funeralSpace = localStorage.getItem('funeralSpace');
        const familyServiceTime = localStorage.getItem('familyServiceTime');
        const publicServiceTime = localStorage.getItem('publicServiceTime');
        const funeralLocation = localStorage.getItem('funeralLocation');
        const additionalPhotos = JSON.parse(localStorage.getItem('additionalPhotos'));
        const musicUrl = localStorage.getItem('musicUrl');
        const musicPlaying = localStorage.getItem('musicPlaying') === 'true';

        if (photoUrl) {
            document.getElementById('obituary-photo').src = photoUrl;
        }

        document.getElementById('name').textContent = name;
        document.getElementById('birth-date').textContent = birthDate;
        document.getElementById('death-date').textContent = deathDate;
        document.getElementById('age').textContent = age;
        document.getElementById('funeral-space').textContent = funeralSpace;
        document.getElementById('family-service-time').textContent = familyServiceTime;
        document.getElementById('public-service-time').textContent = publicServiceTime;
        document.getElementById('funeral-location').textContent = funeralLocation;

        if (additionalPhotos && additionalPhotos.length > 0) {
            const carousel = document.querySelector('.carousel');
            additionalPhotos.forEach(photoUrl => {
                const img = document.createElement('img');
                img.src = photoUrl;
                img.alt = "追思照片";
                carousel.appendChild(img);
            });

            // 初始化 Slick Carousel
            $(carousel).slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            });
        }

        if (musicUrl) {
            const backgroundMusic = document.getElementById('background-music');
            backgroundMusic.src = musicUrl;
            if (musicPlaying) {
                backgroundMusic.play().catch(error => {
                    console.error("播放背景音乐失败:", error);
                });
                document.getElementById('music-toggle').textContent = '🔇';
            } else {
                backgroundMusic.pause();
                document.getElementById('music-toggle').textContent = '🔊';
            }

            const musicToggle = document.getElementById('music-toggle');
            musicToggle.addEventListener('click', function() {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().catch(error => {
                        console.error("播放背景音乐失败:", error);
                    });
                    musicToggle.textContent = '🔇';
                    localStorage.setItem('musicPlaying', 'true');
                } else {
                    backgroundMusic.pause();
                    musicToggle.textContent = '🔊';
                    localStorage.setItem('musicPlaying', 'false');
                }
            });
        }

        // 初始化地图
        if (funeralLocation) {
            const mapContainer = document.getElementById('map-container');
            const mapOptions = {
                center: { lat: 25.0330, lng: 121.5654 }, // 默认位置（台北）
                zoom: 15
            };
            const map = new google.maps.Map(mapContainer, mapOptions);

            // 根据 funeralLocation 设置地图中心
            // 可以将 funeralLocation 解析为经纬度来设置地图中心
        }
    }

    // 页面加载时加载訃聞数据
    loadObituaryData();

    // 留言区处理
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-container');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('message-name').value.trim();
        const content = document.getElementById('message-content').value.trim();
        const photoFile = document.getElementById('message-photo').files[0];

        if (name && content) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');

            const nameParagraph = document.createElement('p');
            nameParagraph.classList.add('message-name');
            nameParagraph.textContent = name;

            const contentParagraph = document.createElement('p');
            contentParagraph.classList.add('message-content');
            contentParagraph.textContent = content;

            messageDiv.appendChild(nameParagraph);
            messageDiv.appendChild(contentParagraph);

            if (photoFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.classList.add('message-photo');
                    img.src = e.target.result;
                    messageDiv.appendChild(img);
                };
                reader.readAsDataURL(photoFile);
            }

            messagesContainer.appendChild(messageDiv);
            messageForm.reset();
        } else {
            alert("请输入您的名字和留言内容。");
        }
    });
});
