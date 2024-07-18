// 確保HTML文檔完全加載後再執行JavaScript代碼
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('deceased-form');

    // 表單提交時的處理函數
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 防止表單默認提交

        // 可以添加表單驗證邏輯，確保必填字段都填寫了

        // 可以使用FormData API來獲取表單數據
        const formData = new FormData(form);

        // 可以使用Fetch API或其他Ajax方法將表單數據提交到後端處理
        fetch('process_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('網絡錯誤，請稍後再試。');
            }
            return response.text();
        })
        .then(data => {
            // 可以處理後端返回的任何數據或顯示成功消息給用戶
            console.log(data);
            alert('表單提交成功！');
            form.reset(); // 提交成功後重置表單
        })
        .catch(error => {
            console.error('表單提交錯誤:', error);
            alert('表單提交失敗。');
        });
    });
});
