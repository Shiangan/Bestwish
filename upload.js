document.getElementById('deceased-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const photoFile = formData.get('photo');
    const additionalPhotos = formData.getAll('additional-photos');

    try {
        // 上传主照片
        const photoUrl = await uploadImage(photoFile);

        // 上传额外照片
        const additionalPhotoUrls = await Promise.all(additionalPhotos.map(file => uploadImage(file)));

        // 将图片URL添加到表单数据中
        const queryParams = new URLSearchParams({
            ...Object.fromEntries(formData.entries()), // 包括所有表单字段
            'photo-url': photoUrl,
            'additional-photo-urls': additionalPhotoUrls.join(',')
        }).toString();

        // 重定向到 obituary.html 页面
        window.location.href = `obituary.html?${queryParams}`;
    } catch (error) {
        console.error('图片上传失败', error);
        alert('图片上传失败，请稍后重试');
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
