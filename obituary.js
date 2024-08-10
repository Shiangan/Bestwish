    document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    $('#photo-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
    });

    // Carousel controls
    document.getElementById('prev-button').addEventListener('click', function() {
        $('#photo-carousel').slick('slickPrev');
    });
    document.getElementById('next-button').addEventListener('click', function() {
        $('#photo-carousel').slick('slickNext');
    });

    // Handle comment form submission
    document.getElementById('comment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('comment-name');
        const messageInput = document.getElementById('comment-message');
        const commentsContainer = document.getElementById('comments-container');
        
        // Create new comment
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <strong>${nameInput.value}</strong>
            <p>${messageInput.value}</p>
            <button class="edit-btn">編輯</button>
            <button class="delete-btn">刪除</button>
        `;
        
        // Append new comment
        commentsContainer.appendChild(commentElement);
        
        // Clear form fields
        nameInput.value = '';
        messageInput.value = '';
        
        // Add edit and delete functionality
        commentElement.querySelector('.edit-btn').addEventListener('click', function() {
            const newMessage = prompt('請輸入新的留言內容:', messageInput.value);
            if (newMessage !== null) {
                messageInput.value = newMessage;
                commentElement.querySelector('p').textContent = newMessage;
            }
        });
        
        commentElement.querySelector('.delete-btn').addEventListener('click', function() {
            commentsContainer.removeChild(commentElement);
        });
    });

    // Handle flower basket display
    document.getElementById('show-flower-baskets').addEventListener('click', function() {
        const flowerBasketGallery = document.getElementById('flower-basket-gallery');
        if (flowerBasketGallery.innerHTML === '') {
            flowerBasketGallery.innerHTML = `
                <div class="flower-basket-item">
                    <img src="image/花籃A.JPG" alt="花籃A">
                    <p class="price">NT$2,500</p>
                </div>
                <div class="flower-basket-item">
                    <img src="image/花籃B.JPG" alt="花籃B">
                    <p class="price">NT$3,000</p>
                </div>
                <div class="flower-basket-item">
                    <img src="image/花籃C.JPG" alt="花籃C">
                    <p class="price">NT$3,500</p>
                </div>
                <div class="flower-basket-item">
                    <img src="image/花籃D.JPG" alt="花籃D">
                    <p class="price">NT$4,000</p>
                </div>
                <div class="flower-basket-item">
                    <img src="image/花籃E.JPG" alt="花籃E">
                    <p class="price">NT$5,000</p>
                </div>
                <div class="flower-basket-item">
                    <img src="image/花籃F.JPG" alt="花籃F">
                    <p class="price">NT$5,500</p>
                </div>
                <div class="flower-basket-item">
                    <img src="image/花籃G.JPG" alt="花籃G">
                    <p class="price">NT$6,000</p>
                </div>
                <div class="flower-basket-item">
                    <img src="image/花籃H.JPG" alt="花籃H">
                    <p class="price">NT$6,500</p>
                </div>
            `;
        }
    });
});
