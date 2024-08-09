const mongoose = require('mongoose');

const obituarySchema = new mongoose.Schema({
    mainPhoto: String,
    obituaryPaper: String,
    timeline: [{ date: String, event: String }],
    carouselPhotos: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Obituary', obituarySchema);
