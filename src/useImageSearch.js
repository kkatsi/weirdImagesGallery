import { useEffect, useState } from "react";
import axios from "axios";

export default function useImageSearch(pageNumber) {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setError(false);
    axios({
      method: "GET",
      url: "https://api.unsplash.com/search/photos",
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
        page: pageNumber,
        query: "weird strange",
        per_page: 20
      }
    })
      .then(res => {
        setData(prevData => {
          return [...new Set([...prevData, ...res.data.results])];
        });
        setHasMore(res.data.results.length > 0);
      })
      .catch(e => {
        setError(true);
      });
  }, [pageNumber]);

  return { error, data, hasMore };
}
