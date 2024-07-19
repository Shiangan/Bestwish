document.addEventListener("DOMContentLoaded", function() {
    const name = localStorage.getItem('name') || '某某';
    const birthDate = localStorage.getItem('birthDate') || '1970-01-01';
    const deathDate = localStorage.getItem('deathDate') || '2024-01-01';
    const funeralSpace = localStorage.getItem('funeralSpace') || '台北市某某堂';
    const familyServiceTime = localStorage.getItem('familyServiceTime') || '2024-01-05 10:00';
    const publicServiceTime = localStorage.getItem('publicServiceTime') || '2024-01-06 14:00';
    const funeralLocation = localStorage.getItem('funeralLocation') || '台北市某某禮堂';
    const age = localStorage.getItem('age') || '50';
    const photoUrl = localStorage.getItem('photoUrl') || 'image/default.jpg';
    const funeralMap = localStorage.getItem('funeralMap') || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2528262466894!2d144.96313831531834!3d-37.8162189797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sVictoria%20Harbour%20Promenade%2C%20Docklands%20VIC%203008%2C%20Australia!5e0!3m2!1sen!2stw!4v1622461560451!5m2!1sen!2stw';
    const photoUrls = JSON.parse(localStorage.getItem('photoUrls')) || [
        'image/photo1.jpg',
        'image/photo2.jpg',
        'image/photo3.jpg'
    ];

    // 填充訃聞信息
    document.getElementById('name').textContent = name;
    document.getElementById('birth-date').textContent = birthDate;
    document.getElementById('death-date').textContent = deathDate;
    document.getElementById('age').textContent = age;
    document.getElementById('funeral-space').textContent = funeralSpace;
    document.getElementById('family-service-time').textContent = familyServiceTime;
    document.getElementById('public-service-time').textContent = publicServiceTime;
    document.getElementById('funeral-location').textContent = funeralLocation;
    document.getElementById('obituary-photo').src = photoUrl;
    document.getElementById('funeral-map').src = funeralMap;

    // 填充輪播照片
    const photoCarousel = document.getElementById('photo-carousel');
    photoUrls.forEach(url => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = url;
        img.alt = '追思照片';
        div.appendChild(img);
        photoCarousel.appendChild(div);
    });

    // 啟動背景音樂
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play();

    // 啟動輪播
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
    });

    // 留言表單提交處理
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-container');

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageContent = document.getElementById('message-content').value;
        const messageElement = document.createElement('div');
        messageElement.textContent = messageContent;
        messagesContainer.appendChild(messageElement);
        messageForm.reset();
    });
});
