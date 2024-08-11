document.addEventListener('DOMContentLoaded', function() {
            // 初始化slick旋轉木馬
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
                        const commentElement = document.createElement('div');
                commentElement.classList.add('comment');

                const commentName = document.createElement('h3');
                commentName.textContent = name;
                commentElement.appendChild(commentName);

                const commentMessage = document.createElement('p');
                commentMessage.textContent = message;
                commentElement.appendChild(commentMessage);

                // 将新留言添加到留言区
                commentsContainer.appendChild(commentElement);

                // 清空表单
                document.getElementById('comment-name').value = '';
                document.getElementById('comment-message').value = '';

                // 自动滚动到最新留言
                commentElement.scrollIntoView({ behavior: 'smooth' });
            });
        });
    </script>
</body>
</html>
