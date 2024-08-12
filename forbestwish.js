document.addEventListener('DOMContentLoaded', function() {
    // 自動播放背景音樂
    var music = document.getElementById('background-music');
    if (music) {
        music.play();
    }

    // 載入已保存的留言
    loadComments();

    // 提交留言表單
    document.getElementById('comment-form').addEventListener('submit', function(event) {
        event.preventDefault(); // 防止表單默認行為

        var name = document.getElementById('comment-name').value;
        var message = document.getElementById('comment-message').value;

        if (name && message) {
            var comment = {
                name: name,
                message: message
            };

            // 保存留言到本地儲存
            saveComment(comment);

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

function saveComment(comment) {
    // 獲取當前留言
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    // 重新加載留言
    loadComments();
}

function loadComments() {
    var commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';

    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(function(comment) {
        var commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        var namePara = document.createElement('p');
        namePara.classList.add('comment-name');
        namePara.textContent = comment.name;

        var messagePara = document.createElement('p');
        messagePara.classList.add('comment-message');
        messagePara.textContent = comment.message;

        commentDiv.appendChild(namePara);
        commentDiv.appendChild(messagePara);

        commentsContainer.appendChild(commentDiv);
    });
}
