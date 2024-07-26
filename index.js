document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const invitationSection = document.getElementById("invitation-section");
    const mainPhotoElement = document.getElementById("main-photo");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");

    let currentMusic = '';

    // Retrieve and set initial state from localStorage
    const storedPhotoUrl = localStorage.getItem('photoUrl');
    const storedMusicUrl = localStorage.getItem('musicUrl');

    if (storedPhotoUrl) {
        mainPhotoElement.src = storedPhotoUrl;
        invitationSection.classList.remove("hidden");
    }

    if (storedMusicUrl) {
        currentMusic = storedMusicUrl;
        backgroundMusic.src = storedMusicUrl;
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    }

    // Handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const photoFile = document.getElementById("photo-file").files[0];
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                mainPhotoElement.src = e.target.result;
                invitationSection.classList.remove("hidden");

                // Play music
                if (currentMusic) {
                    backgroundMusic.src = currentMusic;
                    backgroundMusic.play().catch(function(error) {
                        console.log("Autoplay music failed; user interaction needed", error);
                    });
                }
            };
            reader.readAsDataURL(photoFile);
        }

        form.style.display = "none";
    });

    // Handle music choice
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusic = musicUrl;
        backgroundMusic.src = musicUrl;
        localStorage.setItem('musicUrl', musicUrl); // Save to localStorage

        // Play selected music
        if (playMusicButton.style.display === "none") {
            backgroundMusic.play().catch(function(error) {
                console.log("Autoplay music failed; user interaction needed", error);
            });
        }
    });

    // Play music
    playMusicButton.addEventListener("click", function() {
        backgroundMusic.play().catch(function(error) {
            console.log("Autoplay music failed; user interaction needed", error);
        });
        playMusicButton.style.display = "none";
        stopMusicButton.style.display = "inline";
    });

    // Stop music
    stopMusicButton.addEventListener("click", function() {
        backgroundMusic.pause();
        playMusicButton.style.display = "inline";
        stopMusicButton.style.display = "none";
    });
});
