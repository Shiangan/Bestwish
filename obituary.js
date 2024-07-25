document.addEventListener("DOMContentLoaded", function() {
    const musicToggleButton = document.getElementById("music-toggle");
    const backgroundMusic = document.getElementById("background-music");

    // 音樂播放和暫停控制
    musicToggleButton.addEventListener("click", function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggleButton.textContent = "🔊"; // 音樂播放時顯示音量圖示
        } else {
            backgroundMusic.pause();
            musicToggleButton.textContent = "🔈"; // 音樂暫停時顯示靜音圖示
        }
    });

    // 初始化 Slick Carousel
    $('.carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    // 初始化 Google 地圖
    function initMap() {
        const mapOptions = {
            center: { lat: 25.038, lng: 121.5645 }, // 替換為您的地圖中心點
            zoom: 15,
        };
        const map = new google.maps.Map(document.getElementById("map-container"), mapOptions);
        // 如果需要，添加地圖標記
        // new google.maps.Marker({
        //     position: { lat: 25.038, lng: 121.5645 },
        //     map: map,
        // });
    }

    initMap();

    // 加載存儲的數據
    const name = localStorage.getItem('name');
    const birthDate = localStorage.getItem('birthDate');
    const deathDate = localStorage.getItem('deathDate');
    const age = localStorage.getItem('age');
    const funeralSpace = localStorage.getItem('funeralSpace');
    const funeralDate = localStorage.getItem('funeralDate');
    const funeralLocation = localStorage.getItem('funeralLocation');
    const familyServiceTime = localStorage.getItem('familyServiceTime');
    const publicServiceTime = localStorage.getItem('publicServiceTime');

    if (name) document.getElementById("name").textContent = name;
    if (birthDate) document.getElementById("birth-date").textContent = birthDate;
    if (deathDate) document.getElementById("death-date").textContent = deathDate;
    if (age) document.getElementById("age").textContent = age;
    if (funeralSpace) document.getElementById("funeral-space").textContent = funeralSpace;
    if (funeralDate) document.getElementById("funeral-date").textContent = funeralDate;
    if (funeralLocation) document.getElementById("funeral-location").textContent = funeralLocation;
    if (familyServiceTime) document.getElementById("family-service-time").textContent = familyServiceTime;
    if (publicServiceTime) document.getElementById("public-service-time").textContent = publicServiceTime;

    // 音樂播放
    const selectedMusic = localStorage.getItem('selectedMusic');
    if (selectedMusic) {
        backgroundMusic.src = selectedMusic;
        backgroundMusic.play().catch(function(error) {
            console.log("自動播放音樂失敗，需要使用者互動", error);
        });
    }

    // 處理留言表單提交
    document.getElementById("message-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("message-name").value;
        const content = document.getElementById("message-content").value;
        const messageContainer = document.getElementById("messages-container");

        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.innerHTML = `<strong>${name}</strong>: <p>${content}</p>`;
        messageContainer.appendChild(messageDiv);

        // 可以在此處添加存儲留言的代碼，例如將留言保存到伺服器或 localStorage
        document.getElementById("message-form").reset();
    });
});
