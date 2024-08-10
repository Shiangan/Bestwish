document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");
    const customMusic = document.getElementById("custom-music");

    let currentMusicUrl = '';

    function handleFormSubmit(event) {
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

        Promise.all(additionalPhotos).then(loadedPhotos => {
            localStorage.setItem('additionalPhotos', JSON.stringify(loadedPhotos));
        }).catch(error => {
            console.error("加载附加照片失败:", error);
        });

        // 保存纸本诉讼
        const paperObituaryFile = formData.get('paper-obituary');
        if (paperObituaryFile) {
            const paperObituaryUrl = URL.createObjectURL(paperObituaryFile);
            localStorage.setItem('paperObituary', paperObituaryUrl);
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

        // Handle custom music upload
        if (customMusic.files.length > 0) {
            const customMusicFile = customMusic.files[0];
            const customMusicUrl = URL.createObjectURL(customMusicFile);
            currentMusicUrl = customMusicUrl;
            localStorage.setItem('musicUrl', customMusicUrl);
            backgroundMusic.src = customMusicUrl;
        }

        // Redirect to invitation.html
        console.log("准备跳转到 invitation.html");
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
                console.error("播放背景音乐失败:", error);
            });
        }
    }

    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play().catch(error => {
            console.error("播放背景音乐失败:", error);
        });
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
        localStorage.setItem('musicPlaying', 'true');
    });

    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
        localStorage.setItem('musicPlaying', 'false');
    });

    musicChoice.addEventListener("change", handleMusicChoiceChange);

    form.addEventListener("submit", handleFormSubmit);
});
