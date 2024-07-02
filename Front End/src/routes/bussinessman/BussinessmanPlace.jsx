import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceCard from "../../components/PlaceCard";
import apiRequest from "../../lib/apiRequest";
import { CircularProgress, Typography } from "@mui/material";

function BussinessmanPlace() {
  const { state, city, category } = useParams();

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest.get("/place", {
          params: { category: category, city: city, state: state },
        });
        const data = response.data;
        console.log("place data from place deatils", data);
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };
    fetchData();
  }, [category, city, state]);

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={styles.loading}>
          <CircularProgress />
          <Typography variant="h5" style={styles.loadingText}>
            Loading...
          </Typography>
        </div>
      ) : places.length === 0 ? (
        <Typography variant="h5" style={styles.noPlaces}>
          No places found for the selected criteria.
        </Typography>
      ) : (
        places.map((place, index) => (
          <div key={index} style={styles.placeCardContainer}>
            <PlaceCard place={place} />
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
  },
  loadingText: {
    marginLeft: "10px",
  },
  noPlaces: {
    textAlign: "center",
    marginTop: "50px",
  },
  placeCardContainer: {
    marginBottom: "20px",
  },
};

export default BussinessmanPlace;
