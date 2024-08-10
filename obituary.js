document.addEventListener('DOMContentLoaded', function() {
    // Initialize photo carousel
    $('#photo-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true
    });

    // Initialize comments storage
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.getElementById('comment-form');
    const nameInput = document.getElementById('comment-name');
    const messageInput = document.getElementById('comment-message');

    // Load comments from localStorage
    const loadComments = () => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsContainer.innerHTML = comments.map(comment => `
            <div class="comment">
                <strong>${comment.name}</strong>
                <p>${comment.message}</p>
            </div>
        `).join('');
    };

    loadComments();

    // Handle form submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            // Save new comment
            const comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments.push({ name, message });
            localStorage.setItem('comments', JSON.stringify(comments));

            // Append new comment
            commentsContainer.innerHTML = `
                ${comments.map(comment => `
                    <div class="comment">
                        <strong>${comment.name}</strong>
                        <p>${comment.message}</p>
                    </div>
                `).join('')}
            `;
            
            // Clear the form nameInput.value = '';
            messageInput.value = '';
        }
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

    // Intersection Observer for animation on scroll
    const elementsToShow = document.querySelectorAll('#timeline, #comments-section, #donate-flower');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToShow.forEach(el => {
        observer.observe(el);
    });
});
