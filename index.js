document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('info-form');
    const infoFormSection = document.getElementById('info-form-section');
    const invitationSection = document.getElementById('invitation-section');
    const mainPhotoContainer = document.getElementById('main-photo-container');
    const mainPhoto = document.getElementById('main-photo');
    const enterObituaryButton = document.getElementById('enter-obituary');
    const musicSelect = document.getElementById('music-choice');
    const musicPlayer = document.getElementById('background-music');
    const playButton = document.getElementById('play-music');
    const stopButton = document.getElementById('stop-music');

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Collect form data and handle photo display
        const formData = new FormData(form);
        const mainPhotoFile = formData.get('photo'); // Assuming the file input has the name 'photo'

        if (mainPhotoFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                mainPhoto.src = e.target.result;
                mainPhotoContainer.style.display = 'block';
                mainPhoto.style.opacity = 0;
                setTimeout(() => mainPhoto.style.opacity = 1, 100); // Fade in effect

                // Transition to the invitation section after photo fades in
                setTimeout(() => {
                    infoFormSection.style.display = 'none';
                    invitationSection.style.display = 'block';
                }, 3000); // Adjust the timing as needed for slower fade-in
            };
            reader.readAsDataURL(mainPhotoFile);
        } else {
            // Handle case where no photo is selected
            infoFormSection.style.display = 'none';
            invitationSection.style.display = 'block';
        }
    });

    // Handle music selection
    musicSelect.addEventListener('change', function () {
        const selectedMusic = musicSelect.value;
        musicPlayer.src = selectedMusic;
        musicPlayer.play();
    });

    // Handle play and stop music buttons
    playButton.addEventListener('click', function () {
        musicPlayer.play();
        playButton.style.display = 'none';
        stopButton.style.display = 'block';
    });

    stopButton.addEventListener('click', function () {
        musicPlayer.pause();
        playButton.style.display = 'block';
        stopButton.style.display = 'none';
    });

    // Handle navigation to obituary page
    enterObituaryButton.addEventListener('click', function () {
        window.location.href = 'obituary.html';
    });
});
