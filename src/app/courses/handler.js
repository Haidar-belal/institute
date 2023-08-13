const Course = require('./service');

module.exports = {
	add: async (req, res) => {
		const data = req.body;
		const result = await new Course(data).add();
		res.status(result.code).send({
			data: result.data,
			token: result.token,
		});
	},

	update: async (req, res) => {
		const data = req.body;
		const id = req.body.courseId;
		const result = await new Course(data).update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteCourse: async (req, res) => {
		const id = req.params.id;
		const result = await Course.delete(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getAll: async (req, res) => {
		const result = await Course.get();
		res.status(result.code).send({
			data: result.data,
		});
	},

	getClassCourses: async (req, res) => {
		const id = req.body.classId;
		const result = await Course.getClassCourses(id);
		res.status(result.code).send({
			data: result.data,
		});
	},
};
