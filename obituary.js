document.addEventListener("DOMContentLoaded", function() {
    const backgroundMusic = document.getElementById("background-music");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const photoCarousel = document.getElementById("carousel-images");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const commentsContainer = document.getElementById("comments-container");
    const commentForm = document.getElementById("comment-form");
    const donateButton = document.getElementById("donate-button");

    let currentIndex = 0;
    let photos = [];
    let musicUrl = localStorage.getItem('musicUrl') || '';

    function loadMusicSettings() {
        if (musicUrl) {
            backgroundMusic.src = musicUrl;
            if (localStorage.getItem('musicPlaying') === 'true') {
                backgroundMusic.play().catch(console.error);
                playMusicButton.style.display = "none";
                stopMusicButton.style.display = "inline";
            }
        }
    }

    function loadContent() {
        const storedPhotos = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
        const mainPhotoUrl = localStorage.getItem('mainPhoto') || '';
        const paperObituaryUrl = localStorage.getItem('paperObituary') || '';
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        
        document.getElementById('main-photo').src = mainPhotoUrl;
        document.getElementById('paper-obituary').src = paperObituaryUrl;

        photos = storedPhotos;
        updateCarousel();
        
        commentsContainer.innerHTML = comments.map(comment => `
            <div class="comment">
                <p><strong>${comment.name}:</strong> ${comment.message}</p>
                <button class="edit-btn" onclick="editComment('${comment.id}')">編輯</button>
                <button class="delete-btn" onclick="deleteComment('${comment.id}')">刪除</button>
            </div>
        `).join('');
    }

    function updateCarousel() {
        const carouselImages = document.getElementById('carousel-images');
        carouselImages.innerHTML = photos.map(photo => `
            <img src="${photo.url}" alt="Photo">
        `).join('');
        updateCarouselControls();
    }

    function updateCarouselControls() {
        if (photos.length > 0) {
            document.getElementById('photo-carousel').style.display = 'block';
            showPhoto(currentIndex);
        } else {
            document.getElementById('photo-carousel').style.display = 'none';
        }

        // 顯示指定的照片
    function showPhoto(index) {
        const carouselImages = document.getElementById('carousel-images');
        const width = carouselImages.offsetWidth;
        carouselImages.style.transform = `translateX(${-index * width}px)`;
    }

    // 上一張照片
    prevButton.addEventListener('click', () => {
        if (photos.length > 0) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : photos.length - 1;
            showPhoto(currentIndex);
        }
    });

    // 下一張照片
    nextButton.addEventListener('click', () => {
        if (photos.length > 0) {
            currentIndex = (currentIndex < photos.length - 1) ? currentIndex + 1 : 0;
            showPhoto(currentIndex);
        }
    });

    // 音樂播放
    playMusicButton.addEventListener('click', () => {
        backgroundMusic.play().then(() => {
            localStorage.setItem('musicPlaying', 'true');
            playMusicButton.style.display = "none";
            stopMusicButton.style.display = "inline";
        }).catch(console.error);
    });

    // 音樂停止
    stopMusicButton.addEventListener('click', () => {
        backgroundMusic.pause();
        localStorage.setItem('musicPlaying', 'false');
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });

    // 提交留言
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;
        const newComment = {
            id: Date.now().toString(),
            name,
            message
        };
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        commentForm.reset();
        loadContent();
    });

    // 編輯留言
    window.editComment = function(id) {
        // 編輯留言的邏輯（可根據需求實現）
    };

    // 刪除留言
    window.deleteComment = function(id) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments = comments.filter(comment => comment.id !== id);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadContent();
    };

    // 致贈花籃按鈕事件
    donateButton.addEventListener('click', () => {
        window.location.href = 'flower-order.html';
    });

    // 載入音樂設置和內容
    loadMusicSettings();
    loadContent();
});
