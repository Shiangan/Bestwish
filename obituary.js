document.addEventListener('DOMContentLoaded', function() {
    // 初始化 slick 旋轉木馬
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'linear'
    });

    // 花籃展示切換
    document.getElementById('show-flower-baskets').addEventListener('click', function(e) {
        e.preventDefault();
        const gallery = document.getElementById('flower-basket-gallery');
        gallery.style.display = gallery.style.display === 'block' ? 'none' : 'block';
        this.textContent = gallery.style.display === 'block' ? '隱藏花籃' : '檢視花籃';
    });

    // 處理留言提交
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('comment-name').value.trim();
            const message = document.getElementById('comment-message').value.trim();

            if (name && message) {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');

                const commentName = document.createElement('h3');
                commentName.textContent = name;
                commentElement.appendChild(commentName);

                const commentMessage = document.createElement('p');
                commentMessage.textContent = message;
                commentElement.appendChild(commentMessage);

                commentsContainer.appendChild(commentElement);

                // 保存到 localStorage
                saveComment(name, message);

                // 清空表單
                commentForm.reset();
            } else {
                alert("請填寫所有欄位！");
            }
        });

        // 加載之前保存的留言
        loadComments();
    }

    function saveComment(name, message) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, message });
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');

            const commentName = document.createElement('h3');
            commentName.textContent = comment.name;
            commentElement.appendChild(commentName);

            const commentMessage = document.createElement('p');
            commentMessage.textContent = comment.message;
            commentElement.appendChild(commentMessage);

            commentsContainer.appendChild(commentElement);
        });
    }

    // 自動播放音樂
    const audio = document.getElementById('background-music');
    if (audio) {
        audio.play().catch(error => {
            console.log('音樂播放被阻止或遇到錯誤：', error);
        });
    }
});
