// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

let orders = [];  // 存储订单数据
const adminUser = { username: 'admin', password: 'password' };  // 简单的管理员用户

// 管理员登录
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === adminUser.username && password === adminUser.password) {
        req.session.loggedIn = true;
        res.status(200).send({ message: '登录成功' });
    } else {
        res.status(401).send({ message: '用户名或密码错误' });
    }
});

// 提交订单
app.post('/api/orders', (req, res) => {
    const order = req.body;
    order.id = orders.length + 1;
    order.created_at = new Date();
    orders.push(order);
    res.status(201).send({ message: '订单已收到' });
});

// 获取订单数据
app.get('/api/orders', (req, res) => {
    if (req.session.loggedIn) {
        res.status(200).json(orders);
    } else {
        res.status(403).send({ message: '未授权' });
    }
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
