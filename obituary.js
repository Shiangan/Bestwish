document.addEventListener("DOMContentLoaded", function() {
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const flowerBasket = document.getElementById("flower-basket");
    const donateButton = document.getElementById("donate-button");
    const commentForm = document.getElementById("comment-form");
    const commentsContainer = document.getElementById("comments-container");

    // Load stored data
    function loadStoredData() {
        const mainPhotoUrl = localStorage.getItem('mainPhoto');
        const lifeStoryText = localStorage.getItem('lifeStory');
        const additionalPhotoUrls = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
        const paperObituaryUrl = localStorage.getItem('paperObituary');

        if (mainPhotoUrl) document.getElementById('main-photo').src = mainPhotoUrl;
        if (lifeStoryText) document.getElementById('life-story').textContent = lifeStoryText;
        if (paperObituaryUrl) document.getElementById('paper-obituary').src = paperObituaryUrl;

        const photoCarousel = document.getElementById('photo-carousel');
        additionalPhotoUrls.forEach(url => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = url;
            img.alt = '追思照片';
            div.appendChild(img);
            photoCarousel.appendChild(div);
        });

        // Initialize Slick carousel
        $('.carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToslidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '#prev-button',
            nextArrow: '#next-button',
        });

        const musicUrl = localStorage.getItem('musicUrl');
        if (musicUrl) {
            backgroundMusic.src = musicUrl;
            const musicPlaying = localStorage.getItem('musicPlaying');
            if (musicPlaying === 'true') {
                backgroundMusic.play().catch(error => console.error("播放背景音乐失败", error));
                playMusicButton.style.display = 'none';
                stopMusicButton.style.display = 'inline';
            }
        }
    }

    // Handle music play and stop
    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play().catch(error => console.error("播放背景音乐失败", error));
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'inline';
        localStorage.setItem('musicPlaying', 'true');
    });

    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = 'inline';
        stopMusicButton.style.display = 'none';
        localStorage.setItem('musicPlaying', 'false');
    });

    // Show or hide the flower basket section
    donateButton.addEventListener('click', function() {
        flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'block' : 'none';
    });

    // Handle comment form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;

        if (name && message) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<strong>${name}</strong>: <p>${message}</p>`;
            commentsContainer.appendChild(commentDiv);
            commentForm.reset();
        }
    });

    // Load stored data when the page is ready
    loadStoredData();
});
