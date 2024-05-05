import React from "react";
import "./Job.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Job = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="jobContent">
      <Button
        onClick={handleBack}
        className="back"
        sx={{
          "&:hover": {
            backgroundColor: "rgb(24, 118, 210)",
            color: "white",
          },
        }}
      >
        All prodigol jobs
      </Button>

      <div className="job-container">
        <div className="job-sidebar">
          <div className="sidebar-section">
            <Typography variant="h6">Location</Typography>
            <Typography>Hyderabad</Typography>
            <Typography variant="h6">Department</Typography>
            <Typography>Engineering</Typography>
          </div>
        </div>
        <div className="job-main">
          <Typography variant="h4">Senior Engineer</Typography>
          <div className="job-description">
            <Typography variant="h4">About the role</Typography>
            <div className="role-overview">
              <Typography variant="h6">Overview</Typography>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <Typography>Company name: FlexWash Technologies </Typography>
                </li>
                <li>
                  <Typography>
                  San Jose, California
                  </Typography>
                </li>
                <li>
                  <Typography>Salary: Rs. 30 -60 lakhs per year</Typography>
                </li>
                <li>
                  <Typography>Experience: 5+ years</Typography>
                </li>
                <li>
                  <Typography>Location: Hyderabad</Typography>
                </li>
                <li>
                  <Typography>Type: Full-time</Typography>
                </li>
              </ul>
              <Typography>
                Are you willing to contribute your skills to have an impact on the planet and accelerate the clean energy transition?
                Come join SmartHelio, a Y-Combinator-backed deep-tech company based in Switzerland, USA, and India, recognized as “Best for the world” by B-Corporation Institute for its high contribution to the clean tech & environment.
                We accelerate the adoption of clean and sustainable energy in the face of climate change providing state-of-the-art technology to enhance energy market efficiency. We are disrupting the energy sector using Artificial intelligence, Machine Learning, Edge Computing, IoT, and Advanced Climate Modelling to help generate more energy from solar/wind farms and make them truly green and sustainable. Kindly visit www.smarthelio.com for more information.
                We are venturing into a high-growth phase and looking for new members to join our startup. We are hiring a Software Engineer who will contribute by designing, developing, and maintaining cloud applications and services to meet our business needs.
              </Typography>
            </div>
            <div className="roleResponsibility">
              <Typography variant="h4">Responsibilities:</Typography>
              <Typography>
                1. ML Algorithm Development: Design and implement advanced ML
                algorithms leveraging traditional Machine Learning techniques
                and the modern NLP stack, including Large Language Model (LLMs)
              </Typography>
              <Typography>
                2. Data Engineering & Software Development: Architect and
                implement data pipelines for ML model training. Lead scalable
                software systems development to deploy ML models into production
                systems, ensuring high performance and reliability.
              </Typography>
              <Typography>
                3. Data Engineering & Software Development: Architect and
                implement data pipelines for ML model training. Lead scalable
                software systems development to deploy ML models into production
                systems, ensuring high performance and reliability.
              </Typography>
              <Typography>
                4. Collaboration & Leadership: Effectively collaborate with
                cross-functional teams to deliver high-quality solutions on
                time. Guide team members in contributing to ML design
                discussions for new projects.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;