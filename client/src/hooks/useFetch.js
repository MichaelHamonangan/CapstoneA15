import { useState, useEffect } from "react";
import axios from "axios";
// Import necessary modules

const useFetch = (url, searchTerm) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          try {
              const params = searchTerm ? { search: searchTerm } : {};
              const res = await axios.get(url, { params });
              setData(res.data);
          } catch (err) {
              setError(err);
          }
          setLoading(false);
      };
      fetchData();
  }, [url, searchTerm]);

  const reFetch = async () => {
      setLoading(true);
      try {
          const params = searchTerm ? { search: searchTerm } : {};
          const res = await axios.get(url, { params });
          setData(res.data);
      } catch (err) {
          setError(err);
      }
      setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
