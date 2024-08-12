require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Obituary = require('./models/Obituary');
const Order = require('./models/Order');

const app = express();

// 中间件
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// 连接到 MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 用户注册
app.post('/api/users/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: '用户名已存在' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: '注册成功' });
    } catch (error) {
        res.status(500).send({ message: '注册失败', error });
    }
});

// 用户登录
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ token });
        } else {
            res.status(401).send({ message: '登录失败' });
        }
    } catch (error) {
                res.status(500).send({ message: '获取讣闻过程中发生错误', error });
    }
});

// 更新讣闻
app.put('/api/obituaries/:id', async (req, res) => {
    const { token, ...updates } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const obituary = await Obituary.findOneAndUpdate(
            { _id: req.params.id, createdBy: decoded.userId },
            updates,
            { new: true }
        );
        if (obituary) {
            res.status(200).json(obituary);
        } else {
            res.status(403).send({ message: '无权限修改该讣闻' });
        }
    } catch (error) {
        res.status(401).send({ message: '无效的令牌', error });
    }
});

// 删除讣闻
app.delete('/api/obituaries/:id', async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await Obituary.deleteOne({ _id: req.params.id, createdBy: decoded.userId });
        if (result.deletedCount > 0) {
            res.status(200).send({ message: '讣闻已删除' });
        } else {
            res.status(403).send({ message: '无权限删除该讣闻' });
        }
    } catch (error) {
        res.status(401).send({ message: '无效的令牌', error });
    }
});

// 提交订单
app.post('/api/orders', async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        res.status(201).send({ message: '订单已提交' });
    } catch (error) {
        res.status(400).send({ message: '订单提交失败', error });
    }
});

// 获取订单
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send({ message: '无法获取订单', error });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
