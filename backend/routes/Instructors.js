const express = require('express')
const router = express.Router()

const {getCourses,addExam,saveExam,evaluateExam,assignGrade,saveCheckedResponses} = require('../controllers/Instructors')

router.route('/getCourses').get(getCourses)

router.route('/exams').post(addExam).patch(saveExam)
router.route('/exams/check').patch(saveCheckedResponses)
router.route('/exams/evaluate').patch(evaluateExam)
router.route('/grade').patch(assignGrade)

module.exports = router



