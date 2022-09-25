import { useEffect, useState } from "react";
import { getHeroes } from "../lib/apis";

export default () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetchHeroes();

    async function fetchHeroes() {
      const { heroes } = (await getHeroes()) || {};

      if (!heroes) return console.error("No heroes found");

      setHeroes(heroes);
    }
  }, []);

  return heroes;
};
