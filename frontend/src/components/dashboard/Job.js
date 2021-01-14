import React, { Component } from 'react'

export default class Job extends Component {
    render() {
        const job = this.props.job;
        return (
            <div className="card blue-grey darken-1" style={{height: '200px'}}>
              <div className="row">
                <div className="col s9" style={{ backgroundColor: 'red'}}>
                  <div className="card-content white-text">
                    <span
                    className="card-title left-align"
                    style={{ fontFamily: "monospace", fontSize: "30px" }}
                    >
                    <b>Job Title:</b> {job.title}
                    </span>
                    <p className="left-align">Recruiter: {job.recruiter}</p>
                    <p className="left-align">Salary: Rs {job.salary}/month</p>
                    <p className="left-align">Duration: {job.duration} months</p>
                    <p className="left-align">Deadline: {job.deadline.split('T')[0]} at {job.deadline.split('T')[1].split('.')[0]}</p>
                  </div>
                </div>
                <div className="col s3" style={{ backgroundColor: 'red',height: '100%' }}>
                    <button className="waves-effect waves-light btn-large" >Apply</button>
                  </div>
              </div>  
            </div>
        )
    }
}
