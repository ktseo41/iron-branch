import { useEffect, useRef } from "react";

export default function useCleanUp() {
  const mountedRef = useRef(true);
  useEffect(() => function cleanup() {
    mountedRef.current = false;
  }, []);
  return mountedRef;
}
