import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const baseURL = `https://api.github.com`;

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    axios(baseURL + url, options)
      .then((res) => {
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setIsLoading(false);
      });
  }, [baseURL, isLoading, options, url]);

  return [{ isLoading, response, error }, doFetch] as const;
};

export default useFetch;
