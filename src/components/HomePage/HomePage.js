import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setJobFilter } from "../../redux/jobFilterSlice";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const navigate = useNavigate(); // Navigate function for routing
  const [filters, setFilters] = useState({
    role: "",
    employees: "",
    experience: "",
    remote: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const companyNameFilter = useSelector((state) => state.companyNameFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    applyFilters();
  }, [jobs, filters, companyNameFilter]); // React to filter changes

  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({ limit: 10, offset: offset });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const data = await response.json();
      setJobs((prevJobs) => [...prevJobs, ...data.jdList]); // Append new jobs
      setOffset((prevOffset) => prevOffset + data.jdList.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = jobs.filter((job) => {
      const roleMatch =
        !filters.role ||
        (job.jobRole && job.jobRole.toLowerCase().includes(filters.role));
      const expMatch =
        !filters.experience ||
        (job.minExp !== undefined &&
          job.maxExp !== undefined &&
          parseInt(filters.experience) >= job.minExp &&
          parseInt(filters.experience) <= job.maxExp);
      const remoteMatch =
        !filters.remote ||
        (job.location && job.location.toLowerCase().includes(filters.remote));
      const salaryMatch =
        !filters.salary ||
        (job.maxJdSalary !== undefined &&
          parseInt(filters.salary) <= job.maxJdSalary);
      const companyMatch =
        !companyNameFilter ||
        (job.companyName &&
          job.companyName
            .toLowerCase()
            .includes(companyNameFilter.toLowerCase()));

      return (
        roleMatch && expMatch && remoteMatch && salaryMatch && companyMatch
      );
    });
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "companyName") {
      dispatch(setJobFilter(value.toLowerCase()));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value.toLowerCase(),
      }));
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return;
    fetchJobs();
  };

  return (
    <>
      <div className="homeContainer">
        <div className="leftSidebar">
          <img src="./logo.png" alt="" />
          <div className="logoContent">
            <h4>Get jobs</h4>
            <div className="logos">
              <span class="material-symbols-outlined">person</span>
            </div>
            <div className="logos">
              <span class="material-symbols-outlined">search</span>
            </div>
            <div className="logos">
              <span class="material-symbols-outlined">Indian_rupee</span>
            </div>
            <div className="logos">
              <span class="material-symbols-outlined">person_add</span>
            </div>
          </div>
          <div className="ReferLogoContent">
            <h4>REFER</h4>
            <div className="ReferLogo">
              <span class="material-symbols-outlined">recommend</span>
            </div>
            <div className="ReferLogo">
              <span class="material-symbols-outlined">featured_play_list</span>
            </div>
            <div className="ReferLogo">
              <span class="material-symbols-outlined">share</span>
            </div>
          </div>
        </div>

        <div className="MiddleContent">
          <div className="filters">
            <div className="filter">
              <select name="role" onChange={handleFilterChange}>
                <option>Roles</option>
                <option>Backend</option>
                <option>Frontend</option>
                <option>Fullstack</option>
                <option> Flutter</option>
                <option>Android</option>
                <option>Hr</option>
                <option> Legal</option>
                <option>Finance</option>
              </select>
            </div>

            <div className="filter">
              <select name="employees" onChange={handleFilterChange}>
                <option>Number Of Employees</option>
                <option>1-10</option>
                <option>11-20</option>
                <option>21-50</option>
                <option>51-100</option>
                <option>101-200</option>
                <option>201-500</option>
                <option>500+</option>
              </select>
            </div>
            <div className="filter">
              <select name="experience" onChange={handleFilterChange}>
                <option>Experience</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>

                <option>4 Years</option>
                <option>5 Years</option>
                <option>6 Years</option>
                <option>7 Years</option>
                <option>8 Years</option>
                <option>9 Years</option>
                <option>10 Years</option>
              </select>
            </div>
            <div className="filter">
              <select name="remote" onChange={handleFilterChange}>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>

            <div className="filter">
              <select name="salary" onChange={handleFilterChange}>
                <option>Minimum Base Pay Salary</option>
                <option>0L</option>
                <option>10L</option>
                <option>20L</option>
                <option>30L</option>
                <option>40L</option>
                <option>50L</option>
                <option>60L</option>
                <option>70L</option>
              </select>
            </div>
            <div className="filter">
              <input
                type="text"
                placeholder="Search Company Name"
                name="companyName"
                value={companyNameFilter}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="grid-container">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div className="card" key={`${job.jdUid}-${index}`}>
                  <div className="card-header">
                    <span className="date-posted">Posted recently</span>
                  </div>
                  <div className="job-details">
                    <div className="jobImg">
                      <img
                        src={job.logoUrl || "./placeholder.jpg"}
                        alt="Company Logo"
                        className="company-logo"
                      />
                    </div>
                    <div className="jobContent">
                      <h2>{job.companyName}</h2>
                      <h3>{job.jobRole}</h3>
                      <h4>{job.location}</h4>
                      <p>
                        Estimated Salary:{" "}
                        {job.minJdSalary ? `$${job.minJdSalary}k - ` : ""}$$
                        {job.maxJdSalary}k {job.salaryCurrencyCode}
                      </p>
                    </div>
                  </div>
                  <div className="card-body">
                    <h1>About Company:</h1>
                    <p className={showFullText ? "" : "truncated"}>
                      {job.jobDetailsFromCompany}
                    </p>
                    <button
                      className="show-more-button"
                      onClick={() => navigate("/jobDescription")}
                    >
                      Show More
                    </button>
                  </div>
                  <div className="card-footer">
                    <h3>Minimum Experience</h3>
                    <h2>
                      {job.minExp} - {job.maxExp} years
                    </h2>
                    <button>Easy Apply</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-jobs-container">
                <h2>No Jobs Available for This Category at the Moment</h2>
                <p>Try adjusting your filters or check back later.</p>
              </div>
            )}
          </div>
        </div>

        <div className="RightSidebar">
          <div className="RightContent">
            <img src="./Profile.jpg" alt="" />
          </div>
          <div className="EditLogo">
            <span class="material-symbols-outlined">edit</span>
            <h3>Edit Profile</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;