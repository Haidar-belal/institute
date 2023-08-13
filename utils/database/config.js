const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('timeengc_the-institute', 'timeengc_taha', 'taha.1234', {
	dialect: 'mysql',
	host: '127.0.0.1',
	logging: false
});

// const sequelize = new Sequelize('bmmcwu3haelrxjat395a', 'ur4uanoup4marn2c', '39GXiuj6Wy9Z8E1P77KN', {
// 	dialect: 'mysql',
// 	host: 'bmmcwu3haelrxjat395a-mysql.services.clever-cloud.com',
// 	logging: false,
// 	port: 3306,
// });


module.exports = sequelize;
