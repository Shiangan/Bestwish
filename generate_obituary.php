<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $relationship = $_POST['relationship'];
    $email = $_POST['email'];
    
    // 做一些資料驗證或處理
    // 例如，檢查並清理輸入的資料
    
    // 生成訃聞內容
    $obituary = "親愛的 $relationship $name 您好，感謝您的填寫。\n\n這是一段訃聞文字內容，用來描述逝者的生平和相關資訊。\n\n如有需要，請聯繫我們。";

    // 將訃聞內容顯示或儲存到資料庫，或返回給前端顯示
    echo $obituary;
}
?>
