import axios from "axios";

export const saveUser = async (userData) => {
    if(userData.role === "applicants"){
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