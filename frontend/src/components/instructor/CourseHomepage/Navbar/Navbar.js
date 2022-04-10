import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@material-ui/core';

function Navbar({course}) {

  const navigate = useNavigate()

  console.log("navbar course ",course)

  const goToAdd = ()=>{
    navigate('/instructor/addExam', {
      state : course,
    })
  }
  const goToPast = ()=>{
    navigate('/instructor/pastExam', {
      state : course,
    })
  }

  const goToParticipants = ()=>{
    navigate('/instructor/participants',{
      state:course
    })
  }

  return(
    <> 
      <div>
       
        <nav  className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Button onClick={()=>{navigate('/instructor')}} style={{color:"white"}}>Home</Button>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Button onClick={goToAdd} style={{color:"white"}}>Add Exam</Button>
                </li>
                <li className="nav-item">
                <Button onClick={goToPast} style={{color:"white"}}>Past Exams</Button>
                </li>
                <li className="nav-item">
                <Button onClick={goToParticipants} style={{color:"white"}}>Participants</Button>
                </li>
             </ul>
            </div>
          </div>
        </nav>
      </div>
      
       </>
  )
}

export default Navbar;

