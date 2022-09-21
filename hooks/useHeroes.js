"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { getHeroes } = require("../lib/apis");

module.exports = () => {
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
