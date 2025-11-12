const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, enum: ['very_happy','happy','neutral','sad','very_sad','custom'], default: 'neutral' },
  intensity: { type: Number, min: 0, max: 10, default: 5 }, // optional numeric scale
  note: { type: String },
  analysis: { type: String }, // analysis result from AI if used
  createdAt: { type: Date, default: Date.now },
  metadata: { type: Object } // any extra fields
});

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
