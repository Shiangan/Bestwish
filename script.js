document.addEventListener('DOMContentLoaded', function() {
    // 獲取 URL 參數中的訃聞信息
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const photo = urlParams.get('photo');
    const deathDate = urlParams.get('death-date');
    const familyContact = urlParams.get('family-contact');

    // 更新第一頁訃聞內容
    document.getElementById('deceased-photo').src = photo;
    document.getElementById('obituary-photo').classList.add('show');
    document.getElementById('invite-message').classList.add('show');
    document.getElementById('death-announcement').textContent = `我們摯愛的${name}，於 ${deathDate} 已逝世，敬邀各位一同緬懷。`;
    document.getElementById('family-contact-info').textContent = familyContact;
    document.getElementById('enter-obituary-button').classList.add('show');

    // 當點擊進入訃聞內容按鈕時跳轉到訃聞內容頁面
    const enterObituaryButton = document.getElementById('enter-obituary-button');
    enterObituaryButton.addEventListener('click', function() {
        window.location.href = 'obituary.html'; // 導向到訃聞內容頁面
    });

    // 自動播放背景音樂
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play();

    // 留言表單提交事件
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-section');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // 獲取表單數據
        const nameInput = document.getElementById('name-input').value;
        const messageInput = document.getElementById('message-input').value;

        // 創建新的留言元素
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${nameInput}：</strong>${messageInput}`;

        // 將新留言添加到留言區
