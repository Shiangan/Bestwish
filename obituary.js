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
});
