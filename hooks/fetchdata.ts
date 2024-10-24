import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function fetchdata({ url }: any) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Optional loading state
  const [error, setError] = useState(null);     // Optional error state

  const getDataFromApi = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);  // Assuming the response is a list of products
      setLoading(false); // Stop loading once data is fetched

      // Store the data in AsyncStorage
      await AsyncStorage.setItem('surahData', JSON.stringify(json));
    } catch (err) {
      setError(err);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  const loadData = async () => {
    try {
      // Check if the data is already in AsyncStorage
      const storedData = await AsyncStorage.getItem('surahData');
      if (storedData) {
        setData(JSON.parse(storedData)); // Use the stored data
        setLoading(false);
      } else {
        // Fetch data from the API if not in storage
        getDataFromApi();
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [url]); // Ensure it runs when the URL changes

  return { data, loading, error }; // Return data, loading, and error state
}

export default fetchdata;
