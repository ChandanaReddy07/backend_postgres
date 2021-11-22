const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const DeletedProduct = sequelize.define("delprod", {

  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bar_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price:{
      type: DataTypes.FLOAT,
      allowNull:true
  },
 
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = DeletedProduct;
