// 处理表单提交
async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    // 处理主照片
    const mainPhotoFile = formData.get('photo');
    if (mainPhotoFile) {
        const mainPhotoUrl = URL.createObjectURL(mainPhotoFile);
        localStorage.setItem('mainPhoto', mainPhotoUrl);
    }

    // 处理附加照片
    const additionalPhotos = Array.from(formData.getAll('additional-photos[]')).map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });

    try {
        const loadedPhotos = await Promise.all(additionalPhotos);
        localStorage.setItem('additionalPhotos', JSON.stringify(loadedPhotos));
    } catch (error) {
        console.error("加载附加照片失败:", error);
    }

    // 保存其他表单数据
    localStorage.setItem('name', formData.get('name'));
    localStorage.setItem('birthDate', formData.get('birth-date'));
    localStorage.setItem('deathDate', formData.get('death-date'));
    localStorage.setItem('age', calculateAge(formData.get('birth-date'), formData.get('death-date')));
    localStorage.setItem('funeralSpace', formData.get('funeral-space'));
    localStorage.setItem('familyServiceTime', formData.get('family-service-time'));
    localStorage.setItem('publicServiceTime', formData.get('public-service-time'));
    localStorage.setItem('funeralLocation', formData.get('funeral-location'));

    // 处理音乐
    if (customMusic.files.length > 0) {
        const customMusicFile = customMusic.files[0];
        const customMusicUrl = URL.createObjectURL(customMusicFile);
        currentMusicUrl = customMusicUrl;
        localStorage.setItem('musicUrl', customMusicUrl);
        backgroundMusic.src = customMusicUrl;
    }

    // 跳转到 invitation.html 页面
    window.location.href = "invitation.html";
}
