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
                <h1 className="grey-text text-darken-2">Job Listings Available</h1>
                {jobItems}
            </div>
        )
    }
}
