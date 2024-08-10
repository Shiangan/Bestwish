document.addEventListener('DOMContentLoaded', () => {
    // 初始化滑動圖片輪播
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    // 顯示花籃樣式
    document.getElementById('show-flower-baskets').addEventListener('click', () => {
        const gallery = document.getElementById('flower-basket-gallery');
        gallery.style.display = gallery.style.display === 'none' || gallery.style.display === '' ? 'block' : 'none';
    });

    // 留言表單處理
    const commentsContainer = document.getElementById('comments-container');

    // 從本地存儲中加載留言
    const loadComments = () => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `<strong>${comment.name}</strong>: <p>${comment.message}</p>`;
            commentsContainer.appendChild(commentDiv);
        });
    };

    // 保存留言到本地存儲
    const saveComment = (name, message) => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, message });
        localStorage.setItem('comments', JSON.stringify(comments));
    };

    document.getElementById('comment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;
        if (name && message) {
            saveComment(name, message);
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `<strong>${name}</strong>: <p>${message}</p>`;
            commentsContainer.appendChild(commentDiv);
            // 清空表單
            document.getElementById('comment-name').value = '';
            document.getElementById('comment-message').value = '';
        }
    });

    // 初次加載留言
    loadComments();
});
