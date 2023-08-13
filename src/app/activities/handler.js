const { Test, Enrollment, EnrollmentStudent } = require('./service');
const { add } = require('../notifications/handler');

module.exports = {
	addEnrollment: async (req, res) => {
		const data = req.body;
		const result = await new Enrollment(data).add();
		res.status(result.code).send({
			data: result.data,
		});
	},

	updateEnrollment: async (req, res) => {
		const data = req.body;
		const id = req.body.enrollmentId;
		const result = await new Enrollment(data).update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteEnrollment: async (req, res) => {
		const id = req.params.id;
		const result = await Enrollment.delete(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	addEnrollmentStudent: async (req, res) => {
		const data = req.body;
		const result = await new EnrollmentStudent(data).add();
		res.status(result.code).send({
			data: result.data,
		});
	},

	updateEnrollmentStudent: async (req, res) => {
		const data = req.body;
		const id = req.body.id;
		const result = await new EnrollmentStudent(data).update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteEnrollmentStudent: async (req, res) => {
		const id = req.params.id;
		const result = await EnrollmentStudent.delete(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getStudentsCourse: async (req, res) => {
		const id = req.params.id;
		const result = await EnrollmentStudent.getStudentsCourse(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getStudentCourses: async (req, res) => {
		const id = req.params.id || req.user.id;
		const result = await EnrollmentStudent.getStudentCourses(id);
		res.status(result.code).send({
			data: result.data
		});
	},

	getCoursePayments: async (req, res) => {
		const userId = req.params.userId || req.user.id;
		const courseId = req.params.courseId;
		const result = await EnrollmentStudent.getCoursePayments(userId, courseId);
		res.status(result.code).send({
			data: result.data,
		});
	},

	addTest: async (req, res) => {
		const data = req.body;
		const result = await new Test(data).add(data.courseId);
		const io = req.app.get('socketio');
		const response = await add(result.data, io, result.data2);
		res.status(result.code).send({
			data: response,
		});
	},

	updateTest: async (req, res) => {
		const data = req.body;
		const id = req.body.id;
		const result = await new Test(data).update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteTest: async (req, res) => {
		const testId = req.params.testId;
		const result = await Test.delete(testId);
		res.status(result.code).send({
			data: result.data,
		});
	},

	updateMark: async (req, res) => {
		const mark = req.body.mark;
		const testId = req.body.testId;
		const userId = req.body.userId;
		const result = await Test.updateMark(userId, testId, mark);
		const io = req.app.get('socketio');
		await add(result.data, io, result.id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteTestUser: async (req, res) => {
		const id = req.params.id;
		const result = await Test.deleteTestUser(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getCourseTests: async (req, res) => {
		const id = req.params.id;
		const result = await Test.getCourseTests(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getCourseStudentTests: async (req, res) => {
		const userId = req.params.userId || req.user.id;
		const courseId = req.params.courseId;
		const result = await Test.getCourseStudentTests(userId, courseId);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getAllTests: async (req, res) => {
		const result = await Test.getAll();
		res.status(result.code).send({
			data: result.data,
		});
	},
};
