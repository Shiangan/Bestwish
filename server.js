// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let orders = [];
let totalQuantity = 0;
let totalPrice = 0;

// 处理订单提交
app.post('/api/orders', (req, res) => {
    const order = req.body;
    orders.push(order);
    totalQuantity += parseInt(order.quantity); // 假设订单中有数量字段 quantity
    totalPrice += parseInt(order.price); // 假设订单中有价格字段 price
    res.json({ message: '订单已接收', totalQuantity, totalPrice });
});

// 获取所有订单及统计信息
app.get('/api/orders', (req, res) => {
    res.json({ orders, totalQuantity, totalPrice });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
