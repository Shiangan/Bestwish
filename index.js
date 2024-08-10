document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('info-form');
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');
    const backgroundMusic = document.getElementById('background-music');

    // 处理表单提交
    async function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);

        // 处理主照片
        const mainPhotoFile = formData.get('photo');
        if (mainPhotoFile) {
            const mainPhotoUrl = URL.createObjectURL(mainPhotoFile);
            localStorage.setItem('mainPhoto', mainPhotoUrl);
        }

        // 处理附加照片
        const additionalPhotos = Array.from(formData.getAll('additional-photos[]')).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        try {
            const loadedPhotos = await Promise.all(additionalPhotos);
            localStorage.setItem('additionalPhotos', JSON.stringify(loadedPhotos));
        } catch (error) {
            console.error("加载附加照片失败:", error);
        }

        // 处理其他表单数据
        localStorage.setItem('name', formData.get('name'));
        localStorage.setItem('birthDate', formData.get('birth-date'));
        localStorage.setItem('deathDate', formData.get('death-date'));
        localStorage.setItem('funeralSpace', formData.get('funeral-space'));
        localStorage.setItem('familyServiceTime', formData.get('family-service-time'));
        localStorage.setItem('publicServiceTime', formData.get('public-service-time'));
        localStorage.setItem('funeralLocation', formData.get('funeral-location'));

        // 跳转到 invitation.html 页面
        window.location.href = "invitation.html";
    }

    // 监听表单提交
    form.addEventListener('submit', handleFormSubmit);

    // 音乐播放控制
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
});
