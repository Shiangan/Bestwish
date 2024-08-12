document.addEventListener("DOMContentLoaded", function() {
    // 背景音樂自動播放
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play();

    // 留言板提交功能
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('comment-name').value.trim();
        const message = document.getElementById('comment-message').value.trim();

        if (name && message) {
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `<strong>${name}</strong><p>${message}</p>`;

            commentsContainer.appendChild(newComment);
            commentForm.reset(); // 重置表單
        }
    });

    // 花籃展示功能
    const flowerBasketsButton = document.getElementById('show-flower-baskets');
    const flowerBasketGallery = document.getElementById('flower-basket-gallery');

    flowerBasketsButton.addEventListener('click', function() {
        flowerBasketGallery.style.display = 'flex';
    });
});
