import React from 'react'
import './../../index.css';

function Job(props){
    
        const job = props.job;
        return (
            <div className="card" style={{minHeight: '200px'}}>
              <div className="row">
                <div className="col s9" >
                  <div className="card-content black-text">
                    <span
                    className="card-title left-align"
                    style={{ fontSize: "22px" }}
                    >
                    <b>Job Title:</b> {job.title}
                    </span>
                    <p className="left-align"><b>Recruiter:</b> {job.recruiter}</p>
                    <p className="left-align"><b>Salary:</b> Rs {job.salary}/month</p>
                    <p className="left-align"><b>Duration:</b> {job.duration} months</p>
                    <p className="left-align"><b>Type:</b> {job.typeOfJob}</p>
                    <p className="left-align"><b>Deadline:</b> {job.deadline.split('T')[0]} at {job.deadline.split('T')[1].split('.')[0]}</p>
                  </div>
                </div>
                <div className="col s3" style={{height: '200px',display: 'grid' }}>
                    <button className="waves-effect waves-light btn-large button" 
                    style={{ margin: 'auto'}}>
                    Apply</button>
                  </div>
              </div>  
            </div>
        )
    }
export default Job