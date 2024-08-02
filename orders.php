<?php
session_start();

// 檢查用戶是否已登錄
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: admin-login.html');
    exit;
}

// 连接到数据库
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

// 檢查連接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 獲取訂單數據
$sql = "SELECT * FROM orders";
$result = $conn->query($sql);

?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>訂單管理</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
        .invoice-details {
            display: none;
        }
        .show-details:hover .invoice-details {
            display: block;
        }
        .logout-button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>訂單管理</h1>
    <button class="logout-button" onclick="window.location.href='logout.php';">登出</button>
    <?php
    if ($result->num_rows > 0) {
        echo "<table>
        <tr>
            <th>往生者</th>
            <th>訂購人</th>
            <th>訂購人电话</th>
            <th>花籃款式及樣式</th>
            <th>落款人名單</th>
            <th>是否需要发票</th>
            <th>收件發票地址及聯絡電話及姓名</th>
            <th>匯款信息</th>
        </tr>";
        while($row = $result->fetch_assoc()) {
            echo "<tr>
                <td>" . $row['deceased_name'] . "</td>
                <td>" . $row['sender_name'] . "</td>
                <td>" . $row['recipient_name'] . "</td>
                <td>" . $row['flower_style'] . "</td>
                <td>" . ($row['need_invoice'] ? '是' : '否') . "</td>";
                if ($row['need_invoice']) {
                    echo "<td class='show-details'>查看详情
                        <div class='invoice-details'>
                            <p>公司抬頭: " . $row['invoice_company'] . "</p>
                            <p>收件人姓名: " . $row['invoice_recipient'] . "</p>
                            <p>收件人地址: " . $row['invoice_address'] . "</p>
                            <p>收件人電話: " . $row['invoice_phone'] . "</p>
                        </div>
                    </td>";
                } else {
                    echo "<td>無</td>";
                }
                echo "<td>" . $row['payment_info'] . "</td>
            </tr>";
        }
        echo "</table>";
    } else {
        echo "<p>沒有訂單</p>";
    }
    $conn->close();
    ?>
</body>
</html>
