import React, { useCallback, useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setJobFilter } from "../../redux/jobFilterSlice";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFullText, ] = useState(false);
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [loading]);

  const applyFilters = useCallback(() => {
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
      const searchMatch =
        !filters.search ||
          (job.companyName && job.companyName.toLowerCase().includes(filters.search.toLowerCase()));

      return (
        roleMatch && expMatch && remoteMatch && salaryMatch && companyMatch && searchMatch
      );
    });
    setFilteredJobs(filtered);
  } ,[jobs, filters, companyNameFilter]);

  useEffect(() => {
    applyFilters();
  }, [jobs, filters, companyNameFilter,applyFilters]); // React to filter changes

  const fetchJobs = useCallback(async () => {
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
  }, [loading, offset]);



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

  const handleRemoveFilter = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: "", // Reset the filter value to default
    }));
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
        

        <div className="MiddleContent">
          <div className="filters">
            <div className="filter">
              <select name="role" value={filters.role} onChange={handleFilterChange}>
                <option value="">Roles</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Flutter">Flutter</option>
                <option value="Android">Android</option>
                <option value="Hr">Hr</option>
                <option value="Legal">Legal</option>
                <option value="Finance">Finance</option>
              </select>
              {filters.role && (
                <span onClick={() => handleRemoveFilter("role")}>&times;</span>
              )}
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
              {filters.employees && (
                <span onClick={() => handleRemoveFilter("employees")}>&times;</span>
              )}
            </div>
            <div className="filter">
              <select name="remote" onChange={handleFilterChange}>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
              {filters.remote && (
                <span onClick={() => handleRemoveFilter("remote")}>&times;</span>
              )}
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
              {filters.salary && (
                <span onClick={() => handleRemoveFilter("salary")}>&times;</span>
              )}
            </div>
            <div className="filter">
              <input
                type="text"
                placeholder="Search Company Name"
                name="search"
                value={filters.search}
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
                        {job.minJdSalary ? `$${job.minJdSalary}k - ` : ""}$
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
                      onClick={() => navigate("/jobDetails")}
                    >
                      Show More
                    </button>
                  </div>
                  <div className="card-footer">
                    <h3>Minimum Experience</h3>
                    <h2>
                      {job.minExp || 0} - {job.maxExp || 0} years
                    </h2>
                    <button ><a href={job.jdLink} target="blank">Easy Apply </a></button>
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
            <img src="./Github.jpg" alt="" />
          </div>
          <div className="EditLogo">
            <span className="material-symbols-outlined"><svg className="feather-edit" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
            <h3>Edit Profile</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;