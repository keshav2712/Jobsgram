import axios from "axios";

export const saveUser = (userData) => {
    if(userData.role == "applicants"){
        axios
        .post("/api/applicant/save", userData)
        .then(res => res) 
        .catch(err => console.log(err));
    } else {
        axios
        .post("/api/recruiter/save", userData)
        .then(res => res) 
        .catch(err => console.log(err));
    }
}
export default saveUser;

export const getUser = (userData) => {
    if(userData.role == "applicants"){
        axios
        .get("/api/applicant", userData.userId)
        .then(res => res) 
        .catch(err => console.log(err));
    } else {
        axios
        .get("/api/recruiter", userData.userId)
        .then(res => res) 
        .catch(err => console.log(err));
    }
}