import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";
import dotenv from "dotenv";
import useCleanUp from "./useCleanUp";

dotenv.config();

const client = new GraphQLClient("https://api.stratz.com/graphql", {
  headers: {
    Authorization: `Bearer ${process.env.STRATZ_API_TOKEN}`,
  },
});

export default function useQuery(query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const mountedRef = useCleanUp();

  useEffect(() => {
    client.request(query).then((d) => {
      if (mountedRef.current) {
        setData(d);
        setLoading(false);
      }
    }).catch((e) => {
      if (mountedRef.current) {
        setError(e);
        setLoading(false);
      }
    });
  }, [query]);

  return {
    loading,
    error,
    data,
  };
}
