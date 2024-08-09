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
    let photos = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
    let musicUrl = localStorage.getItem('musicUrl') || '';

    function loadMusicSettings() {
        if (musicUrl) {
            backgroundMusic.src = musicUrl;
            if (localStorage.getItem('musicPlaying') === 'true') {
                backgroundMusic.play().catch(console.error);
                playMusicButton.style.display = "none";
                stopMusicButton.style.display = "inline";
            }
        } else {
            backgroundMusic.src = ''; // 如果沒有音樂URL，確保音樂源為空
        }
    }

    function loadContent() {
        const mainPhotoUrl = localStorage.getItem('mainPhoto') || '';
        const paperObituaryUrl = localStorage.getItem('paperObituary') || '';
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        
        // 設置主要照片
        document.getElementById('main-photo').src = mainPhotoUrl;

        // 設置訃告紙本照片
        document.getElementById('paper-obituary').src = paperObituaryUrl;

        // 設置輪播照片
        renderCarousel();

        // 設置留言區
        renderComments(comments);

        // 音樂設置
        loadMusicSettings();
    }

    function renderCarousel() {
        photoCarousel.innerHTML = photos.map(photoUrl => `
            <img src="${photoUrl}" alt="Photo">
        `).join('');
        updateCarousel(); // 初始化輪播
    }

    function updateCarousel() {
        const offset = -currentIndex * 100;
        photoCarousel.style.transform = `translateX(${offset}%)`;
    }

    function renderComments(comments) {
        commentsContainer.innerHTML = comments.map((comment, index) => `
            <div class="comment">
                <strong>${comment.name}</strong>
                <p>${comment.message}</p>
                <button class="edit-btn" onclick="editComment(${index})">編輯</button>
                <button class="delete-btn" onclick="deleteComment(${index})">刪除</button>
            </div>
        `).join('');
    }

    function editComment(index) {
        const comment = JSON.parse(localStorage.getItem('comments'))[index];
        document.getElementById('comment-name').value = comment.name;
        document.getElementById('comment-message').value = comment.message;
        commentForm.onsubmit = (e) => {
            e.preventDefault();
            const updatedComments = JSON.parse(localStorage.getItem('comments'));
            updatedComments[index] = {
                name: document.getElementById('comment-name').value,
                message: document.getElementById('comment-message').value
            };
            localStorage.setItem('comments', JSON.stringify(updatedComments));
            renderComments(updatedComments);
        };
    }

    function deleteComment(index) {
        const updatedComments = JSON.parse(localStorage.getItem('comments')).filter((_, i) => i !== index);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
        renderComments(updatedComments);
    }

    commentForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, message });
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments(comments);
    };

    prevButton.addEventListener('click', () => {
        if (photos.length > 0) {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (photos.length > 0) {
            currentIndex = (currentIndex + 1) % photos.length;
            updateCarousel();
        }
    });

    donateButton.addEventListener('click', () => {
        window.location.href = 'https://line.me/ti/p/LINEID'; // 替換為您的 Line 連結
    });

    function handleMusicPlayback() {
        playMusicButton.addEventListener('click', () => {
            backgroundMusic.play().catch(console.error);
            localStorage.setItem('musicPlaying', 'true');
            playMusicButton.style.display = "none";
            stopMusicButton.style.display = "inline";
        });

        stopMusicButton.addEventListener('click', () => {
            backgroundMusic.pause();
            localStorage.setItem('musicPlaying', 'false');
            playMusicButton.style.display = "inline";
            stopMusicButton.style.display = "none";
        });
    }

    handleMusicPlayback();
    loadContent();
});
