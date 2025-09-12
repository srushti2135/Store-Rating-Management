import { Rating } from '../models/index.js';

export async function submitRating(req, res) {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;
    if (!storeId || !rating) return res.status(400).json({ message: 'Missing fields' });
    if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be 1-5' });
    // upsert: if user already rated this store, update
    const existing = await Rating.findOne({ where: { userId, storeId } });
    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json(existing);
    }
    const r = await Rating.create({ userId, storeId, rating });
    res.json(r);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
}

export async function listRatings(req, res) {
  const ratings = await Rating.findAll();
  res.json(ratings);
}