<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $deceasedName = $_POST['deceasedName'];
    $birthDate = $_POST['birthDate'];
    $deathDate = $_POST['deathDate'];
    $funeralLocation = $_POST['funeralLocation'];
    $relationship = $_POST['relationship'];
    $email = $_POST['email'];
    
    // 做一些資料驗證或處理
    // 例如，檢查並清理輸入的資料
    
    // 生成訃聞內容
    $obituary = "親愛的 $relationship 您好，感謝您的填寫。\n\n在 $deathDate ，我們緬懷 $deceasedName ，我們將永遠怀念那个纯洁的心灵。\n\n奠禮地點：$funeralLocation。\n\n如有需要，請聯繫我們。";

    // 將訃聞內容顯示或儲存到資料庫，或返回給前端顯示
    echo $obituary;
}
?>
