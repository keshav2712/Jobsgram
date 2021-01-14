import React, { Component } from 'react'
import axios from "axios";
import Job from './Job';

export default class Jobs extends Component {

    constructor(props){
        super(props);
        this.state = {
            jobs: []
        }
    }

    componentDidMount(){
        axios.get('api/jobs')
        .then(res => {
            this.setState({jobs: res.data})
        })
    }

    render() {
        const jobItems = this.state.jobs.map(job => 
            <Job job = {job}/>
        );
        return (
            <div>
                <h4 className="grey-text text-darken-4 header left-align" 
                    style={{fontFamily: "Bodoni Moda", padding: "20px 0px"}}>
                    JOB LISTING AVAILABLE
                </h4>
                {jobItems}
            </div>
        )
    }
}
