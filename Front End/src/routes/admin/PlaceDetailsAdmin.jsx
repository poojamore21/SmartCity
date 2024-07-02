import * as React from "react";
import { useState, useEffect } from "react";
import { tableCellClasses } from "@mui/material/TableCell";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import apiRequest from "../../lib/apiRequest";
import { indiaStates } from "../../lib/DummyData";
import UploadWidget from "../../components/UploadWidget";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "green",
    color: theme.palette.common.white,
    textAlign: "center",
    border: "1px solid rgba(224, 224, 224, 1)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid black",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const initialValues = {
  category: "",
  placeName: "",
  state: "",
  city: "",
  address: "",
  description: "",
  photos: [],
};

const categories = ["ATM", "Hospital", "Hotels", "TouristPlace", "hotel"];

function PlaceDetailsAdmin() {
  const [place, setPlace] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(initialValues);
  const [editImages, setEditImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest.get("/place");
        const data = response.data;
        if (Array.isArray(data)) {
          setPlace(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiRequest.delete(`/place/${id}`);
      setPlace((prevPlace) => prevPlace.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  const handleEditOpen = (place) => {
    setEditData(place);
    setEditImages(place.photos || []);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditData(initialValues);
    setEditImages([]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(editData).some((value) => value === "")) {
        toast.error("Please fill in all fields");
        return;
      }

      await apiRequest.put(`/place/${editData.id}`, {
        ...editData,
        photos: editImages,
      });

      setPlace((prevPlace) =>
        prevPlace.map((item) => (item.id === editData.id ? editData : item))
      );

      toast.success("Place updated successfully!");
      handleEditClose();
    } catch (error) {
      console.error("Error updating place:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "50px" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr No</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell align="center">Place</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">State</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {place
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.category}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.placeName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.city}</StyledTableCell>
                  <StyledTableCell align="center">{row.state}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditOpen(row)}
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={place.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Place</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit} style={{ width: "500px" }}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                name="category"
                id="category"
                variant="outlined"
                fullWidth
                value={editData.category}
                onChange={handleEditChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="placeName"
              label="Place Name"
              variant="outlined"
              fullWidth
              value={editData.placeName}
              onChange={handleEditChange}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="state">State</InputLabel>
              <Select
                name="state"
                id="state"
                variant="outlined"
                fullWidth
                value={editData.state}
                onChange={(e) => {
                  handleEditChange(e);
                  setEditData((prevData) => ({
                    ...prevData,
                    city: "",
                  }));
                }}
              >
                {Object.keys(indiaStates).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="city">City</InputLabel>
              <Select
                name="city"
                id="city"
                variant="outlined"
                fullWidth
                value={editData.city}
                onChange={handleEditChange}
              >
                {editData.state &&
                  indiaStates[editData.state]?.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              value={editData.address}
              onChange={handleEditChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={editData.description}
              onChange={handleEditChange}
              sx={{ marginBottom: 2 }}
            />
            <div>
              <div className="grid grid-cols-4 gap-4">
                {editImages.map((image, index) => (
                  <img src={image} key={index} alt="" className="h-28 w-24" />
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <p>Upload Photos</p>
              <UploadWidget
                uwConfig={{
                  multiple: true,
                  cloudName: "dj6qf1phv",
                  uploadPreset: "yogesh-real-state",
                  folder: "avatars",
                }}
                setState={setEditImages}
              />
            </div>
            <DialogActions>
              <Button onClick={handleEditClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default PlaceDetailsAdmin;
