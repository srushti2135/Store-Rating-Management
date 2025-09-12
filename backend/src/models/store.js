import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Store', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100) },
    address: { type: DataTypes.STRING(400) }
  }, { tableName: 'stores', timestamps: true });
};