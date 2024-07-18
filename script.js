document.addEventListener('DOMContentLoaded', function() {
    // 獲取 URL 參數中的訃聞信息
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const photo = urlParams.get('photo');
    const deathDate = urlParams.get('death-date');

    // 更新訃聞內容
    document.getElementById('deceased-name').textContent = name;
    document.getElementById('deceased-photo').src = photo;
    document.getElementById('deceased-photo').style.display = 'block'; // 顯示照片
    document.getElementById('death-date-text').textContent = deathDate;

    // 留言表單提交事件
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // 獲取表單數據
        const nameInput = document.getElementById('name-input').value;
        const messageInput = document.getElementById('message-input').value;

        // 創建新的留言元素
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${nameInput}：</strong>${messageInput}`;

        // 將新留言添加到留言區域
        messagesContainer.appendChild(messageElement);

        // 清空表單
        messageForm.reset();
    });

    // 跳轉至訂購花籃頁面
    const flowerOrderButton = document.getElementById('flower-order-button');
    flowerOrderButton.addEventListener('click', function() {
        window.location.href = 'flower-order.html'; // 導向到花籃訂購頁面
    });
});
