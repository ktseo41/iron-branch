import { useEffect, useRef } from "react";
import { TICK_RATE } from "../constants";
import useQuery from "./useQuery";
import useCleanUp from "./useCleanUp";
import { LIVE_MATCHES } from "../graphql/queries";

/**
 * @typedef {Object} Cache
 * @property {Number} time
 * @property {Array} matches
 */
const cache = {};

function getCache() {
  if (!cache.time) return null;

  const now = Date.now();
  const lastCacheTime = cache.time;
  const diff = now - lastCacheTime;

  if (diff >= TICK_RATE) return null;

  return cache.matches;
}

function setCache(matches) {
  cache.time = Date.now();
  cache.matches = matches;
}

export default function useLiveMatches() {
  const {
    loading, error, data, setData, query,
  } = useQuery(LIVE_MATCHES);
  const intervalId = useRef(null);
  const mountedRef = useCleanUp();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (!mountedRef.current) {
        clearInterval(intervalId.current);
        return;
      }

      const cacheMatches = getCache();

      if (cacheMatches) {
        setData({ live: { matches: cacheMatches }, cached: true });
        return;
      }

      query();
    }, TICK_RATE);
  }, []);

  useEffect(() => {
    if (!mountedRef.current || !data || data.cached) {
      return;
    }

    setCache(data?.live?.matches);
  }, [data]);

  return { loading, error, matches: data?.live?.matches };
}
