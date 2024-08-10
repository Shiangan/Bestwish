
document.addEventListener('DOMContentLoaded', () => {
    // 初始化 Slick Carousel
    $('#photo-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#prev-button'),
        nextArrow: $('#next-button')
    });

    // 读取并显示主照片
    const mainPhoto = document.getElementById('main-photo');
    const mainPhotoUrl = localStorage.getItem('mainPhoto');
    if (mainPhotoUrl) {
        mainPhoto.src = mainPhotoUrl;
    }

    // 读取并显示附加照片
    const additionalPhotos = JSON.parse(localStorage.getItem('additionalPhotos')) || [];
    additionalPhotos.forEach(photoDataUrl => {
        $('#photo-carousel').slick('slickAdd', `<div><img src="${photoDataUrl}" alt="追思照片"></div>`);
    });

    // 读取并显示纸本诉讼
    const paperObituary = document.getElementById('paper-obituary');
    const paperObituaryUrl = localStorage.getItem('paperObituary');
    if (paperObituaryUrl) {
        paperObituary.src = paperObituaryUrl;
    }

    // 播放背景音乐
    const backgroundMusic = document.getElementById('background-music');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');

    playMusicButton.addEventListener('click', () => {
        backgroundMusic.play().catch(error => console.error("播放背景音乐失败", error));
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'inline';
    });

    stopMusicButton.addEventListener('click', () => {
        backgroundMusic.pause();
        playMusicButton.style.display = 'inline';
        stopMusicButton.style.display = 'none';
    });

    // 读取并设置音乐
    const storedMusicUrl = localStorage.getItem('musicUrl');
    if (storedMusicUrl) {
        backgroundMusic.src = storedMusicUrl;
        if (localStorage.getItem('musicPlaying') === 'true') {
            backgroundMusic.play().catch(error => console.error("播放背景音乐失败:", error));
            playMusicButton.style.display = 'none';
            stopMusicButton.style.display = 'inline';
        }
    }

    // 读取其他表单数据并显示
    const name = localStorage.getItem('name');
    const birthDate = localStorage.getItem('birthDate');
    const deathDate = localStorage.getItem('deathDate');
    const funeralSpace = localStorage.getItem('funeralSpace');
    const familyServiceTime = localStorage.getItem('familyServiceTime');
    const publicServiceTime = localStorage.getItem('publicServiceTime');
    const funeralLocation = localStorage.getItem('funeralLocation');

    // 假设您有对应的元素来显示这些数据
    document.getElementById('life-story').textContent = `姓名: ${name}\n出生日期: ${birthDate}\n死亡日期: ${deathDate}\n安置地點: ${funeralSpace}\n家奠禮時間: ${familyServiceTime}\n公奠禮時間: ${publicServiceTime}\n出殯地點: ${funeralLocation}`;
});
```

### 关键点

1. **Slick Carousel 初始化**：使用 `$('#photo-carousel').slick({...})` 来初始化照片轮播。

2. **显示主照片和附加照片**：从 `localStorage` 中读取 URL 并更新页面上的 `<img>` 元素。

3. **播放背景音乐**：设置音乐播放按钮的事件处理，播放或暂停背景音乐。

4. **显示其他表单数据**：将从 `localStorage` 中读取的数据插入到页面的相应位置（例如生平介绍）。

确保将 `obituary.js` 文件与您的 HTML 页面正确关联，并且在 `obituary.css` 中处理页面的样式。这样，您可以确保页面上显示的数据与提交的数据一致。
