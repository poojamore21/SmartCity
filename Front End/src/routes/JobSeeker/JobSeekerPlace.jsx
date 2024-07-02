import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import apiRequest from "../../lib/apiRequest";
import { useParams } from "react-router-dom";
import JobCard from "../../components/JobCard";

const JobSeekerPlace = () => {
  const { state, city, category } = useParams();

  console.log(state, city, category);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiRequest.get("/job/category", {
          params: { category: category, city: city, state: state },
        });
        if (response.status === 200) {
          setJobs(response.data);
        } else {
          console.error("Failed to fetch jobs:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error.message);
      }
    };

    fetchJobs();
  }, []);

  return <JobCard jobs={jobs} />;
};

export default JobSeekerPlace;
