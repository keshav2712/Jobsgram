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
        sorter(sal,'salary');
    }, [sal]);
    useEffect(() => {
        sorter(dur,'duration');
    }, [dur]);
    useEffect(() => {
        sorter(rat,'rating');
    }, [rat]);

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
        setFilteredJobs(
            jobs.filter((job) =>
                job.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, jobs]);

    const fuse = new Fuse(jobs, {keys: ['title']});
    const results = fuse.search(search)
    const characterResults = search ? results.map(result => result.item) : jobs
    
    return (
        <div>
            <h4 className="grey-text text-darken-4 header left-align" 
                style={{fontFamily: "Bodoni Moda", padding: "20px 0px"}}>
                JOB LISTING AVAILABLE
            </h4>
            <input
                value = {search}
                type="search"
                placeholder="Search Jobs"
                onChange={(e) => setSearch(e.target.value)}
            />
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
            <p></p>
            {characterResults.map((job) => (
                <Job key = {job._id} job = {job} />
            ))}
        </div>
    )
};
const sty = {
    width: '120px',
    display: 'inline-block',
    padding: '25px 0px'
}
export default Jobs;