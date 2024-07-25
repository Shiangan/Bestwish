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

    let currentMusic = '';

    // 处理表单提交
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const photoFile = formData.get("photo");

        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                localStorage.setItem('name', formData.get('name'));
                localStorage.setItem('birthDate', formData.get('birth-date'));
                localStorage.setItem('deathDate', formData.get('death-date'));
                localStorage.setItem('funeralSpace', formData.get('funeral-space'));
                localStorage.setItem('funeralDate', formData.get('funeral-date'));
                localStorage.setItem('funeralLocation', formData.get('funeral-location'));
                localStorage.setItem('familyServiceTime', formData.get('family-service-time'));
                localStorage.setItem('publicServiceTime', formData.get('public-service-time'));

                // 显示敬邀您页面
                invitationSection.style.display = "flex";
                mainPhoto.src = e.target.result;
                document.querySelector("#invitation-overlay p").textContent = '敬邀您';

                // 播放音乐
                if (currentMusic) {
                    backgroundMusic.src = currentMusic;
                    backgroundMusic.play().catch(function(error) {
                        console.log("自動播放音樂失敗，需要使用者互動", error);
                    });
                }
            };
            reader.readAsDataURL(photoFile);
        }

        form.style.display = "none";
    });

    // 选择音乐
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusic = musicUrl;
        backgroundMusic.src = musicUrl;

        if (playMusicButton.style.display === "none") {
            backgroundMusic.play();
        }
    });

    // 播放音乐
    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play();
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    });

    // 停止音乐
    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });
});
