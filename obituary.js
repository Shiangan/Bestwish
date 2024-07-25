document.addEventListener("DOMContentLoaded", function() {
    // Initialize carousel
    if (document.querySelector('.carousel')) {
        $('.carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true
        });

        // Add photos to the carousel
        const additionalPhotos = JSON.parse(localStorage.getItem('additionalPhotosUrls') || '[]');
        const carousel = $('.carousel');
        additionalPhotos.forEach(photo => {
            carousel.slick('slickAdd', `<div><img src="${photo}" alt="追思照片"></div>`);
        });
    }

    // Set up map
    function initMap() {
        const params = getQueryParams();
        const funeralSpaceLocation = { lat: parseFloat(params['funeral-space-lat']), lng: parseFloat(params['funeral-space-lng']) };
        const funeralLocation = { lat: parseFloat(params['funeral-location-lat']), lng: parseFloat(params['funeral-location-lng']) };

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

    // Handle message form
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

                // Clear form fields
                messageForm.reset();
            }
        });
    }

    // Music control
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

        // Set initial music source from query parameters
        const params = getQueryParams();
        if (params['music-choice']) {
            backgroundMusic.src = params['music-choice'];
        }
    }

    // Handle flower order link
    const flowerOrderLink = document.getElementById("flower-order-link");

    if (flowerOrderLink) {
        flowerOrderLink.addEventListener("click", function() {
            window.location.href = "flower-order.html";
        });
    }

    // Fill page with query parameters
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
});
