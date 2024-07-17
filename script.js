document.getElementById('deceased-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const queryString = new URLSearchParams(formData).toString();
    window.location.href = 'obituary.html?' + queryString;
});

window.addEventListener('load', function() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById('deceased-name').innerText = params.get('name');
    document.getElementById('birth-date-text').innerText = params.get('birth-date');
    document.getElementById('death-date-text').innerText = params.get('death-date');
    document.getElementById('funeral-space-text').innerText = params.get('funeral-space');
    document.getElementById('funeral-date-text').innerText = params.get('funeral-date');
    document.getElementById('funeral-location-text').innerText = params.get('funeral-location');
    document.getElementById('family-service-time-text').innerText = params.get('family-service-time');
    document.getElementById('public-service-time-text').innerText = params.get('public-service-time');
    document.getElementById('life-story-text').innerText = params.get('life-story');
    const photoUrl = params.get('photo');
    if (photoUrl) {
        const photo = document.getElementById('deceased-photo');
        photo.src = URL.createObjectURL(photoUrl);
        photo.style.display = 'block';
    }
    document.getElementById('background-music').src = params.get('music-choice');
    document.getElementById('background-music').play();
});
