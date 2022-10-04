import fs from "fs";
import useQuery from "./useQuery";
import { LIVE_MATCHES } from "../graphql/queries";

export default function useMatches() {
  const { loading, error, data } = useQuery(LIVE_MATCHES);

  fs.writeFileSync("matches.json", JSON.stringify(data, null, 2));

  return {
    loading,
    error,
    data: data?.live?.matches,
  };
}
