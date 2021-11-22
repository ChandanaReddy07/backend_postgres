const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const Todo = sequelize.define('todo',{
    todo_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
  
})


module.exports=Todo
