document.addEventListener('DOMContentLoaded', function() {
    // 自動播放背景音樂
    var music = document.getElementById('background-music');
    if (music) {
        music.play().catch(function(error) {
            console.error('自動播放音樂失敗:', error);
        });
    }

    // 載入已保存的留言
    loadComments();

    // 提交留言表單
    document.getElementById('comment-form').addEventListener('submit', function(event) {
        event.preventDefault(); // 防止表單默認行為

        var name = document.getElementById('comment-name').value.trim();
        var message = document.getElementById('comment-message').value.trim();

        if (name && message) {
            var comment = {
                name: name,
                message: message
            };

            try {
                // 保存留言到本地儲存
                saveComment(comment);
                
                // 清空表單
                document.getElementById('comment-name').value = '';
                document.getElementById('comment-message').value = '';
            } catch (error) {
                console.error('保存留言失敗:', error);
            }
        } else {
            alert('請填寫完整的留言信息。');
        }
    });

    // 簡單的密碼保護
    var password = prompt("请输入管理员密码：");

    if (password === "ava85110") { // 替換為您的實際密碼
        var clearCommentsButton = document.getElementById('clear-comments-button');
        clearCommentsButton.style.display = 'block'; // 顯示清除留言按鈕

        clearCommentsButton.addEventListener('click', function() {
            if (confirm('確定要清除所有留言嗎？此操作無法撤銷。')) {
                clearAllComments();
            }
        });
    }

    // 顯示花籃選擇
    document.getElementById('show-flower-baskets').addEventListener('click', function() {
        var gallery = document.getElementById('flower-basket-gallery');
        gallery.style.display = gallery.style.display === 'none' ? 'block' : 'none';
    });
});

function saveComment(comment) {
    try {
        // 獲取當前留言
        var comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

        // 重新加載留言
        loadComments();
    } catch (error) {
        console.error('保存留言到本地儲存失敗:', error);
    }
}

function loadComments() {
    var commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';

    try {
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
    } catch (error) {
        console.error('從本地儲存加載留言失敗:', error);
    }
}

function clearAllComments() {
    localStorage.removeItem('comments'); // 清空本地存儲中的留言
    loadComments(); // 重新加載評論區域，清空顯示的留言
}
