document.addEventListener("DOMContentLoaded", function() {
    const mainPhoto = document.getElementById("main-photo");
    const paperObituary = document.getElementById("paper-obituary");
    const photoCarousel = document.querySelector(".photo-carousel");
    const commentsSection = document.getElementById("comments");
    const commentForm = document.getElementById("comment-form");

    // Example photo URLs (replace with dynamic content)
    const additionalPhotos = [
        "path/to/photo1.jpg",
        "path/to/photo2.jpg",
        "path/to/photo3.jpg"
    ];

    // Load photo carousel
    additionalPhotos.forEach(photoUrl => {
        const img = document.createElement("img");
        img.src = photoUrl;
        img.alt = "追憶照片";
        img.addEventListener("click", () => openPhoto(photoUrl));
        photoCarousel.appendChild(img);
    });

    // Enlarge photos on click
    function openPhoto(photoUrl) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.innerHTML = `<img src="${photoUrl}" class="enlarged-photo">`;
        overlay.addEventListener("click", () => overlay.remove());
        document.body.appendChild(overlay);
    }

    // Enlarge obituary paper
    paperObituary.addEventListener("click", () => openPhoto(paperObituary.src));

    // Handle comment submission
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name && message) {
            addComment(name, message);
            commentForm.reset();
        }
    });

    // Add comment to the list
    function addComment(name, message) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>${message}</p>
            <button class="edit-btn">編輯</button>
            <button class="delete-btn">刪除</button>
        `;
        commentsSection.appendChild(commentDiv);

        // Add edit and delete functionality
        const editButton = commentDiv.querySelector(".edit-btn");
        const deleteButton = commentDiv.querySelector(".delete-btn");

        editButton.addEventListener("click", () => editComment(commentDiv, name, message));
        deleteButton.addEventListener("click", () => deleteComment(commentDiv));
    }

    // Edit comment functionality
    function editComment(commentDiv, name, message) {
        const newMessage = prompt("編輯您的留言:", message);
        if (newMessage !== null && newMessage.trim() !== "") {
            commentDiv.querySelector("p:nth-child(2)").textContent = newMessage;
        }
    }

    // Delete comment functionality
    function deleteComment(commentDiv) {
        if (confirm("確定要刪除此留言嗎?")) {
            commentsSection.removeChild(commentDiv);
        }
    }
});
