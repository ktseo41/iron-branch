import { useEffect, useState } from "react";
import { getHeroes } from "../lib/apis";

export default () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    async function fetchHeroes() {
      const { heroes: fetchedHeroes } = (await getHeroes()) || {};

      if (!fetchedHeroes) return console.error("No heroes found");

      setHeroes(fetchedHeroes);
    }
    fetchHeroes();
  }, []);

  return heroes;
};
