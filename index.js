document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const invitationSection = document.getElementById("invitation-section");
    const photoContainer = document.getElementById("photo-container");
    const mainPhoto = document.getElementById("main-photo");
    const invitationText = document.getElementById("invitation-text");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");

    // 处理表单提交
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const photoFile = formData.get("photo");

        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // 存储表单数据到 localStorage
                localStorage.setItem('photoUrl', e.target.result);
                localStorage.setItem('name', formData.get('name'));
                localStorage.setItem('birthDate', formData.get('birth-date'));
                localStorage.setItem('deathDate', formData.get('death-date'));
                localStorage.setItem('funeralSpace', formData.get('funeral-space'));
                localStorage.setItem('funeralDate', formData.get('funeral-date'));
                localStorage.setItem('funeralLocation', formData.get('funeral-location'));
                localStorage.setItem('familyServiceTime', formData.get('family-service-time'));
                localStorage.setItem('publicServiceTime', formData.get('public-service-time'));
                localStorage.setItem('age', calculateAge(new Date(formData.get('birth-date')), new Date(formData.get('death-date'))));

                // 显示 invitationSection
                invitationSection.style.display = "flex"; // 使用 flex 布局以确保居中显示
                photoContainer.style.opacity = 0;
                invitationText.style.opacity = 1;
                mainPhoto.style.opacity = 1;
                mainPhoto.src = e.target.result;

                // 隐藏表单
                form.style.display = "none";

                // 延迟跳转到下一个页面
                setTimeout(function() {
                    window.location.href = 'obituary.html'; // 可根据实际情况调整
                }, 3000); // 3秒后跳转
            };
            reader.readAsDataURL(photoFile);
        }
    });

    // 计算年龄
    function calculateAge(birthDate, deathDate) {
        const ageDifMs = deathDate - birthDate;
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

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

    // 确保音乐控制在页面加载时有正确的显示状态
    backgroundMusic.volume = 0.5;

    // 照片渐显动画
    const photoContainer = document.getElementById('photo-container');
    photoContainer.style.transition = "opacity 2s";
});
