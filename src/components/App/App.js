import React, { useState } from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";

const App = () => {
  const API_KEY = process.env.REACT_APP_YELP_API_KEY;
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
      const response = await fetch(
        `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        { headers: { Authorization: `Bearer ${API_KEY}` } },
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
