document.addEventListener('DOMContentLoaded', function() {
    const playMusicButton = document.getElementById('play-music');
    const stopMusicButton = document.getElementById('stop-music');
    const backgroundMusic = document.getElementById('background-music');
    const musicChoice = document.getElementById('music-choice');
    const customMusic = document.getElementById('custom-music');

    let currentMusicUrl = '';

    function loadStoredSettings() {
        const storedMusicUrl = localStorage.getItem('musicUrl');
        const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';

        if (storedMusicUrl) {
            currentMusicUrl = storedMusicUrl;
            backgroundMusic.src = storedMusicUrl;
            if (isMusicPlaying) {
                backgroundMusic.play().catch(error => console.error('播放背景音乐失败:', error));
                playMusicButton.style.display = 'none';
                stopMusicButton.style.display = 'inline';
            }
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Handle main photo
        const mainPhotoFile = formData.get('photo');
        if (mainPhotoFile) {
            const mainPhotoUrl = URL.createObjectURL(mainPhotoFile);
            localStorage.setItem('mainPhoto', mainPhotoUrl);
        }

        // Handle additional photos
        const additionalPhotos = Array.from(formData.getAll('additional-photos[]')).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(additionalPhotos)
            .then(loadedPhotos => localStorage.setItem('additionalPhotos', JSON.stringify(loadedPhotos)))
            .catch(error => console.error('加载附加照片失败:', error));

        // Save other form data
        localStorage.setItem('name', formData.get('name'));
        localStorage.setItem('birthDate', formData.get('birth-date'));
        localStorage.setItem('deathDate', formData.get('death-date'));
        localStorage.setItem('age', calculateAge(formData.get('birth-date'), formData.get('death-date')));
        localStorage.setItem('funeralSpace', formData.get('funeral-space'));
        localStorage.setItem('familyServiceTime', formData.get('family-service-time'));
        localStorage.setItem('publicServiceTime', formData.get('public-service-time'));
        localStorage.setItem('funeralLocation', formData.get('funeral-location'));

        // Handle music
        if (customMusic.files.length > 0) {
            const customMusicFile = customMusic.files[0];
            const customMusicUrl = URL.createObjectURL(customMusicFile);
            currentMusicUrl = customMusicUrl;
            localStorage.setItem('musicUrl', customMusicUrl);
            backgroundMusic.src = customMusicUrl;
        }

        window.location.href = 'invitation.html';
    }

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

    function handleMusicChoiceChange() {
        const selectedOption = musicChoice.options[musicChoice.selectedIndex];
        const musicUrl = selectedOption.value;
        currentMusicUrl = musicUrl;
        backgroundMusic.src = musicUrl;
        localStorage.setItem('musicUrl', musicUrl);

        if (playMusicButton.style.display === 'none') {
            backgroundMusic.play().catch(error => console.error('播放选中音乐失败:', error));
        }
    }

    function playBackgroundMusic() {
        backgroundMusic.play().catch(error => console.error('播放背景音乐失败:', error));
        playMusicButton.style.display = 'none';
        stopMusicButton.style.display = 'inline';
        localStorage.setItem('musicPlaying', 'true');
    }

    function stopBackgroundMusic() {
        backgroundMusic.pause();
        playMusicButton.style.display = 'inline';
        stopMusicButton.style.display = 'none';
        localStorage.setItem('musicPlaying', 'false');
    }

    function displayStoredObituaryData() {
        const mainPhotoUrl = localStorage.getItem('mainPhoto');
        const additionalPhotos = JSON.parse(localStorage.getItem('additionalPhotos') || '[]');
        const name = localStorage.getItem('name');
        const birthDate = localStorage.getItem('birthDate');
        const deathDate = localStorage.getItem('deathDate');
        const age = localStorage.getItem('age');
        const funeralSpace = localStorage.getItem('funeralSpace');
        const familyServiceTime = localStorage.getItem('familyServiceTime');
        const publicServiceTime = localStorage.getItem('publicServiceTime');
        const funeralLocation = localStorage.getItem('funeralLocation');

        if (mainPhotoUrl) {
            document.getElementById('main-photo').src = mainPhotoUrl;
        }

        // Populate carousel with additional photos
        const carousel = document.getElementById('carousel');
        additionalPhotos.forEach(photoUrl => {
            const img = document.createElement('img');
            img.src = photoUrl;
            img.addEventListener('click', () => openPhotoInLightbox(photoUrl));
            carousel.appendChild(img);
        });

        // Display obituary details in the timeline
        const timeline = document.getElementById('timeline');
        const timelineItems = [
            { date: birthDate, event: `${name} 出生` },
            { date: deathDate, event: `${name} 逝世，享年 ${age} 歲` },
            { date: '', event: `靈位位置：${funeralSpace}` },
            { date: familyServiceTime, event: `家屬奠儀時間` },
            { date: publicServiceTime, event: `公開奠儀時間` },
            { date: '', event: `葬禮地點：${funeralLocation}` }
        ];

        timelineItems.forEach(item => {
            if (item.date || item.event) {
                const timelineItem = document.createElement('div');
                timelineItem.classList.add('timeline-item');
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('date');
                dateDiv.textContent = item.date;
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.textContent = item.event;
                timelineItem.appendChild(dateDiv);
                timelineItem.appendChild(eventDiv);
                timeline.appendChild(timelineItem);
            }
        });
    }

    function openPhotoInLightbox(photoUrl) {
        // Implement lightbox to view photo in larger size
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        const img = document.createElement('img');
        img.src = photoUrl;
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
        lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
    }

    function addComment(event) {
        event.preventDefault();
        const name = document.getElementById('message-name').value;
        const content = document.getElementById('message-content').value;
        const photoInput = document.getElementById('message-photo');
        let photoUrl = '';

        if (photoInput.files.length > 0) {
            photoUrl = URL.createObjectURL(photoInput.files[0]);
        }

        const comment = document.createElement('div');
        comment.classList.add('message');
        comment.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>${content}</p>
            ${photoUrl ? `<img src="${photoUrl}" alt="附加照片">` : ''}
            <button class="edit-comment">編輯</button>
            <button class="delete-comment">刪除</button>
        `;

        document.getElementById('comments-container').appendChild(comment);

        // Add edit and delete functionality
        comment.querySelector('.edit-comment').addEventListener('click', () => editComment(comment));
        comment.querySelector('.delete-comment').addEventListener('click', () => deleteComment(comment));

        // Reset form
        document.getElementById('message-form-element').reset();
    }

    function editComment(comment) {
        const name = comment.querySelector('strong').textContent;
        const content = comment.querySelector('p:nth-of-type(2)').textContent;
        const photo = comment.querySelector('img');

        // Fill form with current comment data
        document.getElementById('message-name').value = name;
        document.getElementById('message-content').value = content;
        // Handle photo edit if necessary

        // Remove current comment
        comment.remove();
    }

    function deleteComment(comment) {
        if (confirm('確定要刪除這則留言嗎？')) {
            comment.remove();
        }
    }

    // Event Listeners
    playMusicButton.addEventListener('click', playBackgroundMusic);
    stopMusicButton.addEventListener('click', stopBackgroundMusic);
    musicChoice.addEventListener('change', handleMusicChoiceChange);
    document.getElementById('message-form-element').addEventListener('submit', addComment);

    // Load stored settings and obituary data on page load
    loadStoredSettings();
    displayStoredObituaryData();
}); 
