const { httpStatus, console } = require('../../../utils/index');

const ClassModel = require('./models/Class');

class Class {
	constructor(data) {
		this.title = data;
	}

	async add() {
		try {
			const result = await ClassModel.create(this);
			return {
				data: result,
				code: httpStatus.CREATED,
			};
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	async update(id) {
		try {
			const result = await ClassModel.update(this, {
				where: {
					id: id,
				},
			});
			if (result[0] == 1) {
				return {
					data: 'updated',
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: result,
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async delete(id) {
		try {
			await ClassModel.destroy({
				where: {
					id: id,
				},
			});
			return {
				data: 'deleted',
				code: httpStatus.OK,
			};
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async get() {
		try {
			const result = await ClassModel.findAll();
			return {
				data: result,
				code: httpStatus.OK,
			};
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}

module.exports = Class;
