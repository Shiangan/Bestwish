document.addEventListener('DOMContentLoaded', () => {
    const otherFuneralLocationInput = document.getElementById('other-funeral-location');
    const funeralLocationSelect = document.getElementById('funeral-location');
    const musicChoice = document.getElementById('music-choice');
    const audioElement = new Audio();

    funeralLocationSelect.addEventListener('change', () => {
        if (funeralLocationSelect.value === '其他') {
            otherFuneralLocationInput.style.display = "block";
            otherFuneralLocationInput.required = true;
        } else {
            otherFuneralLocationInput.style.display = "none";
            otherFuneralLocationInput.required = false;
            otherFuneralLocationInput.value = ""; // Clear the input value if not required
        }
    });

    musicChoice.addEventListener('change', () => {
        audioElement.src = musicChoice.value;
        audioElement.play();
    });

    // Control music play/pause
    const musicControlButton = document.createElement('button');
    musicControlButton.textContent = '🔊 開啟音樂';
    document.body.appendChild(musicControlButton);

    let isPlaying = true;
    musicControlButton.addEventListener('click', () => {
        if (isPlaying) {
            audioElement.pause();
            musicControlButton.textContent = '🔇 關閉音樂';
        } else {
            audioElement.play();
            musicControlButton.textContent = '🔊 開啟音樂';
        }
        isPlaying = !isPlaying;
    });

    // Ensure music starts playing on page load with selected choice
    if (musicChoice.value) {
        audioElement.src = musicChoice.value;
        audioElement.play();
    }
});
