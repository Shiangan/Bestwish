// 音樂播放控制
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.play(); // 自動播放背景音樂

// 生成訃聞內容
function generateObituary(event) {
    event.preventDefault();

    const deceasedName = document.getElementById('deceasedName').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const deathDate = document.getElementById('deathDate').value;
    const funeralLocation = document.getElementById('funeralLocation').value;
    const photoUpload = document.getElementById('photoUpload').files[0];
    
    // 顯示訃聞部分
    document.getElementById('obituarySection').style.display = 'block';
    
    // 設置訃聞內容
    const obituaryContent = document.getElementById('obituaryContent');
    obituaryContent.innerHTML = `
        <p>我們懷著沉痛的心情宣布 ${deceasedName} 於 ${deathDate} 離世，享年 ${
        new Date(deathDate).getFullYear() - new Date(birthDate).getFullYear()
    } 歲。</p>
        <p>奠禮將於 ${funeralLocation} 舉行，請朋友們攜手共襄盛舉，感謝您對我們家人的支持與關懷。</p>
    `;

    // 顯示上傳的照片
    const reader = new FileReader();
    reader.onload = function (e) {
        obituaryContent.innerHTML += `<img src="${e.target.result}" alt="往生者照片">`;
    };
    reader.readAsDataURL(photoUpload);
}

// 發送留言
function postMessage(event) {
    event.preventDefault();
    
    const message = document.getElementById('message').value.trim();
    if (message === '') return;

    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);

    document.getElementById('messageForm').reset(); // 清空留言表單
}

// 訂購花籃
function orderFlowers(event) {
    event.preventDefault();

    const senderName = document.getElementById('senderName').value.trim();
    const recipientName = document.getElementById('recipientName').value.trim();
    const recipientAddress = document.getElementById('recipientAddress').value.trim();
    const invoice = document.getElementById('invoice').value;
    const flowerBasketMessage = document.getElementById('flowerBasketMessage').value.trim();
    
    // 顯示訂購信息（這裡只是模擬顯示）
    alert(`訂購人姓名: ${senderName}\n收件人姓名: ${recipientName}\n收件人地址: ${recipientAddress}\n是否需要發票: ${invoice}\n花籃留言: ${flowerBasketMessage}`);

    // 清空訂購表單
    document.getElementById('flowerOrderForm').reset();
}
