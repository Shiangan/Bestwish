document.addEventListener('DOMContentLoaded', function () {
    const deceasedInfo = JSON.parse(localStorage.getItem('deceasedInfo'));
    const mainPhoto = document.getElementById('main-photo');
    const deceasedName = document.getElementById('deceased-name');
    const deceasedInfoElement = document.getElementById('deceased-info');
    const tributeSection = document.getElementById('tribute-section');
    const mapSection = document.getElementById('map-section');

    if (deceasedInfo) {
        // 設置主要照片
        if (deceasedInfo['photo']) {
            mainPhoto.src = URL.createObjectURL(new Blob([new Uint8Array(deceasedInfo['photo'])]));
        }
        
        // 設置亡者姓名
        deceasedName.textContent = deceasedInfo['name'];
        
        // 設置亡者資訊
        deceasedInfoElement.innerHTML = `
            <p>出生日期: ${deceasedInfo['birth-date']}</p>
            <p>死亡日期: ${deceasedInfo['death-date']}</p>
            <p>牌位安置地點: ${deceasedInfo['funeral-space']}</p>
            <p>出殯日期: ${deceasedInfo['funeral-date']}</p>
            <p>出殯地點: ${deceasedInfo['funeral-location'] === '其他' ? deceasedInfo['other-funeral-location'] : deceasedInfo['funeral-location']}</p>
            <p>家奠禮時間: ${deceasedInfo['family-service-time']}</p>
            <p>公奠禮時間: ${deceasedInfo['public-service-time']}</p>
            <p>生平介紹: ${deceasedInfo['life-story']}</p>
        `;
        
        // 設置留言區（這裡假設留言區域會顯示一些固定的文本，實際應根據需求填充）
        tributeSection.innerHTML = `
            <p>這裡顯示親友的留言。</p>
        `;
        
        // 設置儀式地點與交通資訊（這裡假設有固定的地圖和交通資訊）
        mapSection.innerHTML = `
            <p>這裡顯示儀式地點的地圖及公共交通資訊。</p>
        `;
    }

    // 點擊致贈花籃按鈕跳轉到花籃頁面
    document.getElementById('order-flower').addEventListener('click', function() {
        window.location.href = 'flower-order.html';
    });
});
