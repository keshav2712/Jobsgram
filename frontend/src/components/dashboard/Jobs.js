import React, { useState, useEffect } from "react";
import axios from "axios";
import Job from './Job';
import Fuse from 'fuse.js';
import './../../index.css';

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [sal, setSal] = useState(false);
    const [dur, setDur] = useState(false);
    const [rat, setRat] = useState(false);
    const [jobType, setJobType] = useState('');

    function sorter(asc,value){
        if(!asc){
            function compare (a,b){
                return a[value]-b[value];
            }
            const newJobs = [...jobs].sort(compare);
            setJobs(newJobs);   
        }
        else{
            function compare (a,b){
                return b[value]-a[value];
            }
            const newJobs = [...jobs].sort(compare);
            setJobs(newJobs);  
        }
    }

    useEffect(() => {
        axios.get('api/jobs')
        .then(res => {
            setJobs(res.data);
        })
        .catch((err) => {
        console.log(err);
      });
    },[]);

    useEffect(() => {
        sorter(sal,'salary');
    }, [sal]);
    useEffect(() => {
        sorter(dur,'duration');
    }, [dur]);
    useEffect(() => {
        sorter(rat,'rating');
    }, [rat]);
    useEffect(() => {
        setFilteredJobs(
            jobs.filter((job) =>
                job.typeOfJob.toLowerCase().includes(jobType.toLowerCase())
            )
        );
    }, [jobType,jobs]);
    
    const fuse = new Fuse(filteredJobs, {keys: ['title']});
    const results = fuse.search(search)
    const characterResults = search ? results.map(result => result.item) : filteredJobs
    
    return (
        <div>
            <h4 className="grey-text text-darken-4 header left-align" 
                style={{fontFamily: "Bodoni Moda", padding: "10px 0px"}}>
                JOB LISTING AVAILABLE
            </h4>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                    <i className="material-icons prefix">search</i>
                    <input
                        id="icon_prefix"
                        value = {search}
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <label htmlFor="icon_prefix">Search for Jobs</label>
                </div>
              </div>
            <p className="left-align" style={sty}>Sort:</p>
            <div className="switch" style={sty}>
                <label>
                Salary
                <input type="checkbox" checked = {sal} onChange={(e) => setSal(!sal)}/>
                <span className="lever"></span>
                </label>
            </div>
            <div className="switch" style={sty}>
                <label>
                Duration
                <input type="checkbox" checked = {dur} onChange={(e) => setDur(!dur)}/>
                <span className="lever"></span>
                </label>
            </div>
            <div className="switch" style={sty}>
                <label>
                Rating
                <input type="checkbox" checked = {rat} onChange={(e) => setRat(!rat)}/>
                <span className="lever"></span>
                </label>
            </div>
            <p className="left-align" style={{marginLeft: '20px', fontSize: '17px'}}>Filters:</p>
            <fieldset id="role" onChange={(e) => setJobType(e.target.value)} style={{border: 0 }}>
                <span className="grey-text text-darken-2"><b>Job Type:</b></span>
                <label style={{ padding: "0px 20px 0px 40px" }}> 
                <input 
                    className="with-gap" 
                    name="role" 
                    type="radio" 
                    value=''
                    defaultChecked
                />
                <span className="grey-text text-darken-2">All</span>
                </label>
                <label style={{ paddingRight: "20px" }}> 
                <input 
                    className="with-gap" 
                    name="role" 
                    type="radio" 
                    value='Full-Time'
                />
                <span className="grey-text text-darken-2">Full-Time</span>
                </label>
                <label style={{ paddingRight: "20px" }}> 
                <input 
                    className="with-gap" 
                    name="role" 
                    type="radio" 
                    value='Part-Time'
                />
                <span className="grey-text text-darken-2">Part-Time</span>
                </label>
                <label>
                <input 
                    className="with-gap" 
                    name="role" 
                    type="radio" 
                    value='Work from Home'
                />
                <span className="grey-text text-darken-2">Work from Home</span>
                </label>
            </fieldset>
            <div className="row" style={{height:'100px'}}>
                <p className="grey-text text-darken-2 col s2 offset-s2" style={{ display: "inline-block", paddingRight: "20px" }}><b>Salary:</b></p>
                <div class="input-field inline col s2">
                    <input id="email_inline" type="text" pattern="[0-9]+" style={{ width: '70px'}} />
                    <label for="email_inline">Min</label>
                </div>
                <div class="input-field inline col s2">
                    <input id="email_inline" type="text" pattern="[0-9]+" style={{ width: '70px', paddingLeft: "20px"}}/>
                    <label for="email_inline">Max</label>
                </div>
                <div className="col s2" style={{display: 'grid'}}>
                    <button className="btn btn-primary small" style={{margin: 'auto'}} type="submit">Find</button>
                </div>
            </div>
            {characterResults.map((job) => (
                <Job key = {job._id} job = {job} />
            ))}
        </div>
    )
};
const sty = {
    width: '120px',
    display: 'inline-block',
}
export default Jobs;