import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/movie/";

const AUTH_KEY = process.env.EXPO_PUBLIC_TMDB_AUTH_KEY;

type RestApiType = {
  endpoint: string;
  method: string;
  pageNumber?: number | null;
};

const useApi = ({
  endpoint = "",
  method = "GET",
  pageNumber = null,
}: RestApiType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = useCallback(async () => {
    try {
      if (pageNumber === 1) setLoading(true);

      const options = {
        method: "GET",
        url: `${BASE_URL}${endpoint}`,
        params: {
          language: "en-US",
          ...(pageNumber ? { page: pageNumber } : {}),
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_KEY}`,
        },
      };
      const response = await axios.request(options);

      if (response.data) {
        if (pageNumber && pageNumber > 1 && data) {
          // Pagination for new data
          const newData = response.data;
          newData.results = [...data?.results, ...response?.data?.results];
          setData(newData);
        } else {
          setData(response.data);
        }
      }

      if (pageNumber === 1) setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }, [pageNumber, endpoint, method]);

  useEffect(() => {
    fetchApi();
  }, [pageNumber, endpoint, method]);

  return { data, error, loading, fetchApi };
};

export default useApi;
