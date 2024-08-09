document.addEventListener("DOMContentLoaded", function() {
    const mainPhoto = document.getElementById("main-photo");
    const additionalPhotos = document.querySelectorAll(".carousel img");
    const lightbox = document.getElementById("lightbox");
    const commentForm = document.getElementById("comment-form");
    const commentList = document.getElementById("comment-list");

    // Lightbox functionality
    function openLightbox(imageUrl) {
        lightbox.style.display = "flex";
        lightbox.innerHTML = `<img src="${imageUrl}" alt="Enlarged Image">`;
    }

    function closeLightbox() {
        lightbox.style.display = "none";
    }

    lightbox.addEventListener("click", closeLightbox);

    mainPhoto.addEventListener("click", function() {
        openLightbox(mainPhoto.src);
    });

    additionalPhotos.forEach(photo => {
        photo.addEventListener("click", function() {
            openLightbox(photo.src);
        });
    });

    // Comment functionality with local storage
    function saveComment(content) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ content });
        localStorage.setItem('comments', JSON.stringify(comments));
        displayComments();
    }

    function deleteComment(index) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        displayComments();
    }

    function displayComments() {
        commentList.innerHTML = '';
        const comments = JSON.parse(localStorage.getItem('comments')) ||        [];
        comments.forEach((comment, index) => {
            const commentItem = document.createElement('li');
            commentItem.textContent = comment.content;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '刪除';
            deleteButton.addEventListener('click', function() {
                deleteComment(index);
            });
            commentItem.appendChild(deleteButton);
            commentList.appendChild(commentItem);
        });
    }

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentContent = commentForm.elements['comment-content'].value.trim();
        if (commentContent) {
            saveComment(commentContent);
            commentForm.reset();
        }
    });

    displayComments();

    // Timeline interaction
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            item.classList.toggle('expanded');
        });
    });
});
