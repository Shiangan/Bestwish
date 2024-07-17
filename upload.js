document.getElementById('deceased-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const photoFile = formData.get('photo');
    const additionalPhotos = formData.getAll('additional-photos');

    try {
        // 上傳主照片
        const photoUrl = await uploadImage(photoFile);

        // 上傳額外照片
        const additionalPhotoUrls = await Promise.all(additionalPhotos.map(file => uploadImage(file)));

        // 將圖片URL添加到表單數據中
        formData.append('photo-url', photoUrl);
        additionalPhotoUrls.forEach(url => formData.append('additional-photo-urls', url));

        // 將表單數據轉換為URL參數
        const queryParams = new URLSearchParams(formData).toString();
        window.location.href = `obituary.html?${queryParams}`;
    } catch (error) {
        console.error('圖片上傳失敗', error);
        alert('圖片上傳失敗，請稍後重試');
    }
});

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
            Authorization: 'Client-ID YOUR_IMGUR_CLIENT_ID',
        }
    });

    return response.data.data.link;
}
