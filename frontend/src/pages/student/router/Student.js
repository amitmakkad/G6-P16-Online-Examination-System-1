import React , {useEffect,useState} from 'react';
import {Routes,Route} from "react-router-dom";

import StudentHomepage from '../homepage/StudentHomepage';
import GiveExam from '../giveExam/giveExam';
import CourseHomepage from '../../student/courseHomepage/CourseHomepage';
import PastExam from '../pastExam/pastExam';
import Participants from '../participants/studentParticipants';

import { getCoursesStudent } from '../../../api';

function Student() {

  const [courses,setCourses] = useState([])

  useEffect(()=>{
    getCoursesStudent().then(response=>setCourses(response.data.studentCourses))
  },[])
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<StudentHomepage courses={courses}/>}/>
            <Route path="/giveExam" element={<GiveExam/>}/>
            <Route path="/courseHomepage" element={<CourseHomepage/>}/>
            <Route path="/pastExam" element={<PastExam/>}/>
            <Route path="/participants" element={<Participants/>}/>
        </Routes>
    </div>
  </>)
}

export default Student;


