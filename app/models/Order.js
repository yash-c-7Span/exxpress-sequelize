const Joi = require('joi');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require("../sequelize");

const Order = sequelize.define("Order", {
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },

    user_id:{
        type:DataTypes.BIGINT,
        allowNull:true
    },

    address:{
        type:DataTypes.TEXT,
        allowNull:true
    },

    total:{
        type:DataTypes.DOUBLE,
        allowNull:true,
    },

    status:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:0,
    },
}, {
    createdAt:"created_at",
    updatedAt:"updated_at",
    tableName:"orders",
    modelName:"Order"
});

module.exports = {
    Order
}