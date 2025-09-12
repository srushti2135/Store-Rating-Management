import { Sequelize } from 'sequelize';
import UserModel from './user.js';
import StoreModel from './store.js';
import RatingModel from './rating.js';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false
});

export const User = UserModel(sequelize);
export const Store = StoreModel(sequelize);
export const Rating = RatingModel(sequelize);

// Associations
User.hasMany(Store, { foreignKey: 'ownerId' });
Store.belongsTo(User, { foreignKey: 'ownerId' });

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

export default sequelize;