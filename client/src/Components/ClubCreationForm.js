import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../istockphoto-1419766496-170667a.webp"; 

const ClubCreationForm = () => {
  const [clubName, setClubName] = useState("");
  const [genre, setGenre] = useState("");

  const handleClubNameChange = (e) => {
    setClubName(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://flickfeeds-602d4f3e68d7.herokuapp.com/create_club",
        {
          club_name: clubName,
          genre: genre,
          owner_id: 1,
        }
      );

      if (response.status === 201) {
        toast.success("Club created successfully!", {
          autoClose: 3000,
        });

        setClubName("");
        setGenre("");
      } else {
        toast.error("Club creation failed.");
      }
    } catch (error) {
      console.error("Error creating club:", error);
      toast.error("Club creation failed.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url(${backgroundImage}) center/cover no-repeat fixed`, // Background image
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          width: "50%",
          padding: "20px",
          borderRadius: "10px",
          color: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          background: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "lightblue" }}>
          Create  Club
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="clubName" style={{ color: "lightblue" }}>Club Name:</label>
            <input
              type="text"
              id="clubName"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid white",
                borderRadius: "5px",
                marginBottom: "10px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
              value={clubName}
              onChange={handleClubNameChange}
            />
          </div>
          <div>
            <label htmlFor="genre" style={{ color: "lightblue" }}>Genre:</label>
            <input
              type="text"
              id="genre"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid white",
                borderRadius: "5px",
                marginBottom: "10px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
              value={genre}
              onChange={handleGenreChange}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "lightblue",
              color: "black",
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Create Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClubCreationForm;
