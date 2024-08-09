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

    // 加載音樂設置
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

    // 加載內容
    function loadContent() {
        const storedPhotos = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
        const mainPhotoUrl = localStorage.getItem('mainPhoto') || '';
        const paperObituaryUrl = localStorage.getItem('paperObituary') || '';
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        
        // 設置主要照片
        document.getElementById('main-photo').src = mainPhotoUrl;
        
        // 設置訃告紙本
        document.getElementById('paper-obituary').src = paperObituaryUrl;

        // 設置輪播照片
        photos = storedPhotos;
        updateCarousel();
        
        // 設置留言
        commentsContainer.innerHTML = comments.map(comment => `
            <div class="comment" data-id="${comment.id}">
                     <p><strong>${comment.name}:</strong> ${comment.message}</p>
                ${comment.isOwner ? `
                    <button class="edit-btn">編輯</button>
                    <button class="delete-btn">刪除</button>
                ` : ''}
            </div>
        `).join('');

        // 編輯和刪除按鈕事件
        commentsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('edit-btn')) {
                const commentDiv = event.target.closest('.comment');
                const commentId = commentDiv.dataset.id;
                const comment = comments.find(c => c.id === commentId);
                const newMessage = prompt('編輯留言:', comment.message);
                if (newMessage !== null) {
                    comment.message = newMessage;
                    localStorage.setItem('comments', JSON.stringify(comments));
                    loadContent();
                }
            } else if (event.target.classList.contains('delete-btn')) {
                const commentDiv = event.target.closest('.comment');
                const commentId = commentDiv.dataset.id;
                const index = comments.findIndex(c => c.id === commentId);
                comments.splice(index, 1);
                localStorage.setItem('comments', JSON.stringify(comments));
                loadContent();
            }
        });

        // 提交留言
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('comment-name').value;
            const message = document.getElementById('comment-message').value;
            const newComment = {
                id: Date.now().toString(),
                name: name,
                message: message,
                isOwner: true // 這裡應根據實際情況設置用戶是否為留言者
            };
            comments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(comments));
            loadContent();
        });

        // 音樂播放控制
        playMusicButton.addEventListener('click', function() {
            backgroundMusic.play().catch(console.error);
            playMusicButton.style.display = "none";
            stopMusicButton.style.display = "inline";
            localStorage.setItem('musicPlaying', 'true');
        });

        stopMusicButton.addEventListener('click', function() {
            backgroundMusic.pause();
            playMusicButton.style.display = "inline";
            stopMusicButton.style.display = "none";
            localStorage.setItem('musicPlaying', 'false');
        });

        // 輪播控制
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
            updateCarousel();
        });

        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % photos.length;
            updateCarousel();
        });
    }

    function updateCarousel() {
        photoCarousel.innerHTML = photos.map((photo, index) => `
            <img src="${photo}" style="display: ${index === currentIndex ? 'block' : 'none'};">
        `).join('');
    }

    loadMusicSettings();
    loadContent();
});
