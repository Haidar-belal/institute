const { httpStatus, console } = require('../../../utils/index');

const SectionModel = require('./models/Section');

class Section {
	constructor(data) {
		this.title = data.title;
		this.classId = data.classId;
	}

	async add() {
		try {
			const result = await SectionModel.create(this);
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
			const result = await SectionModel.update(this, {
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
			const result = await SectionModel.destroy({
				where: {
					id: id,
				},
			});
			if (result === 1) {
				return {
					data: 'deleted',
					code: httpStatus.DELETED,
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
			const result = await SectionModel.findAll();
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

module.exports = Section;
