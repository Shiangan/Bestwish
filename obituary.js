<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>訃聞公告</title>
    <link rel="stylesheet" href="obituary.css">
</head>
<body>
    <header>
        <img src="img/logo.png" alt="Logo" class="logo">
    </header>

    <main>
        <div id="main-photo-container">
            <img id="main-photo" src="" alt="Main Photo">
        </div>

        <div class="motto">此處顯示溫馨名言</div>

        <div id="photo-carousel">
            <div id="carousel-images">
                <!-- 由 index 提供的照片將動態插入 -->
            </div>
            <button id="prev-button" class="carousel-button">&#10094;</button>
            <button id="next-button" class="carousel-button">&#10095;</button>
        </div>

        <div id="paper-obituary-container">
            <img id="paper-obituary" src="" alt="Paper Obituary">
        </div>

        <div id="timeline">
            <!-- 生平時間軸 -->
        </div>

        <div id="comments-section">
            <h2>追思留言區</h2>
            <form id="comment-form">
                <label for="comment-name">姓名</label>
                <input type="text" id="comment-name" required>
                <label for="comment-message">留言內容</label>
                <textarea id="comment-message" rows="4" required></textarea>
                <button type="submit">提交留言</button>
            </form>
            <div id="comments-container">
                <!-- 留言區內容將動態插入 -->
            </div>
        </div>

        <div id="donate-flower">
            <button id="donate-button">致贈花籃請點選我</button>
        </div>

        <div id="flower-basket">
            <div class="basket-style">
                <img src="basket1.jpg" alt="Flower Basket 1">
                <p>花籃樣式 1 - NT$XXX</p>
            </div>
            <div class="basket-style">
                <img src="basket2.jpg" alt="Flower Basket 2">
                <p>花籃樣式 2 - NT$XXX</p>
            </div>
            <!-- 其他花籃樣式 -->
        </div>
    </main>

    <footer>
        <p>承辦禮儀公司：祥安生命有限公司</p>
        <p>
            聯絡我們：
            <a href="https://line.me/ti/p/LINEID" target="_blank">LINE</a> |
            <a href="tel:+886978583699">電話：0978-583-699</a>
        </p>
    </footer>

    <audio id="background-music" loop>
        <source src="" type="audio/mpeg">
    </audio>

    <div id="image-modal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-image">
    </div>

    <script src="obituary.js"></script>
</body>
</html>

/* obituary.css */
body {
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}

header {
    background: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
}

.logo {
    width: 150px;
}

main {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

#main-photo-container {
    text-align: center;
    margin-bottom: 20px;
}

#main-photo {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

.motto {
    font-size: 1.5em;
    text-align: center;
    color: #555;
    margin-bottom: 20px;
}

#photo-carousel {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
}

#carousel-images {
    overflow: hidden;
    border-radius: 10px;
}

.carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.5em;
}

#prev-button {
    left: 10px;
}

#next-button {
    right: 10px;
}

#paper-obituary-container {
    text-align: center;
    margin-bottom: 20px;
}

#paper-obituary {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

#timeline {
    margin-bottom: 20px;
}

#comments-section {
    margin-bottom: 20px;
}

#comment-form {
    margin-bottom: 20px;
}

#comment-form label {
    display: block;
    margin: 10px 0 5px;
}

#comment-form input, #comment-form textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

#comment-form button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

#comments-container {
    margin-top: 20px;
}

.comment {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    margin-bottom: 10px;
}

#donate-flower {
    text-align: center;
    margin-bottom: 20px;
}

#donate-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

#flower-basket {
    display: none;
    margin-top: 20px;
    text-align: center;
}

.basket-style {
    display: inline-block;
    margin: 10px;
    text-align: center;
}

.basket-style img {
    max-width: 150px;
    border-radius: 10px;
}

.basket-style p {
    margin-top: 5px;
}

footer {
    background: #fff;
    padding: 10px 20px;
    border-top: 1px solid #ddd;
    text-align: center;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.8);
}

.modal-content {
    margin: auto;
    display: block;
    max-width: 80%;
    max-height: 80%;
    border-radius: 10px;
}

.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
}

// obituary.js
document.addEventListener("DOMContentLoaded", function() {
    const carouselImages = document.getElementById('carousel-images');
    const mainPhoto = document.getElementById('main-photo');
    const paperObituary = document.getElementById('paper-obituary');
    const commentsContainer = document.getElementById('comments-container');
    const donateButton = document.getElementById('donate-button');
    const flowerBasket = document.getElementById('flower-basket');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.modal .close');
    const backgroundMusic = document.getElementById('background-music');
    const playMusicButton = document.createElement('button');
    const stopMusicButton = document.createElement('button');
    let currentMusicUrl = '';

    // 轮播图功能
    let currentIndex = 0;
    const images = []; // 从服务器或其他地方加载的图片 URL 列表


<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>訃聞公告</title>
    <link rel="stylesheet" href="obituary.css">
</head>
<body>
    <header>
        <img src="img/logo.png" alt="Logo" class="logo">
    </header>

    <main>
        <div id="main-photo-container">
            <img id="main-photo" src="" alt="Main Photo">
        </div>

        <div class="motto">此處顯示溫馨名言</div>

        <div id="photo-carousel">
            <div id="carousel-images">
                <!-- 由 index 提供的照片將動態插入 -->
            </div>
            <button id="prev-button" class="carousel-button">&#10094;</button>
            <button id="next-button" class="carousel-button">&#10095;</button>
        </div>

        <div id="paper-obituary-container">
            <img id="paper-obituary" src="" alt="Paper Obituary">
        </div>

        <div id="timeline">
            <!-- 生平時間軸 -->
        </div>

        <div id="comments-section">
            <h2>追思留言區</h2>
            <form id="comment-form">
                <label for="comment-name">姓名</label>
                <input type="text" id="comment-name" required>
                <label for="comment-message">留言內容</label>
                <textarea id="comment-message" rows="4" required></textarea>
                <button type="submit">提交留言</button>
            </form>
            <div id="comments-container">
                <!-- 留言區內容將動態插入 -->
            </div>
        </div>

        <div id="donate-flower">
            <button id="donate-button">致贈花籃請點選我</button>
        </div>

        <div id="flower-basket">
            <div class="basket-style">
                <img src="basket1.jpg" alt="Flower Basket 1">
                <p>花籃樣式 1 - NT$XXX</p>
            </div>
            <div class="basket-style">
                <img src="basket2.jpg" alt="Flower Basket 2">
                <p>花籃樣式 2 - NT$XXX</p>
            </div>
            <!-- 其他花籃樣式 -->
        </div>
    </main>

    <footer>
        <p>承辦禮儀公司：祥安生命有限公司</p>
        <p>
            聯絡我們：
            <a href="https://line.me/ti/p/LINEID" target="_blank">LINE</a> |
            <a href="tel:+886978583699">電話：0978-583-699</a>
        </p>
    </footer>

    <audio id="background-music" loop>
        <source src="" type="audio/mpeg">
    </audio>

    <div id="image-modal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-image">
    </div>

    <script src="obituary.js"></script>
</body>
</html>


/* obituary.css */
body {
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}

header {
    background: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
}

.logo {
    width: 150px;
}

main {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

#main-photo-container {
    text-align: center;
    margin-bottom: 20px;
}

#main-photo {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

.motto {
    font-size: 1.5em;
    text-align: center;
    color: #555;
    margin-bottom: 20px;
}

#photo-carousel {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
}

.carousel-image {
    width: 100%;
    height: auto;
}

.carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.5em;
}

#prev-button {
    left: 10px;
}

#next-button {
    right: 10px;
}

#paper-obituary-container {
    text-align: center;
    margin-bottom: 20px;
}

#paper-obituary {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

#timeline {
    margin-bottom: 20px;
}

#comments-section {
    margin-bottom: 20px;
}

#comment-form {
    margin-bottom: 20px;
}

#comment-form label {
    display: block;
    margin: 10px 0 5px;
}

#comment-form input, #comment-form textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

#comment-form button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

#comments-container {
    margin-top: 20px;
}

.comment {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    margin-bottom: 10px;
}

#donate-flower {
    text-align: center;
    margin-bottom: 20px;
}

#donate-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

#flower-basket {
    display: none;
    margin-top: 20px;
    text-align: center;
}

.basket-style {
    display: inline-block;
    margin: 10px;
    text-align: center;
}

.basket-style img {
    max-width: 150px;
    border-radius: 10px;
}

.basket-style p {
    margin-top: 5px;
}

footer {
    background: #fff;
    padding: 10px 20px;
    border-top: 1px solid #ddd;
    text-align: center;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.8);
}

.modal-content {
    margin: auto;
    display: block;
    max-width: 80%;
    max-height: 80%;
    border-radius: 10px;
}

.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
}
// obituary.js
document.addEventListener("DOMContentLoaded", function() {
    const carouselImages = document.getElementById('carousel-images');
    const mainPhoto = document.getElementById('main-photo');
    const paperObituary = document.getElementById('paper-obituary');
    const commentsContainer = document.getElementById('comments-container');
    const donateButton = document.getElementById('donate-button');
    const flowerBasket = document.getElementById('flower-basket');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.modal .close');
    const backgroundMusic = document.getElementById('background-music');
    const playMusicButton = document.createElement('button');
    const stopMusicButton = document.createElement('button');

    // 轮播图功能
    let currentIndex = 0;
    const images = JSON.parse(localStorage.getItem('carouselImages')) || []; // 从 localStorage 获取图片 URL 列表

    images.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'carousel-image'; // 确保在 CSS 中定义此样式
        img.addEventListener('click', () => {
            modalImage.src = url;
            imageModal.style.display = 'block';
        });
        carouselImages.appendChild(img);
    });

    function showImage(index) {
        const imgs = carouselImages.getElementsByClassName('carousel-image');
        if (imgs.length > 0) {
            Array.from(imgs).forEach((img, i) => img.style.display = i === index ? 'block' : 'none');
        }
    }

    document.getElementById('prev-button').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    document.getElementById('next-button').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    showImage(currentIndex);

    // 关闭模态框
    closeModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });

    // 设置主照片和纸质讣闻
    const mainPhotoUrl = localStorage.getItem('mainPhoto');
    if (mainPhotoUrl) {
        mainPhoto.src = mainPhotoUrl;
    }

    const paperObituaryUrl = localStorage.getItem('paperObituary');
    if (paperObituaryUrl) {
        paperObituary.src = paperObituaryUrl;
    }

    // 评论功能（需进一步实现）

    // 致赠花篮功能
    donateButton.addEventListener('click', function() {
        flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'block' : 'none';
    });

    // 背景音乐功能
    function loadStoredSettings() {
        const storedMusicUrl = localStorage.getItem('musicUrl');
        if (storedMusicUrl) {
            backgroundMusic.src = storedMusicUrl;
        }
        const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
        if (isMusicPlaying) {
            backgroundMusic.play().catch(error => {
                console.error("播放背景音乐失败:", error);
            });
        }
    }

    function playBackgroundMusic() {
        backgroundMusic.play().catch(error => {
            console.error("播放背景音乐失败:", error);
        });
        localStorage.setItem('musicPlaying', 'true');
    }

    function stopBackgroundMusic() {
        backgroundMusic.pause();
        localStorage.setItem('musicPlaying', 'false');
    }

    // 示例按钮
    playMusicButton.textContent = '播放音乐';
    stopMusicButton.textContent = '停止音乐';
    playMusicButton.addEventListener('click', playBackgroundMusic);
    stopMusicButton.addEventListener('click', stopBackgroundMusic);

    // 加载存储的设置
    loadStoredSettings();
});
