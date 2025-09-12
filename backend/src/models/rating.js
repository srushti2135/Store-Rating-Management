import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
  }, { tableName: 'ratings', timestamps: true });
};