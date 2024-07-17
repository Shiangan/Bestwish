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

// 處理訂單提交
app.post('/api/orders', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.json({ message: '訂單已接收' });
});

// 獲取所有訂單
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
