const IMGUR_CLIENT_ID = 'YOUR_IMGUR_CLIENT_ID';

document.getElementById('photo').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (file) {
        const url = await uploadImageToImgur(file);
        document.getElementById('photo-url').value = url;
    }
});

document.getElementById('additional-photos').addEventListener('change', async function(event) {
    const files = event.target.files;
    const urls = [];
    for (let i = 0; i < files.length; i++) {
        const url = await uploadImageToImgur(files[i]);
        urls.push(url);
    }
    document.getElementById('additional-photos-urls').value = urls.join(',');
});

async function uploadImageToImgur(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
        },
        body: formData
    });

    const data = await response.json();
    return data.data.link;
}
