import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import { images } from "../lib/Images";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/registration");
  };
  return (
    <div style={{ position: "relative" }}>
      <ImageCarousel images={images} />
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Welcome to Smart City
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Explore smart world with us !!!
          </p>
          <Button variant="contained" color="primary" onClick={goToRegister}>
            Get Started
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "700px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    textAlign: "center",
  },
  content: {
    maxWidth: "800px",
    padding: "2rem",
    color: "white",
  },
};

export default Homepage;
