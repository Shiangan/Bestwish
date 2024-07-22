document.addEventListener("DOMContentLoaded", function() {
    // 初始化轮播图
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true // 添加箭头
    });

    // 设置地图
    function initMap() {
        const funeralSpaceLocation = { lat: 25.038, lng: 121.5645 }; // 替换为实际位置
        const funeralLocation = { lat: 25.045, lng: 121.5654 }; // 替换为实际位置

        const mapOptions = {
            zoom: 15,
            center: funeralSpaceLocation
        };

        const map = new google.maps.Map(document.getElementById("map-container"), mapOptions);

        new google.maps.Marker({
            position: funeralSpaceLocation,
            map: map,
            title: "牌位安置地點"
        });

        new google.maps.Marker({
            position: funeralLocation,
            map: map,
            title: "出殯地點"
        });

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(funeralSpaceLocation);
        bounds.extend(funeralLocation);
        map.fitBounds(bounds);
    }

    if (document.getElementById("map-container")) {
        initMap();
    }

    // 处理留言表单
    const messageForm = document.getElementById("message-form");
    const messagesContainer = document.getElementById("messages-container");

    if (messageForm) {
        messageForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const name = document.getElementById("message-name").value;
            const content = document.getElementById("message-content").value;

            if (name && content) {
                const messageItem = document.createElement("div");
                messageItem.classList.add("message-item");
                messageItem.innerHTML = `<strong>${name}</strong><p>${content}</p>`;
                messagesContainer.appendChild(messageItem);

                // 清除表单字段
                messageForm.reset();
            }
        });
    }

    // 音乐播放控制
    const musicToggle = document.getElementById("music-toggle");
    const backgroundMusic = document.getElementById("background-music");

    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener("click", function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggle.textContent = "🔊";
            } else {
                backgroundMusic.pause();
                musicToggle.textContent = "🔇";
            }
        });
    }

    // 处理第一页的信息提交表单
    const infoForm = document.getElementById("info-form");

    if (infoForm) {
        infoForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(infoForm);

            // 可以通过 AJAX 将数据发送到服务器
            // 或进行其他处理

            alert("信息已提交！");
        });
    }

    // 处理花篮订单链接
    const flowerOrderLink = document.getElementById("flower-order-link");

    if (flowerOrderLink) {
        flowerOrderLink.addEventListener("click", function() {
            window.location.href = "flower-order.html";
        });
    }

    // 从 URL 参数获取数据并填充页面
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        });
        return params;
    }

    const params = getQueryParams();

    if (params.name) {
        document.getElementById("name").textContent = params.name;
    }

    if (params.photo) {
        document.getElementById("obituary-photo").src = params.photo;
    }

    if (params['birth-date']) {
        document.getElementById("birth-date").textContent = params['birth-date'];
    }

    if (params['death-date']) {
        document.getElementById("death-date").textContent = params['death-date'];
    }

    if (params['funeral-space']) {
        document.getElementById("funeral-space").textContent = params['funeral-space'];
    }

    if (params['family-service-time']) {
        document.getElementById("family-service-time").textContent = params['family-service-time'];
    }

    if (params['public-service-time']) {
        document.getElementById("public-service-time").textContent = params['public-service-time'];
    }

    if (params['funeral-location']) {
        document.getElementById("funeral-location").textContent = params['funeral-location'];
    }

    if (params['music-choice']) {
        document.getElementById("background-music").src = params['music-choice'];
    }

    if (params['additional-photos']) {
        const additionalPhotos = params['additional-photos'].split(',');
        additionalPhotos.forEach(photo => {
            $('.carousel').slick('slickAdd', `<div><img src="${photo}" alt="追思照片"></div>`);
        });
    }
});
