document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Slick Carousel
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    });

    // 註冊留言提交事件
    document.getElementById('comment-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // 取得留言內容
        var name = document.getElementById('comment-name').value;
        var message = document.getElementById('comment-message').value;

        // 創建留言元素
        var commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `<strong>${name}</strong><p>${message}</p>`;

        // 添加留言到留言容器
        document.getElementById('comments-container').appendChild(commentDiv);

        // 清空表單
        this.reset();
    });

    // 處理「致贈花籃」按鈕點擊事件
    document.getElementById('show-flower-baskets').addEventListener('click', function() {
        var flowerGallery = document.getElementById('flower-basket-gallery');
        flowerGallery.style.display = (flowerGallery.style.display === 'none' || flowerGallery.style.display === '') ? 'block' : 'none';
    });
});
