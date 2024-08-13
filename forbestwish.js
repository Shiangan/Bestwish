document.addEventListener("DOMContentLoaded", function () {
    // Timeline animation
    function animateTimeline() {
        const timelineBlocks = document.querySelectorAll(".VivaTimeline .event");
        timelineBlocks.forEach(function (block) {
            const rect = block.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
                block.classList.add("animated");
            } else {
                block.classList.remove("animated");
            }
        });
    }

    // Comment Section: Handle comment form submission
    const commentForm = document.getElementById("comment-form");
    const commentsContainer = document.getElementById("comments-container");

    function displayComments(comments) {
        commentsContainer.innerHTML = comments
            .map(
                (comment, index) => `
                <div class="comment">
                    <strong>${comment.name}</strong>: ${comment.message}
                    <button class="edit-comment" data-id="${comment.id}">編輯</button>
                    <button class="delete-comment" data-id="${comment.id}">刪除</button>
                </div>`
            )
            .join("");
    }

    async function loadComments() {
        // 假设这里有一个API来获取所有评论
        const response = await fetch('/api/comments');
        const comments = await response.json();
        displayComments(comments);
    }

    async function saveComment(comment) {
        // 假设这里有一个API来保存评论
        await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        loadComments();
    }

    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("comment-name").value;
        const message = document.getElementById("comment-message").value;
        saveComment({ name, message });
        commentForm.reset();
    });

    // Handle edit and delete buttons
    commentsContainer.addEventListener("click", async function (e) {
        const id = e.target.dataset.id;
        if (e.target.classList.contains("edit-comment")) {
            const newMessage = prompt("編輯留言:");
            if (newMessage !== null) {
                // 假设这里有一个API来更新评论
                await fetch(`/api/comments/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: newMessage }),
                });
                loadComments();
            }
        } else if (e.target.classList.contains("delete-comment")) {
            if (confirm("確定要刪除此留言嗎?")) {
                // 假设这里有一个API来删除评论
                await fetch(`/api/comments/${id}`, {
                    method: 'DELETE',
                });
                loadComments();
            }
        }
    });

    // Clear all comments (only for admin)
    const clearCommentsButton = document.getElementById("clear-comments-button");
    clearCommentsButton.addEventListener("click", async function () {
        if (confirm("確定要清除所有留言嗎?")) {
            // 假设这里有一个API来清除所有评论
            await fetch('/api/comments', {
                method: 'DELETE',
            });
            loadComments();
        }
    });

    // Display comments on load
    loadComments();

    // Flower basket section toggle
    const flowerBasketGallery = document.getElementById("flower-basket-gallery");
    document.getElementById("show-flower-baskets").addEventListener("click", function () {
        flowerBasketGallery.style.display = "block";
    });

    // Background music autoplay
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.play();

    // Window scroll event for timeline animation
    window.addEventListener("scroll", animateTimeline);

    // Initial timeline animation check
    animateTimeline();
});
