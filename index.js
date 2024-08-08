document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");
    const customMusic = document.getElementById("custom-music");

    let currentMusicUrl = '';

    function loadStoredSettings() {
        const storedMusicUrl = localStorage.getItem('musicUrl');
        const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';

        if (storedMusicUrl) {
            currentMusicUrl = storedMusicUrl;
            backgroundMusic.src = storedMusicUrl;
            if (isMusicPlaying) {
                backgroundMusic.play().catch(error => {
                    console.error("播放背景音乐失败:", error);
                });
                playMusicButton.style.display = "none";
                stopMusicButton.style.display = "inline";
            }
        }
    }

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

        // 保存其他表单数据
        localStorage.setItem('name', formData.get('name'));
        localStorage.setItem('birthDate', formData.get('birth-date'));
        localStorage.setItem('deathDate', formData.get('death-date'));
        localStorage.setItem('age', calculateAge(formData.get('birth-date'), formData.get('death-date')));
        localStorage.setItem('funeralSpace', formData.get('funeral-space'));
        localStorage.setItem('familyServiceTime', formData.get('family-service-time'));
        localStorage.setItem('publicServiceTime', formData.get('public-service-time'));
        localStorage.setItem('funeralLocation', formData.get('funeral-location'));

        // 处理音乐
        if (customMusic.files.length > 0) {
            const customMusicFile = customMusic.files[0];
            const customMusicUrl = URL.createObjectURL(customMusicFile);
            currentMusicUrl = customMusicUrl;
            localStorage.setItem('musicUrl', customMusicUrl);
            backgroundMusic.src = customMusicUrl;
        }

        console.log('Redirecting to invitation.html');
        window.location.href = "invitation.html";
    }

    function calculateAge(birthDate, deathDate) {
        const birth = new Date(birthDate);
        const death = new Date(deathDate);
        let age = death.getFullYear() - birth.getFullYear();
        const monthDifference = death.getMonth() - birth.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && death.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    function handleMusicChoiceChange() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusicUrl = musicUrl;
        backgroundMusic.src = musicUrl;
        localStorage.setItem('musicUrl', musicUrl);

        if (playMusicButton.style.display === "none") {
            backgroundMusic.play().catch(error => {
                console.error("播放选中音乐失败:", error);
            });
        }
    }

    function playBackgroundMusic() {
        backgroundMusic.play().catch(error => {
            console.error("播放背景音乐失败:", error);
        });
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
        localStorage.setItem('musicPlaying', 'true');
    }

      function stopBackgroundMusic() {
        backgroundMusic.pause();
        localStorage.setItem('musicPlaying', 'false');
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    }

    form.addEventListener('submit', handleFormSubmit);
    musicChoice.addEventListener('change', handleMusicChoiceChange);
    playMusicButton.addEventListener('click', playBackgroundMusic);
    stopMusicButton.addEventListener('click', stopBackgroundMusic);

    loadStoredSettings();
});
