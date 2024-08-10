document.addEventListener('DOMContentLoaded', function() {
    // 初始化光滑旋轉木馬
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

    // 提交留言
    document.getElementById('comment-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;
        const commentsContainer = document.getElementById('comments-container');

        // 創建新留言的元素
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <strong>${name}：</strong>
            <p>${message}</p>
        `;

        // 添加到留言容器
        commentsContainer.appendChild(commentDiv);

        // 清空表單
        document.getElementById('comment-name').value = '';
        document.getElementById('comment-message').value = '';
    });
});
