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
    document.getElementById('main-photo').src = 'image/main-photo.jpg'; // Placeholder path
    document.getElementById('life-story').textContent = '這是生平介紹的內容。';

    // Load and display paper obituary
    document.getElementById('paper-obituary').src = 'image/paper-obituary.jpg'; // Placeholder path

    // Handle comment form submission
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;

        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <strong>${name}</strong> <span>${new Date().toLocaleString()}</span>
            <p>${message}</p>
            <button class="edit-comment">編輯</button>
            <button class="delete-comment">刪除</button>
        `;
        commentsContainer.appendChild(commentElement);

        // Clear form
        commentForm.reset();
    });

    commentsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-comment')) {
            const commentElement = event.target.closest('.comment');
            const p = commentElement.querySelector('p');
            const newMessage = prompt('編輯留言內容:', p.textContent);
            if (newMessage) {
                p.textContent = newMessage;
            }
        } else if (event.target.classList.contains('delete-comment')) {
            const commentElement = event.target.closest('.comment');
            commentsContainer.removeChild(commentElement);
        }
    });

    // Handle flower donation button click
    const donateButton = document.getElementById('donate-button');
    const flowerBasket = document.getElementById('flower-basket');

    donateButton.addEventListener('click', function() {
        flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'block' : 'none';
    });
});
