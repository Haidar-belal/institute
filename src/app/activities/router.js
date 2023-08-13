const {
	addEnrollment,
	updateEnrollment,
	getStudentCourses,
	getStudentsCourse,
	deleteEnrollment,
	addTest,
	updateTest,
	deleteTest,
	getAllTests,
	addEnrollmentStudent,
	updateEnrollmentStudent,
	deleteEnrollmentStudent,
	getCoursePayments,
	updateMark,
	deleteTestUser,
	getCourseTests,
	getCourseStudentTests,
} = require('./handler');
const router = require('express').Router();

// Enrollment

router.post('/addEnrollment', addEnrollment);

router.put('/updateEnrollment', updateEnrollment);

router.delete('/deleteEnrollment/:id', deleteEnrollment);

// Enrollment - Student

router.post('/addEnrollmentStudent', addEnrollmentStudent);

router.put('/updateEnrollmentStudent', updateEnrollmentStudent);

router.delete('/deleteEnrollmentStudent/:id', deleteEnrollmentStudent);

router.get('/getStudentsCourse/:id', getStudentsCourse);

router.get('/getStudentCourses/:id?', getStudentCourses);

router.get('/getCoursePayments/:courseId/:userId?', getCoursePayments);

// Test - Student

router.post('/addTest', addTest);

router.put('/updateTest', updateTest);

router.delete('/deleteTest/:testId', deleteTest);

router.get('/allTests', getAllTests);

router.get('/getCoursetests/:id', getCourseTests);

router.get('/getCourseStudentTests/:courseId/:userId?', getCourseStudentTests);

router.put('/updateMark', updateMark);

module.exports = router;
