document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the data from localStorage
    const name = localStorage.getItem("name");
    const deathDate = localStorage.getItem("death-date");
    const birthDate = localStorage.getItem("birth-date");
    const funeralLocation = localStorage.getItem("funeral-location");
    const funeralDate = localStorage.getItem("funeral-date");
    const familyServiceTime = localStorage.getItem("family-service-time");
    const publicServiceTime = localStorage.getItem("public-service-time");
    const lifeStory = localStorage.getItem("life-story");
    const musicChoice = localStorage.getItem("music-choice");

    // Calculate age
    const birthDateObj = new Date(birthDate);
    const deathDateObj = new Date(deathDate);
    const age = deathDateObj.getFullYear() - birthDateObj.getFullYear();

    // Update the obituary content
    document.getElementById("deceased-name").textContent = name;
    document.getElementById("death-date").textContent = deathDate;
    document.getElementById("age").textContent = age;
    document.getElementById("funeral-location").textContent = funeralLocation;
    document.getElementById("funeral-date").textContent = funeralDate;

    // Display main photo
    const mainPhoto = document.createElement("img");
    mainPhoto.src = localStorage.getItem("photo");
    document.getElementById("main-photo").appendChild(mainPhoto);

    // Display additional photos
    const additionalPhotos = JSON.parse(localStorage.getItem("additional-photos"));
    const photoSlider = document.getElementById("photo-slider");
    additionalPhotos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo;
        photoSlider.appendChild(img);
    });

    // Start playing background music
    const audio = new Audio(musicChoice);
    audio.play();

    // Load the map based on the funeral location
    const mapContainer = document.getElementById("map-container");
    let mapSrc;
    if (funeralLocation === "第二殯儀館") {
        mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.547072898947!2d121.51179301459488!3d25.072806143743448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a92839bc3ad3%3A0x551c15deffdfbdc2!2z5Y-w5Y2B5L2N6IKh!5e0!3m2!1szh-TW!2stw!4v1625403243400!5m2!1szh-TW!2stw";
    } else if (funeralLocation === "板橋殯儀館") {
        mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.547072898947!2d121.45179301459488!3d25.012806143743448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a92729bc3ad3%3A0x551c15deffdfbdc2!2z5Y-wu5Y2B5L2N6IKh!5e0!3m2!1szh-TW!2stw!4v1625403243400!5m2!1szh-TW!2stw";
    } else {
        // Use a generic map or custom location
        mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.547072898947!2d121.51179301459488!3d25.072806143743448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a92839bc3ad3%3A0x551c15deffdfbdc2!2z5Y-w5Y2B5L2N6IKh!5e0!3m2!1szh-TW!2stw!4v1625403243400!5m2!1szh-TW!2stw";
    }

    const mapIframe = document.createElement("iframe");
    mapIframe.src = mapSrc;
    mapIframe.width = "100%";
    mapIframe.height = "100%";
    mapIframe.style.border = "0";
    mapIframe.allowFullscreen = "";
    mapIframe.loading = "lazy";
    mapContainer.appendChild(mapIframe);

    // Handle tribute submissions
    document.getElementById("submit-tribute").addEventListener("click", () => {
        const message = document.getElementById("tribute-message").value;
        if (message) {
            const li = document.createElement("li");
            li.textContent = message;
            document.getElementById("tribute-list").appendChild(li);
            document.getElementById("tribute-message").value = ""; // Clear the input field
        }
    });
});
