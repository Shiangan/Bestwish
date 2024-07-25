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

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const photoFile = formData.get("photo");
        const additionalPhotos = formData.getAll("additional-photos[]");

        if (photoFile) {
            const reader = new FileReader();
            reader.onload = async function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                localStorage.setItem('name', formData.get('name'));
                localStorage.setItem('birthDate', formData.get('birth-date'));
                localStorage.setItem('deathDate', formData.get('death-date'));
                localStorage.setItem('funeralSpace', formData.get('funeral-space'));
                localStorage.setItem('funeralDate', formData.get('funeral-date'));
                localStorage.setItem('funeralLocation', formData.get('funeral-location'));
                localStorage.setItem('familyServiceTime', formData.get('family-service-time'));
                localStorage.setItem('publicServiceTime', formData.get('public-service-time'));

                const additionalPhotosUrls = await Promise.all(additionalPhotos.map(file => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            resolve(e.target.result);
                        };
                        reader.onerror = function(error) {
                            reject(error);
                        };
                        reader.readAsDataURL(file);
                    });
                }));

                localStorage.setItem('additionalPhotosUrls', JSON.stringify(additionalPhotosUrls));

                invitationSection.style.display = "flex";
                mainPhoto.src = e.target.result;
                document.querySelector("#invitation-overlay p").textContent = '敬邀您';

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

    // Load stored data on page load
    if (localStorage.getItem('photoUrl')) {
        mainPhoto.src = localStorage.getItem('photoUrl');
        invitationSection.style.display = "flex";
    }
    if (localStorage.getItem('name')) {
        document.getElementById("name").textContent = localStorage.getItem('name');
    }
    if (localStorage.getItem('birthDate')) {
        document.getElementById("birth-date").textContent = localStorage.getItem('birthDate');
    }
    if (localStorage.getItem('deathDate')) {
        document.getElementById("death-date").textContent = localStorage.getItem('deathDate');
    }
    if (localStorage.getItem('funeralSpace')) {
        document.getElementById("funeral-space").textContent = localStorage.getItem('funeralSpace');
    }
    if (localStorage.getItem('funeralDate')) {
        document.getElementById("funeral-date").textContent = localStorage.getItem('funeralDate');
    }
    if (localStorage.getItem('funeralLocation')) {
        document.getElementById("funeral-location").textContent = localStorage.getItem('funeralLocation');
    }
    if (localStorage.getItem('familyServiceTime')) {
        document.getElementById("family-service-time").textContent = localStorage.getItem('familyServiceTime');
    }
    if (localStorage.getItem('publicServiceTime')) {
        document.getElementById("public-service-time").textContent = localStorage.getItem('publicServiceTime');
    }
    if (localStorage.getItem('additionalPhotosUrls')) {
        const additionalPhotosUrls = JSON.parse(localStorage.getItem('additionalPhotosUrls'));
        const carousel = $('.carousel');
        additionalPhotosUrls.forEach(photo => {
            carousel.slick('slickAdd', `<div><img src="${photo}" alt="追思照片"></div>`);
        });
    }
});
