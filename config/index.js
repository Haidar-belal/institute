const dotenv = require('dotenv');
dotenv.config({ path: 'config/.env' });
const configFile = require(`./${process.env.NODE_ENV || 'development'}.json`);
require('module-alias/register');
module.exports = {
	nodeEnv: process.env.NODE_ENV,
	port: configFile.port,
	cipherAlgorithm: configFile.cipherAlgorithm,
	saltWorkFactor: configFile.SALT_WORK_FACTOR,
	key: configFile.key
};
