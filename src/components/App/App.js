import React, { useState } from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import axios from 'axios'

const App = () => {
  const API = process.env.REACT_APP_BACKEND_API;
  const [location, setLocation] = useState("");
  const [term, setTerm] = useState("");
  const [sortBy, setSortBy] = useState("best_match");
  const [businesses, setBusinesses] = useState([]);

  function handleSortByChange(sortByOption) {
    setSortBy(sortByOption);
  }

  function handleTermChange(e) {
    setTerm(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  const timeToEat = async (term, location, sortBy) => {
    try {
      const response = await axios.get(
        `${API}/search?term=${term}&location=${location}&sort_by=${sortBy}`
      );
      const data = await response.json();
      console.log(data);
      setBusinesses(data.businesses);
      console.log(businesses)
    } catch (error) {
      console.log({
        success: false,
        error: error.message,
      });
    }
  };


  return (
    <div className="App">
      <h1>yum</h1>
      <SearchBar
        handleTermChange={handleTermChange}
        handleLocationChange={handleLocationChange}
        handleSortByChange={handleSortByChange}
        term={term}
        location={location}
        sortBy={sortBy}
        setBusinesses={setBusinesses}
        timeToEat={timeToEat}
      />
      <BusinessList businesses={businesses} />
    </div>
  );
};

export default App;
