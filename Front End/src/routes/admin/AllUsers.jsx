import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiRequest.get("/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (username) => {
    try {
      await apiRequest.delete(`/user/${username}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.username !== username)
      );
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const tableCellStyle = { borderRight: "1px solid rgba(224, 224, 224, 1)" };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={tableCellStyle}>Sr. No</TableCell>
            <TableCell style={tableCellStyle}>Name</TableCell>
            <TableCell style={tableCellStyle}>Email</TableCell>
            <TableCell style={tableCellStyle}>Username</TableCell>
            <TableCell style={tableCellStyle}>Role</TableCell>
            <TableCell style={tableCellStyle}>Phone No</TableCell>
            <TableCell style={tableCellStyle}>Created At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell style={tableCellStyle}>{index + 1}</TableCell>
              <TableCell style={tableCellStyle}>{user.name}</TableCell>
              <TableCell style={tableCellStyle}>{user.email}</TableCell>
              <TableCell style={tableCellStyle}>{user.username}</TableCell>
              <TableCell style={tableCellStyle}>{user.role}</TableCell>
              <TableCell style={tableCellStyle}>{user.phoneno}</TableCell>
              <TableCell style={tableCellStyle}>
                {new Date(user.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteUser(user.username)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
