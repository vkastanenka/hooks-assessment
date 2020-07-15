import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch data, handle loading, and handle errors
const useFetch = (url) => {
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setRes(res);
        setLoading(false)
      } catch (err) {
        setError(err);
        setLoading(false)
      }
    };

    fetchData();
  }, [url]);

  return { res, error, loading };
};

export default useFetch;