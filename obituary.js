document.addEventListener("DOMContentLoaded", function() {
    // 从 localStorage 加载数据
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

    // 初始化轮播
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    });

    // 处理留言表单提交
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-container');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const messageContent = document.getElementById('message-content').value;
        if (messageContent.trim()) {
            const messageElement = document.createElement('div');
            messageElement.textContent = messageContent;
            messagesContainer.appendChild(messageElement);
            messageForm.reset();
        }
    });

    // 初始化 Google Map
    const mapContainer = document.getElementById('map-container');
    const mapOptions = {
        zoom: 15,
        center: { lat: 25.0330, lng: 121.5654 } // 替换为实际位置
    };

    const map = new google.maps.Map(mapContainer, {
        center: mapOptions.center,
        zoom: mapOptions.zoom
    });

    const marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: '儀式地點'
    });

    // 懒加载并淡入效果
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
