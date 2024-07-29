document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");
    const customMusic = document.getElementById("custom-music");

    let currentMusicUrl = '';

    // 从 localStorage 加载已保存的设置
    function loadStoredSettings() {
        const storedPhotoUrl = localStorage.getItem('photoUrl');
        const storedMusicUrl = localStorage.getItem('musicUrl');

        if (storedPhotoUrl) {
            // 不需要在 index.html 显示照片，但可以用于调试
            console.log("Stored photo URL:", storedPhotoUrl);
        }

        if (storedMusicUrl) {
            currentMusicUrl = storedMusicUrl;
            backgroundMusic.src = storedMusicUrl;
            playMusicButton.style.display = "none";
            stopMusicButton.style.display = "inline";
        }
    }

    // 处理表单提交
    function handleFormSubmit(event) {
        event.preventDefault();

        const photoFile = document.getElementById("photo").files[0];
        const additionalPhotoFiles = document.getElementById("additional-photos").files;
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // 保存主要照片 URL
                    localStorage.setItem('photoUrl', e.target.result);

                // 获取用户选择的音乐或自定义上传音乐
                const musicUrl = musicChoice.value;
                const customMusicFile = customMusic.files[0];
                if (customMusicFile) {
                    const customMusicReader = new FileReader();
                    customMusicReader.onload = function(customMusicEvent) {
                        currentMusicUrl = customMusicEvent.target.result;
                        localStorage.setItem('musicUrl', currentMusicUrl);
                        backgroundMusic.src = currentMusicUrl;
                    };
                    customMusicReader.readAsDataURL(customMusicFile);
                } else if (musicUrl) {
                    currentMusicUrl = musicUrl;
                    localStorage.setItem('musicUrl', musicUrl);
                    backgroundMusic.src = musicUrl;
                }

                // 保存表单中的其他数据
                localStorage.setItem('name', document.getElementById('name').value);
                localStorage.setItem('birthDate', document.getElementById('birth-date').value);
                localStorage.setItem('deathDate', document.getElementById('death-date').value);
                localStorage.setItem('age', calculateAge(document.getElementById('birth-date').value, document.getElementById('death-date').value));
                localStorage.setItem('funeralSpace', document.getElementById('funeral-space').value);
                localStorage.setItem('familyServiceTime', document.getElementById('family-service-time').value);
                localStorage.setItem('publicServiceTime', document.getElementById('public-service-time').value);
                localStorage.setItem('funeralLocation', document.getElementById('funeral-location').value);

                // 保存追思照片
                const additionalPhotos = [];
                for (let i = 0; i < additionalPhotoFiles.length; i++) {
                    const fileReader = new FileReader();
                    fileReader.onload = function(event) {
                        additionalPhotos.push(event.target.result);
                        if (additionalPhotos.length === additionalPhotoFiles.length) {
                            localStorage.setItem('additionalPhotos', JSON.stringify(additionalPhotos));
                        }
                    };
                    fileReader.readAsDataURL(additionalPhotoFiles[i]);
                }

                // 跳转到 invitation.html
                setTimeout(() => {
                    window.location.href = "invitation.html";
                }, 100); // 确保 UI 更新完成后再跳转
            };
            reader.readAsDataURL(photoFile);
        } else {
            console.error("未选择主要照片文件。");
        }
    }

    // 计算年龄
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

    // 处理音乐选择
    function handleMusicChoiceChange() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusicUrl = musicUrl;
        backgroundMusic.src = musicUrl;
        localStorage.setItem('musicUrl', musicUrl);

        // 如果音乐正在播放，则更新为选中的音乐
        if (playMusicButton.style.display === "none") {
            backgroundMusic.play().catch(error => {
                console.error("播放选中音乐失败:", error);
            });
        }
    }

    // 播放背景音乐
    function playBackgroundMusic() {
        backgroundMusic.play().catch(error => {
            console.error("播放背景音乐失败:", error);
        });
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    }

    // 停止背景音乐
    function stopBackgroundMusic() {
        backgroundMusic.pause();
        stopMusicButton.style.display = "none";
        playMusicButton.style.display = "inline";
    }

    // 绑定事件监听器
    form.addEventListener("submit", handleFormSubmit);
    musicChoice.addEventListener("change", handleMusicChoiceChange);
    playMusicButton.addEventListener("click", playBackgroundMusic);
    stopMusicButton.addEventListener("click", stopBackgroundMusic);

    // 页面加载时加载保存的设置
    loadStoredSettings();
});
