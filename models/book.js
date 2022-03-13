'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // buku bagian dari user
      book.belongsTo(models.user, {
        as: 'user',
        foreignKey:{
          name:'idUser'
        }
      })
      //buku memiliki banyak transaksi
      book.hasMany(models.transaction,{
        as:'transactions',
        foreignKey:{
          name:'idBook'
        }
      })
    }
  }
  book.init({
    title: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    pages: DataTypes.INTEGER,
    author: DataTypes.STRING,
    isbn: DataTypes.STRING,
    about: DataTypes.TEXT,
    bookFile: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};