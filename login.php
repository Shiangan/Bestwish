<?php
session_start();

// 连接到数据库
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 从POST请求中获取数据
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

// 检查用户名和密码
$sql = "SELECT password FROM admins WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
        $_SESSION['loggedin'] = true;
        http_response_code(200);
    } else {
        http_response_code(401);
        echo json_encode(['message' => 'Invalid username or password']);
    }
} else {
    http_response_code(401);
    echo json_encode(['message' => 'Invalid username or password']);
}

$stmt->close();
$conn->close();
?>
