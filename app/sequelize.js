const {
    Sequelize
} = require('sequelize');

// MySql Connection
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username:'root',
    password:'',
    database:'relationship_demo'
});

async function checkConnectionDB(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    sequelize,
    checkConnectionDB,
}