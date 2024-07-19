document.addEventListener('DOMContentLoaded', function () {
    const obituaryContent = document.getElementById('obituary-content');
    const tributePhotos = document.getElementById('tribute-photos');
    const orderFlowerButton = document.getElementById('order-flower-button');
    const mapAndTransit = document.getElementById('map-and-transit');

    // 從本地存儲中獲取資料
    const deceasedInfo = JSON.parse(localStorage.getItem('deceasedInfo'));

    if (deceasedInfo) {
        document.getElementById('deceased-name').textContent = `我們的至親 ${deceasedInfo.name}`;
        obituaryContent.innerHTML = `
            ${deceasedInfo.name} 於 ${deceasedInfo.death-date} 往生，享年 ${calculateAge(deceasedInfo.birth-date, deceasedInfo.death-date)} 歲。<br>
            牌位安置地點: ${deceasedInfo['funeral-space']}<br>
            出殯日期: ${deceasedInfo['funeral-date']}<br>
            出殯地點: ${deceasedInfo['funeral-location']}<br>
            生平介紹: ${deceasedInfo['life-story']}
        `;

        // 加載追思照片
        if (deceasedInfo['photo']) {
            tributePhotos.innerHTML += `<img src="${URL.createObjectURL(deceasedInfo['photo'])}" alt="追思照片">`;
        }

        // 添加地圖和公共交通資訊（這裡可以用 Google Maps 或其他地圖服務 API）
        mapAndTransit.innerHTML = `
            <iframe src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(deceasedInfo['funeral-location'])}" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            <p>公共交通：從...到...的詳細資訊</p>
        `;
    }

    // 點擊訂購花籃按鈕
    orderFlowerButton.addEventListener('click', function () {
        window.location.href = 'flower-order.html';
    });

    // 計算年齡的函數
    function calculateAge(birthDate, deathDate) {
        const birth = new Date(birthDate);
        const death = new Date(deathDate);
        let age = death.getFullYear() - birth.getFullYear();
        const monthDiff = death.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
});
