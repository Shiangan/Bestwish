const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    orderDetails: String,
    status: { type: String, default: 'Pending' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
