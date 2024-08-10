document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Slick Carousel
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
    document.getElementById('flower-gallery-toggle').addEventListener('click', function(e) {
        e.preventDefault();
        const gallery = document.getElementById('flower-basket-gallery');
        gallery.style.display = gallery.style.display === 'block' ? 'none' : 'block';
        this.textContent = gallery.style.display === 'block' ? '隱藏花籃' : '查看花籃';
    });

    // 提交留言
    document.getElementById('comment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const commentsContainer = document.getElementById('comments-container');

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <strong>${name}：</strong>
            <p>${message}</p>
        `;
        commentsContainer.appendChild(commentDiv);

        // 清空表單
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    });
});
