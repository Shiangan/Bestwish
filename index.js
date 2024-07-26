document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const invitationSection = document.getElementById("invitation-section");
    const photoContainer = document.getElementById("photo-container");
    const mainPhoto = document.getElementById("main-photo");
    const invitationOverlay = document.getElementById("invitation-overlay");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");
    讓currentMusic = '';
    // 處理表格提交
    form.addEventListener（“提交”，函式（事件）{
        event.preventDefault();
        const formData = new FormData（表格）；
        const photoFile = formData.get("photo");
        如果（照片檔案）{
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                localStorage.setItem('name', formData.get('name'));
                localStorage.setItem('birthDate', formData.get('birth-date'));
                localStorage.setItem('deathDate', formData.get('death-date'));
                localStorage.setItem('funeralSpace', formData.get('funeral-space'));
                localStorage.setItem('funeralDate', formData.get('funeral-date'));
                localStorage.setItem('funeralLocation', formData.get('funeral-location'));
                localStorage.setItem（'familyServiceTime'，formData.get（'family-service-time'））；
                localStorage.setItem（'publicServiceTime'，formData.get（'public-service-time'））；
                // 上來敬邀您
                invitationSection.style.display =“flex”；
                mainPhoto.src = e.target.result;
                document.querySelector("#invitation-overlay p").textContent = '敬邀你';
                 // 播放音樂
                 如果（當前音樂）{
                     backgroundMusic.src = currentMusic；
                     背景音樂.play（）；
                 }
             };
             reader.readAsDataURL（照片檔案）；
        }
        form.style.display =“無”；
    });
     // 選擇音樂
     musicChoice.addEventListener("change", function() {
         const selectedOption = musicChoice.options[musicChoice.selectedIndex];
         const musicUrl = selectedOption.getAttribute("data-music");
         currentMusic = musicUrl;
         背景Music.src = musicUrl;

        如果（playMusicButton.style.display ===“無”）{
            背景音樂.play（）；
        }
    });
    // 播放音樂
    playMusicButton.addEventListener("click", function() {
        背景音樂.play（）；
        playMusicButton.style.display =“無”；
        stopMusicButton.style.display =“內聯”；
    });
    // 停止音樂
    stopMusicButton.addEventListener("點選", function() {
        背景音樂.暫停（）；
        playMusicButton.style.display =“內聯”；
        stopMusicButton.style.display =“無”；
    });
});
