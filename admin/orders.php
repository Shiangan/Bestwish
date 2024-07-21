<?php
header('Content-Type: application/json');

$orders = [
    [
        'id' => 1,
        'sender_name' => '王小明',
        'recipient_name' => '李大華',
        'need_invoice' => true,
        'invoice_details' => '公司: ABC Ltd, 地址: 台北市信義路',
        'line_id' => 'user123',
        'total_price' => 3000,
        'payment_status' => '已支付',
        'created_at' => '2024-07-22 12:34:56'
    ],
    // 添加更多訂單
];

echo json_encode($orders);
?>
