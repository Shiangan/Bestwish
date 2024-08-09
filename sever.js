const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const User = require('./models/User');  // 引入 User 模型
const Obituary = require('./models/Obituary');  // 引入 Obituary 模型
const Order = require('./models/Order');  // 引入 Order 模型

const app = express();
app.use(bodyParser.json());
app.use(cors());  // 允許跨域請求
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// 連接到 MongoDB
mongoose.connect('mongodb://localhost:27017/obituaryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 用戶註冊
app.post('/api/users/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    try {
        await user.save();
        res.status(201).send({ message: '註冊成功' });
    } catch (error) {
        res.status(400).send({ message: '註冊失敗', error });
    }
});

// 用戶登錄
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).send({ token });
    } else {
        res.status(401).send({ message: '登錄失敗' });
    }
});

// 託聞創建
app.post('/api/obituaries', async (req, res) => {
    const { token, ...obituaryData } = req.body;
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
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
        res.status(200).json(obituary);
    } catch (error) {
        res.status(404).send({ message: '找不到該訃聞', error });
    }
});

// 更新訃聞
app.put('/api/obituaries/:id', async (req, res) => {
    const { token, ...updates } = req.body;
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const obituary = await Obituary.findOneAndUpdate({ _id: req.params.id, createdBy: decoded.userId }, updates, { new: true });
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
        const decoded = jwt.verify(token, 'your_jwt_secret');
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
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
