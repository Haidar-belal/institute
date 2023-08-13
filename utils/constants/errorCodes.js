module.exports = {
	DEFAULT: { code: 1000, msg: 'Error' }, // * Default error
	ITEM_NOT_FOUND: { code: 1001, msg: 'Item not found' }, // * Item not found
	ALREADY_EXISTED: {},
	LIMIT_FILE_SIZE: { code: 4000, msg: 'Max upload limit exceeded' }, // * Multer limit file size
};
