// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let orders = [];  // 簡單存儲，實際應使用數據庫

app.post('/api/orders', (req, res) => {
    const order = req.body;
    order.id = orders.length + 1;
    order.created_at = new Date();
    orders.push(order);
    res.status(201).send({ message: '訂單已收到' });
});

app.get('/api/orders', (req, res) => {
    res.status(200).json(orders);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
