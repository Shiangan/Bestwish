document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('deceased-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表單默認提交行為

        const formData = new FormData(form);
        const name = formData.get('name'); // 獲取姓名
        const photo = formData.get('photo'); // 獲取用戶上傳的第一張照片

        // 創建訃聞內容
        const obituaryContent = `
            <div id="obituary-photo">
                <img src="${photo}" alt="${name}的追思照片">
                <p>敬邀您</p>
            </div>
            <p>${name}，於 <span id="death-date-text">幾月幾號過世</span> 過世，溫馨字詞，敬邀大家一同緬懷。</p>
            <button onclick="redirectToObituary()">進入訃聞頁面</button>
        `;

        // 將訃聞內容添加到主區域
        const mainSection = document.querySelector('main section');
        mainSection.innerHTML = obituaryContent;

        // 添加淡入效果
        mainSection.style.opacity = '0';
        setTimeout(() => {
            mainSection.style.opacity = '1';
        }, 100);

        // 可以使用Fetch API或其他方式將表單數據提交到後端處理
        // fetch('process_form.php', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('網絡錯誤，請稍後再試。');
        //     }
        //     return response.json(); // 假設後端返回JSON數據
        // })
        // .then(data => {
        //     // 可以處理後端返回的任何數據或顯示成功消息給用戶
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.error('表單提交錯誤:', error);
        // });
    });

    const backgroundMusic = document.getElementById('background-music');
    const musicIcon = document.getElementById('music-icon');

    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicIcon.src = 'music_on.png';
        } else {
            backgroundMusic.pause();
            musicIcon.src = 'music_off.png';
        }
    }

    // 點擊進入訃聞頁面的功能
    function redirectToObituary() {
        window.location.href = 'obituary.html'; // 導航到訃聞頁面
    }

    // 頁面加載完成後自動播放音樂（如果需要）
    backgroundMusic.play();
    musicIcon.src = 'music_on.png';
});
