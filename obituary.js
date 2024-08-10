document.addEventListener('DOMContentLoaded', function() {
    // 初始化幻燈片輪播
    $('#photo-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false // 透過自定義按鈕控制
    });

    // 控制自定義輪播按鈕
    $('#prev-button').on('click', function() {
        $('#photo-carousel').slick('slickPrev');
    });

    $('#next-button').on('click', function() {
        $('#photo-carousel').slick('slickNext');
    });

    // 設置主要追思照片和訃聞紙本
    document.getElementById('main-photo').src = 'image/main-photo.jpg';
    document.getElementById('paper-obituary').src = 'image/paper-obituary.jpg';

    // 控制花籃顯示
    document.getElementById('donate-button').addEventListener('click', function() {
        const flowerBasket = document.getElementById('flower-basket');
        flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'backgroundMusic.pause();
        playButton.style.display = 'block';
        stopButton.style.display = 'none';
    });

    // 留言區處理
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <p><strong>${name}</strong>: ${message}</p>
            <button class="edit-button">編輯</button>
            <button class="delete-button">刪除</button>
        `;
        commentsContainer.appendChild(commentDiv);

        // 清空表單
        commentForm.reset();

        // 編輯和刪除功能
        commentDiv.querySelector('.edit-button').addEventListener('click', function() {
            const newMessage = prompt('編輯留言:', message);
            if (newMessage !== null) {
                commentDiv.querySelector('p').innerHTML = `<strong>${name}</strong>: ${newMessage}`;
            }
        });

        commentDiv.querySelector('.delete-button').addEventListener('click', function() {
            commentsContainer.removeChild(commentDiv);
        });
    });
});
