document.addEventListener('DOMContentLoaded', function() {
    // Initialize the photo carousel for obituary
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        $(carousel).slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true
        });
    }

    // Load and display main photo and life story
    const mainPhoto = document.getElementById('main-photo');
    const lifeStory = document.getElementById('life-story');
    const paperObituary = document.getElementById('paper-obituary');

    if (mainPhoto) {
        mainPhoto.src = localStorage.getItem('mainPhoto') || 'image/main-photo.jpg'; // Use stored URL or placeholder
    }
    if (lifeStory) {
        lifeStory.textContent = localStorage.getItem('lifeStory') || '這是生平介紹的內容。'; // Use stored content or placeholder
    }
    if (paperObituary) {
        paperObituary.src = localStorage.getItem('paperObituary') || 'image/paper-obituary.jpg'; // Use stored URL or placeholder
    }

    // Handle comment form submission
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;

        if (name && message) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <strong>${name}</strong> <span>${new Date().toLocaleString()}</span>
                <p>${message}</p>
                <button class="edit-button">編輯</button>
                <button class="delete-button">刪除</button>
            `;
            commentsContainer.appendChild(commentDiv);

            // Add edit and delete functionality
            commentDiv.querySelector('.edit-button').addEventListener('click', function() {
                const newMessage = prompt('編輯留言內容:', message);
                if (newMessage !== null) {
                    message = newMessage;
                    commentDiv.querySelector('p').textContent = message;
                }
            });

            commentDiv.querySelector('.delete-button').addEventListener('click', function() {
                if (confirm('確定要刪除這條留言嗎？')) {
                    commentsContainer.removeChild(commentDiv);
                }
            });

            // Clear form
            commentForm.reset();
        }
    });

    // Handle flower basket button click
    const donateButton = document.getElementById('donate-button');
    const flowerBasket = document.getElementById('flower-basket');

    donateButton.addEventListener('click', function() {
        if (flowerBasket) {
            flowerBasket.style.display = (flowerBasket.style.display === 'none' || flowerBasket.style.display === '') ? 'block' : 'none';
        }
    });
});
