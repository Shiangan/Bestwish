document.addEventListener("DOMContentLoaded", function() {
    const photo = localStorage.getItem('photoUrl');
    const name = localStorage.getItem('name');
    const birthDate = localStorage.getItem('birthDate');
    const deathDate = localStorage.getItem('deathDate');
    const funeralSpace = localStorage.getItem('funeralSpace');
    const funeralLocation = localStorage.getItem('funeralLocation');
    const familyServiceTime = localStorage.getItem('familyServiceTime');
    const publicServiceTime = localStorage.getItem('publicServiceTime');
    const age = localStorage.getItem('age');

    if (photo) {
        document.getElementById('obituary-photo').src = photo;
    }
    document.getElementById('name').textContent = name;
    document.getElementById('birth-date').textContent = birthDate;
    document.getElementById('death-date').textContent = deathDate;
    document.getElementById('funeral-space').textContent = funeralSpace;
    document.getElementById('funeral-location').textContent = funeralLocation;
    document.getElementById('family-service-time').textContent = familyServiceTime;
    document.getElementById('public-service-time').textContent = publicServiceTime;
    document.getElementById('age').textContent = age;

    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-container');

     // 處理留言提交
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        const name = $('#message-name').val();
        const content = $('#message-content').val();
        const messageHtml = `<div class="message"><strong>${name}</strong><p>${content}</p></div>`;
        $('#messages-container').append(messageHtml);
        $('#message-form')[0].reset();
    });
});
    // 加載Google地圖
    function initMap() {
        const location = { lat: 25.0330, lng: 121.5654 }; // 台北101坐標（需替換為實際地點）
        const map = new google.maps.Map(document.getElementById('map-container'), {
            zoom: 15,
            center: location
        });
        new google.maps.Marker({
            position: location,
            map: map
        });
    }

    google.maps.event.addDomListener(window, 'load', initMap);

    // Lazy loading sections with fade-in effect
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});


$(document).ready(function(){
    // 初始化轮播
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    // 加載追思照片（假設照片URLs存儲在localStorage中）
    const photos = JSON.parse(localStorage.getItem('photos')) || [];
    const $carousel = $('.carousel');
    photos.forEach(photo => {
        $carousel.slick('slickAdd', `<div><img src="${photo}" alt="追思照片"></div>`);
    });

    // 音乐控制
    $('#music-control').click(function() {
        var music = document.getElementById('background-music');
        if (music.paused) {
            music.play();
            $(this).text('🔊');
        } else {
            music.pause();
            $(this).text('🔇');
        }
    });
});
