document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const photo = params.get("photo");
    const birthDate = params.get("birth-date");
    const deathDate = params.get("death-date");
    const funeralSpace = params.get("funeral-space");
    const funeralDate = params.get("funeral-date");
    const funeralLocation = params.get("funeral-location");
    const familyServiceTime = params.get("family-service-time");
    const publicServiceTime = params.get("public-service-time");
    const lifeStory = params.get("life-story");
    const musicChoice = params.get("music-choice");

    document.getElementById("deceased-name").textContent = name;

    const photoElement = document.getElementById("deceased-photo");
    if (photo) {
        photoElement.src = photo;
        photoElement.style.display = "block";
    }

    const obituaryText = `
        我們摯愛的親人${name}，於${deathDate}安詳辭世，享年XX歲。出生於${birthDate}，
        ${funeralDate}將於${funeralLocation}舉行出殯儀式。家奠禮時間為${familyServiceTime}，
        公奠禮時間為${publicServiceTime}。${lifeStory}
        牌位安置於${funeralSpace}。敬邀各位親友一同前來悼念，共同緬懷。
    `;
    document.getElementById("obituary-text").textContent = obituaryText;

    const backgroundMusic = document.getElementById("background-music");
    if (musicChoice) {
        backgroundMusic.src = `path/to/your/music/${musicChoice}`;
        backgroundMusic.play();
    }

    document.getElementById("flower-order-button").addEventListener("click", function() {
        window.location.href = "flower-order.html";
    });
});
