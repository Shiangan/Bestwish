document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.getElementById('carousel-images');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const flowerBasket = document.getElementById('flower-basket');
    const donateButton = document.getElementById('donate-button');
    const backgroundMusic = document.getElementById('background-music');

    let currentIndex = 0;
    let images = []; // 存储图片路径的数组

    // 从服务器或本地文件加载图片数据
    function loadImages() {
        fetch('path/to/your/image-data.json') // 替换为实际的图片数据源
            .then(response => response.json())
            .then(data => {
                images = data.images; // 假设数据格式为 { "images": ["image1.jpg", "image2.jpg", ...] }
                if (images.length > 0) {
                    showImage(currentIndex);
                }
            })
            .catch(error => console.error('加载图片数据失败:', error));
    }

    function showImage(index) {
        carouselImages.innerHTML = '';
        const img = document.createElement('img');
        img.src = images[index];
        img.alt = `Image ${index + 1}`;
        img.style.width = '100%';
        img.style.borderRadius = '10px';
        carouselImages.appendChild(img);
    }

    function updateCarousel(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        showImage(currentIndex);
    }

    prevButton.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextButton.addEventListener('click', () => updateCarousel(currentIndex + 1));

    // 切换花篮选择的显示状态
    donateButton.addEventListener('click', () => {
        flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'block' : 'none';
    });

    // 音乐播放设置
    backgroundMusic.src = 'audio/background-music.mp3'; // 确保路径正确
    backgroundMusic.loop = true; // 循环播放
    backgroundMusic.play().catch(error => {
        console.error('自动播放音乐失败:', error);
    });

    // 处理留言提交
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 防止表单自动提交

        const name = document.getElementById('comment-name').value.trim();
        const message = document.getElementById('comment-message').value.trim();

        if (name && message) {
            const commentsContainer = document.getElementById('comments-container');
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
            commentsContainer.appendChild(comment);

            // 清空表单
            commentForm.reset();
        } else {
            alert('姓名和留言内容不能为空');
        }
    });

    // 处理图片点击显示大图
    carouselImages.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            const modal = document.createElement('div');
            modal.className = 'modal';

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            const img = document.createElement('img');
            img.src = event.target.src;
            img.alt = '大图';
            modalContent.appendChild(img);

            const close = document.createElement('span');
            close.className = 'close';
            close.innerHTML = '&times;';
            close.addEventListener('click', () => modal.remove());
            modalContent.appendChild(close);

            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        }
    });

    // 初始化加载图片数据
    loadImages();
});
