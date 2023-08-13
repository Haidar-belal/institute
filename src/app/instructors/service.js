const { httpStatus, console } = require('../../../utils/index');

const InstructorModel = require('./models/Instructor');

class Instructor {
	constructor(data) {
		this.name = data.name;
		this.mobilePhone = data.mobilePhone;
	}

	async add() {
		try {
			const result = await InstructorModel.create(this);
			return {
				data: result,
				code: httpStatus.CREATED,
			};
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.ALREADY_REGISTERED,
			};
		}
	}

	async update(id) {
		try {
			const result = await InstructorModel.update(this, {
				where: {
					id: id,
				},
			});
			if (result[0] === 1) {
				return {
					data: 'updated',
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: 'something wrong happened',
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
			const result = await InstructorModel.destroy({
				where: {
					id: id,
				},
			});
			if (result == 1) {
				return {
					data: 'deleted',
					code: httpStatus.OK,
				};
			} else {
				return {
					data: 'something wrong happened',
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

	static async get() {
		try {
			const result = await InstructorModel.findAll();
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

module.exports = Instructor;
