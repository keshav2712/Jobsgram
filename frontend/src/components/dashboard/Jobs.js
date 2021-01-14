import React, { Component } from 'react'

export default class Jobs extends Component {

    constructor(props){
        super(props);
        this.state = {
            jobs: []
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => this.setState({jobs: data}));
    }

    render() {
        const jobItems = this.state.jobs.map()
        return (
            <div>
                <h1>Job Listings Available</h1>
            </div>
        )
    }
}
