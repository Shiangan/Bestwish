document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const musicChoice = document.getElementById("music-choice");
    const backgroundMusic = document.getElementById("background-music");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");

    let currentMusic = '';

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const photoFile = formData.get('photo');
        const additionalPhotos = formData.getAll('additional-photos');

        try {
            // 上传主照片
            const photoUrl = photoFile ? await uploadImage(photoFile) : '';

            // 上传额外照片
            const additionalPhotoUrls = await Promise.all(additionalPhotos.map(file => uploadImage(file)));
            
            // 创建查询参数
            const queryParams = new URLSearchParams({
                ...Object.fromEntries(formData.entries()), // 包括所有表单字段
                'photo-url': photoUrl,
                'additional-photo-urls': additionalPhotoUrls.join(',')
            }).toString();

            // 重定向到 obituary.html 页面
            window.location.href = `obituary.html?${queryParams}`;
        } catch (error) {
            console.error('图片上传失败', error);
            alert('图片上传失败，请稍后重试');
        }
    });

    async function uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.imgur.com/3/image', formData, {
                headers: {
                    Authorization: 'Client-ID YOUR_IMGUR_CLIENT_ID',
                }
            });

            return response.data.data.link;
        } catch (error) {
            console.error('上传图片失败', error);
            throw error;
        }
    }

    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusic = musicUrl;
        backgroundMusic.src = musicUrl;

        if (playMusicButton.style.display === "none") {
            backgroundMusic.play();
        }
    });

    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play();
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    });

    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });
});
