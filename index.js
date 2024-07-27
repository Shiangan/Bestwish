document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("info-form");
    const playMusicButton = document.getElementById("play-music");
    const stopMusicButton = document.getElementById("stop-music");
    const backgroundMusic = document.getElementById("background-music");
    const musicChoice = document.getElementById("music-choice");

    let currentMusic = '';

    // Retrieve and set initial state from localStorage
    const storedPhotoUrl = localStorage.getItem('photoUrl');
    const storedMusicUrl = localStorage.getItem('musicUrl');

    if (storedPhotoUrl) {
        document.getElementById("main-photo").src = storedPhotoUrl;
        document.getElementById("invitation-section").classList.remove("hidden");
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

        const photoFile = document.getElementById("photo").files[0];
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('photoUrl', e.target.result);
                document.getElementById("main-photo").src = e.target.result;
                document.getElementById("invitation-section").classList.remove("hidden");

                // Play music
                if (currentMusic) {
                    backgroundMusic.src = currentMusic;
                    backgroundMusic.play().catch(function(error) {
                        console.log("Autoplay music failed; user interaction needed", error);
                    });
                }

                // Redirect to invitation.html
                window.location.href = "invitation.html";
            };
            reader.readAsDataURL(photoFile);
        } else {
            console.error("No photo file selected.");
        }

        form.style.display = "none";
    });

    // Handle music choice
    musicChoice.addEventListener("change", function() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusic = musicUrl;
        backgroundMusic.src = musicUrl;
        localStorage.setItem('musicUrl', musicUrl);

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
