# JOBSGRAM
Job Portal for finding and listing job opportunity

# Setup and Running 

* Get the backend sever running

```bash
    cd backend
    npm install
    nodemon server start
```

* Start the front end

```bash
    cd ../frontend
    npm install
    npm start
```

CAUTION : If the ports are already being used by some other processes, they must be killed before running the above script

```bash
    sudo fuser -k 5000/tcp
    sudo fuser -k 3000/tcp
```

Your App should be up and running on http://localhost:3000/

# Features (Summary)

* Supports two types of users - Applicants and Recruiters

## Vendors 
* View all job listings
* Apply for Jobs
* Rate Jobs
* Upload Resume

## Customer
* List out jobs
* Select applicants
* Rate employees
* Delete/Edit Jobs