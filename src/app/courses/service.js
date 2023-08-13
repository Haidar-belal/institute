const { httpStatus, console } = require('../../../utils/index');

const CourseModel = require('./models/Course');

class Course {
	constructor(data) {
		this.title = data.title;
		this.instructorId = data.instructorId;
		this.price = data.price;
		this.classId = data.classId;
	}

	async add() {
		try {
			const result = await CourseModel.create(this);
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
			const result = await CourseModel.update(this, {
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
			await CourseModel.destroy({
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
			const result = await CourseModel.findAll();
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

	static async getClassCourses(id) {
		try {
			const result = await CourseModel.findAll({
				where: {
					classId: id,
				},
			});
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

module.exports = Course;
