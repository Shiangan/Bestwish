document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const invitationSection = document.getElementById("invitation-section");
    const mainPhotoElement = document.getElementById("main-photo");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");

    讓currentMusic = '';

    // 從localStorage 獲取資料並設定初始狀態
    const storedPhotoUrl = localStorage.getItem('photoUrl');
    const storedMusicUrl = localStorage.getItem('musicUrl');

    如果（儲存PhotoUrl）{
        mainPhotoElement.src = storedPhotoUrl；
        invitationSection.classList.remove("隱藏");
    }

    如果（storedMusicUrl）{
        currentMusic = storedMusicUrl；
        backgroundMusic.src = storedMusicUrl；
        playMusicButton.style.display =“無”；
        stopMusicButton.style.display =“內聯”；
    }

    // 處理表格提交
    form.addEventListener（“提交”，函式（事件）{
        event.preventDefault();
 @@ -35,24 +17,17 @@ document.addEventListener("DOMContentLoaded", function() {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                // 其他表格欄位儲存到 localStorage

                // 上來敬邀您
                invitationSection.classList.remove("隱藏");
                mainPhotoElement.src = e.target.result；

                // 播放音樂
                如果（當前音樂）{
                    backgroundMusic.src = currentMusic；
                    backgroundMusic.play().catch(function(error) {
                        console.log("自動播放音樂失敗，需要使用者互動", error);
                });
                }
            };
            reader.readAsDataURL（照片檔案）；
        }

        form.style.display =“無”；
    });

    // 選擇音樂
 @@ -61,9 +36,7 @@ document.addEventListener("DOMContentLoaded", function() {
        const musicUrl = selectedOption.value；
        currentMusic = musicUrl;
        背景Music.src = musicUrl;
        localStorage.setItem('musicUrl', musicUrl); // 儲存到 localStorage

        // 播放選擇的的音乐
        如果（playMusicButton.style.display ===“無”）{
            backgroundMusic.play().catch(function(error) {
                console.log("自動播放音樂失敗，需要使用者互動", error);
 @@ -73,9 +46,7 @@ document.addEventListener("DOMContentLoaded", function() {

    // 播放音樂
    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play().catch(function(error) {
            console.log("自動播放音樂失敗，需要使用者互動", error);
        });
        playMusicButton.style.display =“無”；
        stopMusicButton.style.display =“內聯”；
    });
