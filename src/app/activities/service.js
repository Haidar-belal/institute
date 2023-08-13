const { httpStatus, console } = require('../../../utils/index');

const EnrollmentModel = require('./models/Enrollment');
const TestModel = require('./models/Test');
const User = require('../users/models/User');
const Course = require('../courses/models/Course');
const Instructor = require('../instructors/models/Instructor');
const Class = require('../classes/models/Class');
const EnrollmentStudentModel = require('../activities/models/EnrollmentStudent');
const TestStudentsModel = require('../activities/models/TestStudent');

class Enrollment {
	constructor(data) {
		this.month = data.month;
	}

	async add() {
		try {
			const result = await EnrollmentModel.create(this);
			return { data: result, code: httpStatus.CREATED };
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
			const result = await EnrollmentModel.update(this, {
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
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async delete(id) {
		try {
			const result = await EnrollmentModel.destroy({
				where: {
					id: id,
				},
			});
			if (result == 1) {
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
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}

class EnrollmentStudent {
	constructor(data) {
		this.amount = data.amount;
		this.month = data.month;
		this.courseId = data.courseId;
		this.userId = data.userId;
	}
	async add() {
		try {
			const result = await EnrollmentStudentModel.create(this);
			return { data: result, code: httpStatus.CREATED };
		} catch (error) {
			console.error(error);
			if (error.message.includes('Validation error')) {
				return {
					data: 'already registered',
					code: httpStatus.BAD_REQUEST,
				};
			}
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	async update(id) {
		try {
			const result = await EnrollmentStudentModel.update(
				{ amount: this.amount },
				{
					where: {
						id: id,
					},
				}
			);
			if (result[0] == 1) {
				return {
					data: 'updated',
					code: httpStatus.UPDATED,
				};
			} else {
				console.log(result);
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async delete(id) {
		try {
			const result = await EnrollmentStudentModel.destroy({
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
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getStudentsCourse(id) {
		try {
			const result = await EnrollmentStudentModel.findAll({
				where: {
					courseId: id,
				},
				attributes: ['id'],
				include: {
					model: User,
					as: 'users',
					attributes: {
						exclude: [
							'username',
							'type',
							'isActive',
							'section',
							'verificationCode',
							'createdAt',
							'updatedAt',
							'sectionId',
							'password',
						],
					},
				},
			});
			let data = [];
			let idS = [];
			for (let i of result) {
				let isFound = false;
				for (let j of idS) {
					if (i.users.id === j) {
						isFound = true;
						break;
					}
				}
				if (!isFound) {
					idS.push(i.users.id);
					const obj = {
						id: i.users.id,
						email: i.users.email,
						name: i.users.name,
						mobilePhone: i.users.mobilePhone,
						phone: i.users.phone,
						address: i.users.address,
						recordId: i.id
					};
					data.push(obj);
				}
			}
			return {
				data: data,
				code: httpStatus.OK,
			};
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getStudentCourses(id) {
		try {
			const result = await EnrollmentStudentModel.findAll({
				where: {
					userId: id,
				},
				attributes: ['month', 'amount'],
				include: [
					{
						model: Course,
						as: 'coursePayment',
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'instructorId', 'classId'],
						},
						include: [
							{
								model: Instructor,
								as: 'instructor',
								attributes: ['name'],
							},
							{
								model: Class,
								as: 'class',
								attributes: ['title'],
							},
						],
					},
				],
			});
			let data = [];
			let idS = [];
			for (let i of result) {
				let isFound = false;
				for (let j of idS) {
					if (i.coursePayment.id === j) {
						isFound = true;
						break;
					}
				}
				if (!isFound) {
					const course = {
						id: i.coursePayment.id,
						title: i.coursePayment.title,
						price: i.coursePayment.price,
						instructor: i.coursePayment.instructor.name,
						class: i.coursePayment.class.title,
					};
					idS.push(i.coursePayment.id);
					data.push(course);
				}
			}
			return {
				data: data,
				code: httpStatus.OK,
			};
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getCoursePayments(userId, courseId) {
		try {
			const result = await EnrollmentStudentModel.findAll({
				where: {
					userId: userId,
					courseId: courseId,
				},
				attributes: ['amount', 'month'],
			});
			return {
				data: result,
				code: httpStatus.OK,
			};
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}

class Test {
	constructor(data) {
		this.title = data.title;
		this.date = data.date;
		this.courseId = data.courseId;
	}

	async add(courseId) {
		try {
			const result = await TestModel.create(this);
			const result1 = await EnrollmentStudentModel.findAll({
				where: {
					courseId: courseId,
				},
				attributes: ['userId'],
			});
			const course = await Course.findOne({
				where: {
					id: courseId,
				},
				attributes: ['title'],
			});
			let data = [];
			let idS = [];
			for (let i of result1) {
				let isFound = false;
				for (let j of idS) {
					if (i.userId === j) {
						isFound = true;
						break;
					}
				}
				if (!isFound) {
					idS.push(i.userId);
					data.push(i);
				}
			}
			let rows = [];
			for (let i of data) {
				let row = {
					testId: result.id,
					userId: i.userId,
				};
				rows.push(row);
			}
			await TestStudentsModel.bulkCreate(rows);
			const date = result.date.toLocaleString().substring(0, 9);
			const notification = {
				title: result.title,
				body: course.title + '\n' + date,
			};
			return {
				data: notification,
				data2: idS,
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
			const result = await TestModel.update(this, {
				where: {
					id: id,
				},
			});
			if (result[0] == 1) {
				return {
					data: 'updated successfully',
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: 'something wrong happened!',
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
			const result = await TestModel.destroy({
				where: {
					id: id,
				},
			});
			if (result == 1) {
				return {
					data: 'deleted successfully',
					code: httpStatus.OK,
				};
			} else {
				return {
					data: 'something wrong happened!',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getAll() {
		try {
			const result = await TestModel.findAll();
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

	static async updateMark(userId, testId, mark) {
		try {
			const result = await TestStudentsModel.update(
				{
					mark: mark,
				},
				{
					where: {
						userId: userId,
						testId: testId,
					},
				}
			);
			const course = await TestModel.findOne({
				where: {
					id: testId,
				},
				include: {
					model: Course,
					as: 'course',
					attributes: ['title'],
				},
			});
			const notification = {
				title: course.course.title,
				body: `تم إصدار العلامة: ${course.title}`,
			};
			if (result[0] == 1) {
				let idS = [];
				idS.push(userId);
				return {
					data: notification,
					id: idS,
					code: httpStatus.OK,
				};
			} else {
				return {
					data: 'something wrong happened!',
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

	static async deleteTestUser(id) {
		try {
			const result = await TestStudentsModel.destroy({
				where: {
					id: id,
				},
			});
			if (result == 1) {
				return {
					data: 'deleted successfully',
					code: httpStatus.DELETED,
				};
			} else {
				return {
					data: 'something wrong happened!',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getCourseTests(id) {
		try {
			const result = await TestModel.findAll({
				where: {
					courseId: id,
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'courseId'],
				},
				include: {
					model: User,
					attributes: ['name', 'mobilePhone', 'id'],
					through: {
						model: TestStudentsModel,
						attributes: ['mark'],
						as: 'test',
					},
					as: 'testStudents',
				},
			});
			let data = [];
			result.map((element, index) => {
				let test = {
					id: element.id,
					title: element.title,
					data: element.date,
				};
				let users = [];
				for (let j of element.testStudents) {
					const obj = {
						id: j.id,
						name: j.name,
						mobilePhone: j.mobilePhone,
						mark: j.test.mark,
					};
					users.push(obj);
				}
				data.push({ test: test, testStudents: users });
			});
			return {
				data: data,
				code: httpStatus.OK,
			};
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getCourseStudentTests(studentId, courseId) {
		try {
			const result = await TestModel.findAll({
				where: {
					courseId: courseId,
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'courseId'],
				},
				include: {
					model: User,
					where: {
						id: studentId,
					},
					attributes: ['name'],
					through: {
						model: TestStudentsModel,
						attributes: ['mark'],
						as: 'test',
					},
					as: 'testStudents',
				},
			});
			let data = [];
			result.map((element) => {
			let date = `${element.date.getDate()}/${element.date.getMonth() + 1}/${element.date.getFullYear()}`;
				const obj = {
					id: element.id,
					title: element.title,
					date: date,
					mark: element.testStudents[0].test.mark,
				};
				data.push(obj);
			});
			return {
				data: data,
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

module.exports = {
	Enrollment,
	EnrollmentStudent,
	Test,
};
