const Instructor = require('./service');

module.exports = {
	add: async (req, res) => {
		const data = req.body;
		const result = await new Instructor(data).add();
		res.status(result.code).send({
			data: result.data,
			token: result.token,
		});
	},

	update: async (req, res) => {
		const data = req.body;
		const id = req.body.instructorId;
		const result = await new Instructor(data).update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteInstructor: async (req, res) => {
		const id = req.params.id;
		const result = await Instructor.delete(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getAll: async (req, res) => {
		const result = await Instructor.get();
		res.status(result.code).send({
			data: result.data,
		});
	},
};
