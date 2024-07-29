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

            const musicToggle = document.getElementById('music-toggle');
            musicToggle.addEventListener('click', function() {
                if (backgroundMusic.paused) {
                    backgroundMusic.play();
                    musicToggle.textContent = '🔇';
                } else {
                    backgroundMusic.pause();
                    musicToggle.textContent = '🔊';
                }
            });
        }

        // 初始化地图
        const mapContainer = document.getElementById('map-container');
        const map = new google.maps.Map(mapContainer, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
        // 可以根据 funeralLocation 定位地图
    }

    // 页面加载时加载訃聞数据
    loadObituaryData();

    // 留言区处理
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-container');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('message-name').value;
        const content = document.getElementById('message-content').value;
        const photoFile = document.getElementById('message-photo').files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
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
                const img = document.createElement('img');
                img.classList.add('message-photo');
                img.src = e.target.result;
                messageDiv.appendChild(img);
            }

            messagesContainer.appendChild(messageDiv);

            // 清空表单
            messageForm.reset();
        };

        if (photoFile) {
            reader.readAsDataURL(photoFile);
        } else {
            reader.onload(); // 没有图片也创建留言
        }
    });
});
