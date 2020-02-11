const Sequelize = require('sequelize');
const User = require('../models/user');
const Page = require('../models/page');
const config = require('../config/config');

const sequelize = new Sequelize({
    database: config[process.env.NODE_ENV].database,
    username: config[process.env.NODE_ENV].username,
    password: config[process.env.NODE_ENV].password,
    host: config[process.env.NODE_ENV].host,
    dialect: config[process.env.NODE_ENV].dialect
});

const UserModel = User.init(sequelize, Sequelize);
const PageModel = Page.init(sequelize, Sequelize);

sequelize
    // .authenticate()
    .sync()
    .then(() => {
        console.log('Connection has been established successfully')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        throw err;
    });

module.exports = {UserModel, PageModel, sequelize};
