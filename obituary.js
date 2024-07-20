document.addEventListener("DOMContentLoaded", function() {
    // 获取元素
    const form = document.getElementById("info-form");
    const invitationSection = document.getElementById("invitation-section");
    const photoContainer = document.getElementById("photo-container");
    const mainPhoto = document.getElementById("main-photo");
    const invitationText = document.getElementById("invitation-text");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const photoCarousel = document.querySelector(".carousel");
    const mapContainer = document.getElementById("map-container");

    // 初始化轮播
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    // 自动播放音乐
    backgroundMusic.play();

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
                localStorage.setItem('age', calculateAge(new Date(formData.get('birth-date')), new Date(formData.get('death-date'))));

                invitationSection.style.display = "flex"; // 使用 flex 布局以确保居中显示
                invitationText.style.opacity = 1;
                mainPhoto.style.opacity = 1;
                mainPhoto.src = e.target.result;
            };
            reader.readAsDataURL(photoFile);
        }

        form.style.display = "none";
    });

    // 计算年龄
    function calculateAge(birthDate, deathDate) {
        const ageDifMs = deathDate - birthDate;
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

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

    // 从 localStorage 加载数据
    function loadObituaryData() {
        const photoUrl = localStorage.getItem('photoUrl');
        const name = localStorage.getItem('name');
        const birthDate = localStorage.getItem('birthDate');
        const deathDate = localStorage.getItem('deathDate');
        const funeralSpace = localStorage.getItem('funeralSpace');
        const funeralDate = localStorage.getItem('funeralDate');
        const funeralLocation = localStorage.getItem('funeralLocation');
        const familyServiceTime = localStorage.getItem('familyServiceTime');
        const publicServiceTime = localStorage.getItem('publicServiceTime');
        const age = localStorage.getItem('age');

        if (name) {
            document.getElementById('name').textContent = name;
            document.getElementById('birth-date').textContent = birthDate;
            document.getElementById('death-date').textContent = deathDate;
            document.getElementById('age').textContent = age;
            document.getElementById('funeral-space').textContent = funeralSpace;
            document.getElementById('family-service-time').textContent = familyServiceTime;
            document.getElementById('public-service-time').textContent = publicServiceTime;
            document.getElementById('funeral-location').textContent = funeralLocation;

            if (photoUrl) {
                document.getElementById('obituary-photo').src = photoUrl;
            }
        }
    }

    loadObituaryData();

    // 初始化 Google Maps 地图
    function initMap() {
        const funeralLocation = localStorage.getItem('funeralLocation');
        const funeralSpace = localStorage.getItem('funeralSpace');

        const geocoder = new google.maps.Geocoder();
        const mapOptions = {
            zoom: 15,
            center: { lat: 25.037, lng: 121.562 } // 默认位置 (台北)
        };
        const map = new google.maps.Map(mapContainer, mapOptions);

        if (funeralLocation) {
            geocoder.geocode({ 'address': funeralLocation }, function(results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: '儀式地點'
                    });
                } else {
                    console.log('地圖地點編碼失敗: ' + status);
                }
            });
        }

        if (funeralSpace) {
            geocoder.geocode({ 'address': funeralSpace }, function(results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: '牌位安置地點'
                    });
                } else {
                    console.log('地圖地點編碼失敗: ' + status);
                }
            });
        }
    }

    initMap();
});
