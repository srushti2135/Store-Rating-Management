import { Store, Rating, User } from '../models/index.js';

export async function createStore(req, res) {
  try {
    const { name, email, address, ownerId } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });
    const store = await Store.create({ name, email, address, ownerId });
    res.json(store);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
}

export async function listStores(req, res) {
  const q = (req.query.q || '').toLowerCase();
  const where = {};
  if (q) {
    // simple search by name or address substring
    where['$or'] = [
      { name: { $like: `%${q}%` } },
      { address: { $like: `%${q}%` } }
    ];
  }
  const stores = await Store.findAll();
  // attach average rating and user's submitted rating if user provided
  const storesWithRatings = await Promise.all(stores.map(async s => {
    const avg = await Rating.findOne({ where: { storeId: s.id }, attributes: [[Rating.sequelize.fn('avg', Rating.sequelize.col('rating')), 'avgRating']] });
    return { ...s.toJSON(), avgRating: avg ? parseFloat(avg.dataValues.avgRating || 0).toFixed(2) : null };
  }));
  res.json(storesWithRatings);
}

export async function getStore(req, res) {
  const id = req.params.id;
  const store = await Store.findByPk(id);
  if (!store) return res.status(404).json({ message: 'Not found' });
  const ratings = await Rating.findAll({ where: { storeId: store.id }, include: [{ model: User, attributes: ['id','name','email'] }] });
  const avg = await Rating.findOne({ where: { storeId: store.id }, attributes: [[Rating.sequelize.fn('avg', Rating.sequelize.col('rating')), 'avgRating']] });
  res.json({ ...store.toJSON(), ratings, avgRating: avg ? parseFloat(avg.dataValues.avgRating || 0).toFixed(2) : null });
}

export async function updateStore(req, res) {
  const id = req.params.id;
  await Store.update(req.body, { where: { id } });
  const s = await Store.findByPk(id);
  res.json(s);
}

export async function deleteStore(req, res) {
  const id = req.params.id;
  await Store.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
}