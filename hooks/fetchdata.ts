import { useState, useEffect } from 'react';

function fetchdata({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDataFromApi = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json); // Set the entire response
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((err) => {
        setError(err);
        setLoading(false); // Stop loading if an error occurs
      });
  };

  useEffect(() => {
    getDataFromApi(); // Fetch data when the component mounts or when the URL changes
  }, [url]);

  return { data, loading, error }; // Return the data, loading, and error states
}

export default fetchdata;
