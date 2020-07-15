import { useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/store";

// Custom hook to fetch data, handle loading, and handle errors in global state
const useFetch = (url) => {
  const globalState = useContext(StoreContext);
  const { dispatch } = globalState;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOAD" });
      try {
        const res = await axios.get(url);
        dispatch({ type: "SET_FETCH", payload: res });
        dispatch({ type: "UNSET_LOAD" });
      } catch (err) {
        dispatch({ type: "SET_FETCH_FAIL", payload: err });
        dispatch({ type: "UNSET_LOAD" });
      }
    };

    fetchData();
  }, [url, dispatch]);
};

export default useFetch;