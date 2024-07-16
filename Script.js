// 音樂播放控制
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.play(); // 自動播放背景音樂

// 留言表單提交處理
const messageForm = document.getElementById('messageForm');
const messagesContainer = document.getElementById('messages');

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const messageTextarea = document.getElementById('message');
    const message = messageTextarea.value.trim();

    if (message !== '') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;

        messagesContainer.appendChild(messageElement);

        // 清空留言框
        messageTextarea.value = '';
    } else {
        alert('請輸入留言內容');
    }
});
