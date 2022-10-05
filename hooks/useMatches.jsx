import useQuery from "./useQuery";
import { LIVE_MATCHES } from "../graphql/queries";

export default function useMatches() {
  const { loading, error, data } = useQuery(LIVE_MATCHES);

  return {
    loading,
    error,
    matches: data?.live?.matches,
  };
}
