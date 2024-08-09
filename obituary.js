// obituary.js

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('#carousel-images img');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    let currentIndex = 0;

    function updateCarousel() {
        images.forEach((img, index) => {
            img.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    updateCarousel(); // Initialize carousel
});

// Background music
const audio = document.getElementById('background-music');
audio.src = 'music/background.mp3'; // Replace with actual music file path
audio.play();

// Comment form handling
const commentForm = document.getElementById('comment-form');
const commentsContainer = document.getElementById('comments-container');

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('comment-name').value;
    const message = document.getElementById('comment-message').value;

    // Create new comment element
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
        <strong>${name}</strong>
        <p>${message}</p>
        <button class="edit-button">編輯</button>
        <button class="delete-button">刪除</button>
    `;
    
    // Add comment to container
    commentsContainer.appendChild(comment);
    
    // Clear form fields
    commentForm.reset();
});

// Edit and delete comment functionality
commentsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-button')) {
        const comment = e.target.parentElement;
        const name = comment.querySelector('strong').innerText;
        const message = comment.querySelector('p').innerText;
        
        document.getElementById('comment-name').value = name;
        document.getElementById('comment-message').value = message;
        
        commentsContainer.removeChild(comment);
    } else if (e.target.classList.contains('delete-button')) {
        const comment = e.target.parentElement;
        commentsContainer.removeChild(comment);
    }
});

// Function to update main photo and other dynamic content from index
function updateMainPhoto(photoUrl) {
    document.getElementById('main-photo').src = photoUrl;
}

function updateObituaryContent(obituaryData) {
    document.getElementById('paper-obituary').src = obituaryData.paperPhotoUrl;
    document.getElementById('timeline').innerHTML = obituaryData.timelineHtml;
    document.getElementById('comments-container').innerHTML = obituaryData.commentsHtml;
    document.getElementById('donate-button').addEventListener('click', () => {
        window.location.href = 'https://line.me/ti/p/LINEID'; // Replace with actual LINE link
    });
}

// Example of how to use the update functions
updateMainPhoto('images/deceased-main.jpg');
updateObituaryContent({
    paperPhotoUrl: 'images/obituary-paper.jpg',
    timelineHtml: `
        <div class="timeline-item">
            <div class="date">1980年1月1日</div>
            <p>出生於台北市</p>
        </div>
        <div class="timeline-item">
            <div class="date">2024年8月1日</div>
            <p>安息於台北市</p>
        </div>
    `,
    commentsHtml: `
        <div class="comment">
            <strong>張三</strong>
            <p>感謝您為我們的親人提供這份美好的回憶。</p>
            <button class="edit-button">編輯</button>
            <button class="delete-button">刪除</button>
        </div>
    `
});
