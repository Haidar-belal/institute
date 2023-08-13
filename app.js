require('../config');
const { database, console, passport, logger } = require('./utils/index');
const passportMiddleware = require('passport');
// const cluster = require('cluster');
console.info(`1`);
// if (cluster.isMaster) {
// 	let numWorkers = require('os').cpus().length;

// 	console.info('Master cluster setting up ' + numWorkers + ' workers...');

// 	for (let i = 0; i < numWorkers; i++) {
// 		cluster.fork();
// 	}

// 	cluster.on('online', function (worker) {
// 		console.info('Worker ' + worker.process.pid + ' is online');
// 	});

// 	cluster.on('exit', function (worker, code, signal) {
// 		console.warn('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
// 		console.warn('Starting a new worker');
// 		cluster.fork();
// 	});
// } else {
	const User = require('./src/app/users/models/User');
	const Course = require('./src/app/courses/models/Course');
	const Class = require('./src/app/classes/models/Class');
	const Section = require('./src/app/sections/models/Section');
	const Instructor = require('./src/app/instructors/models/Instructor');
	const Test = require('./src/app/activities/models/Test');
	const TestStudent = require('./src/app/activities/models/TestStudent');
	const EnrollmentStudent = require('./src/app/activities/models/EnrollmentStudent');
	const Report = require('./src/app/reports/models/Report');
	const Notification = require('./src/app/notifications/models/Notification');
console.info(`2`);
	/////
	Course.hasMany(Test, { as: 'tests', foreignKey: 'courseId', onDelete: 'cascade' });
	Test.belongsTo(Course, { as: 'course', foreignKey: 'courseId' });

	User.belongsToMany(Test, {
		through: { model: 'TestStudent' },
		as: 'testStudents',
		foreignKey: 'userId',
		onDelete: 'cascade',
	});
	Test.belongsToMany(User, {
		through: { model: 'TestStudent' },
		as: 'testStudents',
		foreignKey: 'testId',
		onDelete: 'cascade',
	});
console.info(`3`);
	TestStudent.belongsTo(User, { as: 'user', foreignKey: 'userId' });
	TestStudent.belongsTo(Test, { as: 'test', foreignKey: 'testId' });
	/////

	// User - Course
	User.hasMany(EnrollmentStudent, {
		foreignKey: 'userId',
	});
	Course.hasMany(EnrollmentStudent, {
		foreignKey: 'courseId',
	});
console.info(`4`);
	EnrollmentStudent.belongsTo(Course, { as: 'coursePayment', foreignKey: 'courseId' });
	EnrollmentStudent.belongsTo(User, { as: 'users', foreignKey: 'userId' });

	// Class - Course
	Class.hasMany(Course, { as: 'courses', foreignKey: 'classId', onDelete: 'cascade' });
	Course.belongsTo(Class, { as: 'class', foreignKey: 'classId' });

	// Instructor - Course
	Instructor.hasMany(Course, { as: 'courses', foreignKey: 'instructorId', onDelete: 'cascade' });
	Course.belongsTo(Instructor, { as: 'instructor', foreignKey: 'instructorId' });

	// User - Report
	User.hasMany(Report, { as: 'reports', foreignKey: 'userId', onDelete: 'cascade' });
	Report.belongsTo(User, { foreignKey: 'userId' });

	// User - Notification
	User.hasMany(Notification, { as: 'notifications', foreignKey: 'userId', onDelete: 'cascade' });
	Notification.belongsTo(User, { foreignKey: 'userId' });

	// Class - Section
	Class.hasMany(Section, { as: 'sections', foreignKey: 'classId', onDelete: 'cascade' });
	Section.belongsTo(Class, { foreignKey: 'classId' });

	// User - Section
	Section.hasMany(User, { as: 'users', foreignKey: 'sectionId', onDelete: 'cascade' });
	User.belongsTo(Section, { as: 'section', foreignKey: 'sectionId' });
console.info(`5`);
	database.sync({ alter: true }).then(() => {
		const config = require('dotenv').config;
		config();
		console.info(`6`);
		const express = require('express');
		const path = require('path');
		const app = express();
		const http = require('http');
		const server = http.createServer(app);
		app.set('port', 3010);

		/* notifications socket io */
		const io = require('socket.io')(server);

		io.sockets.on('connection', (socket) => {
			console.log(socket.id + ' connected');
			socket.emit('check', {});

			socket.on('disconnect', (socket_) => {
				console.log(socket_.id + ' disconnected');
			});
		});

		app.get('/nodejs-apps/the-institute/test', (req, res) => res.status(200).json({ msg: 'welcome' }));

		app.use('/assets', express.static(path.join('assets', 'public')));

		app.use(express.urlencoded({ extended: false }));
		app.use(express.json({ limit: '50mb' }));
		app.use(express.text({ limit: '50mb' }));
		app.use(logger);
console.info(`7`);
		passportMiddleware.initialize();

		app.use('/nodejs-apps/the-institute/api/public', require('./src/app/publicRouter'));

		app.use(passport.authenticate.authenticate);

		app.use('/nodejs-apps/the-institute/api/private', require('./app/router'));

		app.set('socketio', io);
console.info(`8`);
		server.listen('PORT', () => {
			console.info(`Server is listening on port PORT`);
		});
	});
// }
