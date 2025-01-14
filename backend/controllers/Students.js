const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const CourseList = require('../models/CourseList')
const Courses = require('../models/Courses')


const  getCourses = async(req,res) => {
    try {
        const studentEmail = req.emailID
        
        let courses = await Courses.find({})
        
        courses = courses.filter((course)=>{
            return (course.studentsList).includes(studentEmail)
        })
        
        return res.status(201).json({"studentCourses": courses })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getResponses = async(req,res) => {
    try {
        const studentEmail = req.emailID
        const exam = req.body

        let result = []

        const submissionsInd = exam.Submissions.findIndex((submission)=>submission.studentEmail===studentEmail)

        if(submissionsInd>=0){result = exam.Submissions[submissionsInd].responses}
        else
        {
            exam.Questions.forEach((question)=>{
                result.push({
                    questionNumber : question.questionNumber,
                    status : 'NotSeen',
                    questionGivenAnswer : "",
                    questionSelectedOptions : [],
                    marksObtained : 0
                })
            })
        }

        return res.status(201).json({"initialResponses": result })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getStudentProfile = async(req,res) => {
    try {
        const studentEmail = req.emailID
        
        let student = await Students.findOne({studentEmail:studentEmail})
        
        let profile = student.generalDetails

        console.log("returning student profile ",profile)

        
        return res.status(201).json({"profile": profile })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  saveSubmissions = async(req,res) => {
    try {
        const studentEmail = req.emailID

        const courseDetails = req.body.courseDetails 
        const responses = req.body.responses

        const course = await Courses.findOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter})
        
        const examInd = course.Exams.findIndex((exam)=>((exam._id).toString())===((courseDetails.exam_id).toString()))


        console.log("save exam controller ",studentEmail,courseDetails,responses,course,examInd)

       
        let Submissions = course.Exams[examInd].Submissions

        const submissionsInd = Submissions.findIndex((submission)=>submission.studentEmail===studentEmail)

        if(submissionsInd>=0)
        {
            Submissions[submissionsInd].responses = responses
        }
        else
        {
            Submissions.push({studentEmail:studentEmail,responses:responses})
        }

        await Courses.updateOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter},{'$set': { [`Exams.${examInd}.Submissions`] : Submissions}},{new:true})

        return res.status(201).json({"addedResponses": responses})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}


module.exports = {getCourses,getResponses,getStudentProfile,saveSubmissions}