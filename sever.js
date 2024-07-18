<?php
// 获取表单数据
$senderName = $_POST['sender-name'];
$recipientName = $_POST['recipient-name'];
$deceasedName = $_POST['deceased-name'];
$tributeList = $_POST['tribute-list'];
$needInvoice = isset($_POST['need-invoice']) ? true : false;
$invoiceDetails = $_POST['invoice-details'];

// 连接到数据库（示例）
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 准备插入订单的SQL语句
$sql = "INSERT INTO orders (sender_name, recipient_name, deceased_name, tribute_list, need_invoice, invoice_details)
        VALUES ('$senderName', '$recipientName', '$deceasedName', '$tributeList', '$needInvoice', '$invoiceDetails')";

if ($conn->query($sql) === TRUE) {
    // 数据库插入成功
    header('Location: thanks.html'); // 跳转到感谢页面
    exit;
} else {
    // 数据库插入失败
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
