import React, { useState, useEffect } from "react";
import axios from "axios";
import Job from './Job';
import Fuse from 'fuse.js';
import './../../index.css';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState({search:'', duration:'7',typeOfJob:'', asc: '1', slider: [0,999],choice:'salary', maxs:0});
    const classes = useStyles();

    useEffect(() => {
        axios.get('api/jobs')
        .then(res => {
            setJobs(res.data);
            let maxv = 0;
            for(let i=0;i<res.data.length;i++)
                if(res.data[i].salary > maxv)
                    maxv = res.data[i].salary;
            setFilter({ ...filter, slider: [filter.slider[0], maxv], maxs: maxv});
        })
        .catch((err) => {
        console.log(err);
      });
    },[]);

    const printJobs = () => {
        const fuse = new Fuse(jobs, {keys: ['title']});
        const results = fuse.search(filter.search)
        const characterResults = filter.search ? results.map(result => result.item) : jobs
        return characterResults.sort((job1,job2) => (job1[filter.choice] - job2[filter.choice])*parseInt(filter.asc)).filter((job) => (
            (job.salary > filter.slider[0] && job.salary <= filter.slider[1]) &&
            (job.duration < filter.duration) &&
            (job.typeOfJob.toLowerCase().includes(filter.typeOfJob.toLowerCase()))
        )).map((job) => (
            <Job key = {job._id} job = {job} />
        ))
    }

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
                        value = {filter.search}
                        type="text"
                        onChange={(e) => setFilter({...filter, search: e.target.value,})}
                    />
                    <label htmlFor="icon_prefix">Search for Jobs</label>
                </div>
              </div>
            <p className="left-align grey-text text-darken-3" style={sty}>Sort By:</p>
             <FormControl className={classes.formControl}>
                <Select
                    value={filter.choice}
                    onChange={(event) => {setFilter({...filter, choice:event.target.value})}}
                >
                    <MenuItem value='salary'>Salary</MenuItem>
                    <MenuItem value='duration'>Duration</MenuItem>
                    <MenuItem value='rating'>Rating</MenuItem>
                </Select>
            </FormControl>
            <p className="grey-text text-darken-3" style={sty}>in</p>
            <FormControl className={classes.formControl}>
                <Select
                    value={filter.asc}
                    onChange={(event) => {setFilter({...filter, asc: event.target.value})}}
                >
                    <MenuItem value='1'>Ascending</MenuItem>
                    <MenuItem value='-1'>Descending</MenuItem>
                </Select>
            </FormControl>
            <p className="grey-text text-darken-3" style={sty}>Order</p>
            <fieldset id="role" onChange={(e) => setFilter({...filter, typeOfJob: e.target.value })} style={{border: 0,display: 'inline-block',paddingTop: '35px' }}>
                <span className="grey-text text-darken-3    "><b>Job Type:</b></span>
                <label style={{ padding: "0px 40px 0px 40px" }}> 
                <input 
                    className="with-gap" 
                    name="role" 
                    type="radio" 
                    value=''
                    defaultChecked
                />
                <span className="grey-text text-darken-3">All</span>
                </label>
                <label style={{ paddingRight: "20px" }}> 
                <input 
                    className="with-gap" 
                    name="role" 
                    type="radio" 
                    value='Full-Time'
                />
                <span className="grey-text text-darken-3">Full-Time</span>
                </label>
                <label style={{ paddingRight: "20px" }}> 
                <input 
                    className="with-gap" 
                    name="role" 
                    type="radio" 
                    value='Part-Time'
                />
                <span className="grey-text text-darken-3">Part-Time</span>
                </label>
                <label>
                <input 
                    className="with-gap" 
                    name="role" 
                    type="radio" 
                    value='Work from Home'
                />
                <span className="grey-text text-darken-3">Work from Home</span>
                </label>
            </fieldset>
             <div className="row" style={{paddingTop: "20px"}}>
                <div className="col s1">
                    <span className="grey-text text-darken-3"><b>Salary:</b></span>
                </div>
                <div className="col s2 black-text">
                   Rs {filter.slider[0]}/month
                </div>
                <div className="col s6">
                    <Slider 
                        max = {filter.maxs}
                        value={filter.slider}
                        onChange={(event, newValue) => setFilter({...filter, slider: newValue})}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </div>
                <div className="col s3">
                   Rs {filter.slider[1]}/month
                </div>
             </div>
             <div className="row" >
                <div className="col s3 offset-s2" style={{height: "50px", paddingTop: "23px"}}>
                    <span className="grey-text text-darken-3 right-align"><b>Duration:</b>&emsp; Less than</span>
                </div>
                <div className="input-field col s1">
                    <FormControl className={classes.formControl}>
                        <Select
                            value={filter.duration}
                            onChange={(event) => {setFilter({...filter, duration: event.target.value})}}
                        >
                            <MenuItem value='1'>1</MenuItem>
                            <MenuItem value='2'>2</MenuItem>
                            <MenuItem value='3'>3</MenuItem>
                            <MenuItem value='4'>4</MenuItem>
                            <MenuItem value='5'>5</MenuItem>
                            <MenuItem value='6'>6</MenuItem>
                            <MenuItem value='7'>7</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="col s3" style={{height: "50px", paddingTop: "23px"}}>
                    <span className="grey-text text-darken-3 left-align">months</span>
                </div>
             </div>
            {printJobs()}
        </div>
    )
};
const sty = {
    width: '120px',
    display: 'inline-block',
}
export default Jobs;