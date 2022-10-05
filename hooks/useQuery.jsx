import { useCallback, useEffect, useState } from "react";
import useCleanUp from "./useCleanUp";
import client from "../graphql/client";

export default function useQuery(_query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const mountedRef = useCleanUp();
  const query = useCallback(() => {
    if (mountedRef.current) {
      setLoading(true);
    } else {
      return;
    }
    client.request(_query).then((d) => {
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
  }, [_query, setData, setError, setLoading]);

  useEffect(() => {
    client.request(_query).then((d) => {
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
  }, [_query]);

  return {
    loading,
    error,
    data,
    setData,
    query,
  };
}
