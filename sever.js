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

// 中間件
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// 連接到 MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 用戶註冊
app.post('/api/users/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: '用戶名已存在' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: '註冊成功' });
    } catch (error) {
        res.status(500).send({ message: '註冊失敗', error });
    }
});

// 用戶登錄
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ token });
        } else {
            res.status(401).send({ message: '登錄失敗' });
        }
    } catch (error) {
        res.status(500).send({ message: '登錄過程中發生錯誤', error });
    }
});

// 創建訃聞
app.post('/api/obituaries', async (req, res) => {
    const { token, ...obituaryData } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const obituary = new Obituary({ ...obituaryData, createdBy: decoded.userId });
        await obituary.save();
        res.status(201).send({ message: '訃聞已創建' });
    } catch (error) {
        res.status(401).send({ message: '無效的令牌', error });
    }
});

// 獲取訃聞
app.get('/api/obituaries/:id', async (req, res) => {
    try {
        const obituary = await Obituary.findById(req.params.id);
        if (!obituary) {
            return res.status(404).send({ message: '找不到該訃聞' });
        }
        res.status(200).json(obituary);
    } catch (error) {
        res.status(500).send({ message: '獲取訃聞過程中發生錯誤', error });
    }
});

// 更新訃聞
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
            res.status(403).send({ message: '無權限修改該訃聞' });
        }
    } catch (error) {
        res.status(401).send({ message: '無效的令牌', error });
    }
});

// 刪除訃聞
app.delete('/api/obituaries/:id', async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await Obituary.deleteOne({ _id: req.params.id, createdBy: decoded.userId });
        if (result.deletedCount > 0) {
            res.status(200).send({ message: '訃聞已刪除' });
        } else {
            res.status(403).send({ message: '無權限刪除該訃聞' });
        }
    } catch (error) {
        res.status(401).send({ message: '無效的令牌', error });
    }
});

// 提交訂單
app.post('/api/orders', async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        res.status(201).send({ message: '訂單已提交' });
    } catch (error) {
        res.status(400).send({ message: '訂單提交失敗', error });
    }
});

// 獲取訂單
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send({ message: '無法獲取訂單', error });
    }
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
