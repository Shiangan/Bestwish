<script>
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
        let comments = JSON.parse(localStorage.getItem("comments")) || [];

        function displayComments() {
            commentsContainer.innerHTML = comments
                .map(
                    (comment, index) => `
                    <div class="comment">
                        <strong>${comment.name}</strong>: ${comment.message}
                        <button class="edit-comment" data-index="${index}">編輯</button>
                        <button class="delete-comment" data-index="${index}">刪除</button>
                    </div>`
                )
                .join("");
        }

        function saveComments() {
            localStorage.setItem("comments", JSON.stringify(comments));
            displayComments();
        }

        commentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("comment-name").value;
            const message = document.getElementById("comment-message").value;
            comments.push({ name, message });
            saveComments();
            commentForm.reset();
        });

        // Handle edit and delete buttons
        commentsContainer.addEventListener("click", function (e) {
            const index = e.target.dataset.index;
            if (e.target.classList.contains("edit-comment")) {
                const newMessage = prompt("編輯留言:", comments[index].message);
                if (newMessage !== null) {
                    comments[index].message = newMessage;
                    saveComments();
                }
            } else if (e.target.classList.contains("delete-comment")) {
                if (confirm("確定要刪除此留言嗎?")) {
                    comments.splice(index, 1);
                    saveComments();
                }
            }
        });

        // Clear all comments (only for admin)
        const clearCommentsButton = document.getElementById("clear-comments-button");
        clearCommentsButton.addEventListener("click", function () {
            if (confirm("確定要清除所有留言嗎?")) {
                comments = [];
                saveComments();
            }
        });

        // Display comments on load
        displayComments();

        // Flower basket section toggle
        const flowerBasketGallery = document.getElementById("flower-basket-gallery");
        document.getElementById("show-flower-baskets").addEventListener("click", function () {
            flowerBasketGallery.style.display = "block";
        });

        // Background music autoplay
        const backgroundMusic = document.getElementById("background-music");
        if (backgroundMusic) {
            backgroundMusic.play().catch(error => {
                console.warn("自動播放被阻止:", error);
                document.addEventListener("click", () => {
                    backgroundMusic.play().catch(err => console.warn("点击后播放失败:", err));
                }, { once: true });
            });
        }

        // Window scroll event for timeline animation
        window.addEventListener("scroll", animateTimeline);

        // Initial timeline animation check
        animateTimeline();
    });
</script>
