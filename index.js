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

        const musicUrl = musicChoice.value;
        const customMusicFile = customMusic.files[0];
        
        if (customMusicFile) {
            const customMusicUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(customMusicFile);
            });
            currentMusicUrl = customMusicUrl;
            localStorage.setItem('musicUrl', customMusicUrl);
            backgroundMusic.src = customMusicUrl;
        } else if (musicUrl) {
            currentMusicUrl = musicUrl;
            localStorage.setItem('musicUrl', musicUrl);
            backgroundMusic.src = musicUrl;
        }

        localStorage.setItem('name', document.getElementById('name').value);
        localStorage.setItem('birthDate', document.getElementById('birth-date').value);
        localStorage.setItem('deathDate', document.getElementById('death-date').value);
        localStorage.setItem('age', calculateAge(document.getElementById('birth-date').value, document.getElementById('death-date').value));
        localStorage.setItem('funeralSpace', document.getElementById('funeral-space').value);
        localStorage.setItem('familyServiceTime', document.getElementById('family-service-time').value);
        localStorage.setItem('publicServiceTime', document.getElementById('public-service-time').value);
        localStorage.setItem('funeralLocation', document.getElementById('funeral-location').value);

        const additionalPhotos = Array.from(document.getElementById("additional-photos").files).map(file => {
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
    }

    function stopBackgroundMusic() {
        backgroundMusic.pause();
        localStorage.setItem('musicPlaying', 'false');
        playMusicButton.style.display = "block";
        stopMusicButton.style.display = "none";
    }

    form.addEventListener("submit", handleFormSubmit);
    musicChoice.addEventListener("change", handleMusicChoiceChange);
    playMusicButton.addEventListener("click", playBackgroundMusic);
    stopMusicButton.addEventListener("click", stopBackgroundMusic);

    loadStoredSettings();
});
