const API_KEY = process.env.REACT_APP_YELP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_YELP_CLIENT_ID;

const search = async (term, location, sortBy) => {
    try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`
      , {"headers": {"Authorization": `Bearer ${API_KEY}`}});
    const data = await response.json();
    if (data.businesses) {
        return data
    }
  } catch (error) {
    console.log({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  search,
};
