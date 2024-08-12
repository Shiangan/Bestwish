document.addEventListener('DOMContentLoaded', function() {
    // 自動播放背景音樂
    var music = document.getElementById('background-music');
    if (music) {
        music.play();
    }

    // 提交留言表單
    document.getElementById('comment-form').addEventListener('submit', function(event) {
        event.preventDefault(); // 防止表單默認行為

        var name = document.getElementById('comment-name').value;
        var message = document.getElementById('comment-message').value;
        var commentsContainer = document.getElementById('comments-container');

        if (name && message) {
            var commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            var namePara = document.createElement('p');
            namePara.classList.add('comment-name');
            namePara.textContent = name;

            var messagePara = document.createElement('p');
            messagePara.classList.add('comment-message');
            messagePara.textContent = message;

            commentDiv.appendChild(namePara);
            commentDiv.appendChild(messagePara);

            commentsContainer.appendChild(commentDiv);

            // 清空表單
            document.getElementById('comment-name').value = '';
            document.getElementById('comment-message').value = '';
        }
    });

    // 顯示花籃選擇
    document.getElementById('show-flower-baskets').addEventListener('click', function() {
        var gallery = document.getElementById('flower-basket-gallery');
        gallery.style.display = gallery.style.display === 'none' ? 'block' : 'none';
    });
});
