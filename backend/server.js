import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './src/models/index.js';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/users.js';
import storeRoutes from './src/routes/stores.js';
import ratingRoutes from './src/routes/ratings.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}).catch(err => {
  console.error('DB connection error:', err);
});