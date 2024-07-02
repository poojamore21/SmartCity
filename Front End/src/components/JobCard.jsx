import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const JobCard = ({ jobs }) => {
  console.log(jobs);
  return (
    <div>
      <TableContainer component={Paper} className="mt-10">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr no</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Job Category</TableCell>
              <TableCell>Vacancies</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Company Email</TableCell>
              <TableCell>Address</TableCell> {/* New Column */}
              <TableCell>Created At</TableCell> {/* New Column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job,index) => (
              <TableRow key={job.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{job.companyName}</TableCell>
                <TableCell>{job.jobCategory}</TableCell>
                <TableCell>{job.vacancies}</TableCell>
                <TableCell>{job.contactNumber}</TableCell>
                <TableCell>{`${job.city}, ${job.state}`}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>{job.address}</TableCell> {/* New Column */}
                <TableCell>
                  {new Date(job.createdAt).toLocaleString()}
                </TableCell>{" "}
                {/* New Column */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default JobCard;
