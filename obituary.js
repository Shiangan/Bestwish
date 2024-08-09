document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.getElementById('carousel-images');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const flowerBasket = document.getElementById('flower-basket');
    const donateButton = document.getElementById('donate-button');
    const backgroundMusic = document.getElementById('background-music');

    let currentIndex = 0;
    let images = JSON.parse(localStorage.getItem('additionalPhotos')) || [];

    function showImage(index) {
        carouselImages.innerHTML = '';
        if (images.length > 0) {
            const img = document.createElement('img');
            img.src = images[index];
            img.alt = `Image ${index + 1}`;
            img.style.width = '100%';
            img.style.borderRadius = '10px';
            carouselImages.appendChild(img);
        }
    }

    function updateCarousel(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        showImage(currentIndex);
    }

    prevButton.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextButton.addEventListener('click', () => updateCarousel(currentIndex + 1));

    donateButton.addEventListener('click', () => {
        flowerBasket.style.display = flowerBasket.style.display === 'none' ? 'block' : 'none';
    });

    function playBackgroundMusic() {
        const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
        if (isMusicPlaying) {
            backgroundMusic.src = localStorage.getItem('musicUrl') || '';
            backgroundMusic.play().catch(error => console.error('播放背景音乐失败:', error));
        } else {
            backgroundMusic.pause();
        }
    }

    playBackgroundMusic();

    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('comment-name').value.trim();
        const message = document.getElementById('comment-message').value.trim();

        if (name && message) {
            const commentsContainer = document.getElementById('comments-container');
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.innerHTML = `<strong>${name}</strong><p>${message}</p><button class="edit-btn">编辑</button><button class="delete-btn">删除</button>`;
            commentsContainer.appendChild(comment);

            commentForm.reset();
        } else {
            alert('姓名和留言内容不能为空');
        }
    });

    document.getElementById('comments-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const commentDiv = event.target.parentElement;
            const p = commentDiv.querySelector('p');
            const newMessage = prompt('编辑留言内容:', p.textContent);
            if (newMessage !== null) {
                p.textContent = newMessage;
            }
        } else if (event.target.classList.contains('delete-btn')) {
            if (confirm('确认删除此留言吗？')) {
                event.target.parentElement.remove();
            }
        }
    });

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

    loadStoredSettings();
});
