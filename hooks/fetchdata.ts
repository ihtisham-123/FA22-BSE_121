import { useState, useEffect } from 'react';

function fetchdata({ url }:any) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Optional loading state
  const [error, setError] = useState(null);     // Optional error state

  const getDataFromApi = () => {
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        setData(json);  // Assuming the response is a list of products
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(error => {
        setError(error);
        setLoading(false); // Stop loading even if there's an error
      });
  };

  useEffect(() => {
    getDataFromApi();
  }, [url]); // Ensure it runs when the URL changes

  return { data, loading, error }; // Return data, loading, and error state
}

export default fetchdata;
