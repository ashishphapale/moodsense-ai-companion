const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MoodEntry = require('../models/MoodEntry');
const analyzeText = require('../services/analyzeText'); // optional AI service

// create entry
router.post('/', auth, async (req, res, next) => {
  try {
    const { mood, intensity, note, metadata, useAI } = req.body;
    const entry = new MoodEntry({
      user: req.user.id,
      mood: mood || 'custom',
      intensity,
      note,
      metadata
    });

    if (useAI && note) {
      // call AI service to produce analysis
      try {
        const analysis = await analyzeText(note);
        entry.analysis = analysis;
      } catch (e) {
        console.warn('AI analysis failed', e.message);
      }
    }

    await entry.save();
    res.status(201).json(entry);
  } catch (err) { next(err); }
});

// list entries (paginated)
router.get('/', auth, async (req, res, next) => {
  try {
    const page = Math.max(0, parseInt(req.query.page || '0'));
    const limit = Math.min(100, parseInt(req.query.limit || '20'));

    const entries = await MoodEntry.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    res.json({ page, limit, data: entries });
  } catch (err) { next(err); }
});

// get single
router.get('/:id', auth, async (req, res, next) => {
  try {
    const entry = await MoodEntry.findOne({ _id: req.params.id, user: req.user.id });
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) { next(err); }
});

// update
router.put('/:id', auth, async (req, res, next) => {
  try {
    const allowed = ['mood', 'intensity', 'note', 'metadata'];
    const update = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) update[k] = req.body[k]; });

    const entry = await MoodEntry.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, update, { new: true });
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) { next(err); }
});

// delete
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const entry = await MoodEntry.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
