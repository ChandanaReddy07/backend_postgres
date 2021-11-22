const {DataTypes} = require('sequelize');
const sequelize = require('../database');


const User = sequelize.define('user',{
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  
})


module.exports=User