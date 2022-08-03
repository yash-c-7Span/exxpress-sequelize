const Joi = require('joi');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require("../sequelize");
const { Order } = require('./Order');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    password_view: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "users",
    modelName: "User",
    createdAt: "created_at",
    updatedAt: "updated_at",
})

// Validation

const UserValidation = {
    // Validation For Create New User
    store: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),

    // Validation For Update User
    update: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),
}

User.hasMany(Order, { 
    foreignKey: "user_id",
    as:"orders",
});

module.exports = {
    User,
    UserValidation,
};