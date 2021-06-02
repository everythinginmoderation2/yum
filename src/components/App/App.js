import React, { useState } from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";

// const business = {
//   imageSrc: 'https://content.codecademy.com/programs/react/ravenous/pizza.jpg',
//   name: 'MarginOtto Pizzeria',
//   address: '1010 Paddington Way',
//   city: 'Flavortown',
//   state: 'NY',
//   zipCode: '10101',
//   category: 'Italian',
//   rating: 4.5,
//   reviewCount: 90
// }

// const buinesses = [business, business, business, business, business, business]

const App = () => {
  const API_KEY = process.env.REACT_APP_YELP_API_KEY;
  // const CLIENT_ID = process.env.REACT_APP_YELP_CLIENT_ID;
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

//   const timeToEat = (term, location, sortBy) => {
//     return fetch(
//       `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
//       { headers: { Authorization: `Bearer ${API_KEY}` } },
//     ).then((response) => {
//       return response.json()
//     }).then((jsonResponse) => {
//       if (jsonResponse.businesses){
//         setBusinesses(jsonResponse.businesses)
//       }
//     })
// };

  // function searchYelp(term, location, sortBy) {
  //   console.log(`Searching Yelp with ${term}, ${location}, ${sortBy} 👌`);
  //   console.log(businesses);
  //   timeToEat(term, location, sortBy);
  // }

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
