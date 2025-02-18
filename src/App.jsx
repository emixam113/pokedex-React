import { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import NavBar from "./components/NavBar";

const typeTranslations = {
  normal: "Normal",
  fire: "Feu",
  water: "Eau",
  electric: "Électrik",
  grass: "Plante",
  ice: "Glace",
  fighting: "Combat",
  poison: "Poison",
  ground: "Sol",
  flying: "Vol",
  psychic: "Psy",
  bug: "Insecte",
  rock: "Roche",
  ghost: "Spectre",
  dragon: "Dragon",
  dark: "Ténèbres",
  steel: "Acier",
  fairy: "Fée",
};

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [season, setSeason] = useState("season1"); // "season1" ou "season2"

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const startId = season === "season1" ? 1 : 152;
        const limit = season === "season1" ? 151 : 100; 

        const pokemonList = await Promise.all(
          Array.from({ length: limit }, async (_, i) => {
            const id = startId + i;
            const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            // Fetch détails Pokémon
            const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const detailsData = await detailsResponse.json();

            // Fetch nom FR
            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const speciesData = await speciesResponse.json();
            const nameFr = speciesData.names.find((entry) => entry.language.name === "fr")?.name || detailsData.name;

            // Récupération des types en français
            const typeNames = detailsData.types.map((t) => typeTranslations[t.type.name] || t.type.name);

            return {
              id,
              name: nameFr,
              imgSrc,
              type: typeNames, 
            };
          })
        );

        setPokemonData(pokemonList);
        setPokemonIndex(0); // Remettre l'index à zéro
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      }
    }

    fetchPokemonData();
  }, [season]); 

  return (
    <div className="Text font-sans-serif">
      <NavBar
        pokemonIndex={pokemonIndex}
        setPokemonIndex={setPokemonIndex}
        pokemonList={pokemonData}
      />

      {/* Sélecteur de saison */}
      <div className="flex justify-center my-4">
        <label className="mr-2 font-bold">Choisir une saison :</label>
        <select
          className="border rounded p-2"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="season1">Saison 1 (1-151)</option>
          <option value="season2">Saison 2 (152-251)</option>
          <option value="season3">Saison 3 (252-386)</option>
          <option value="season4">Saison 4 (387-493)</option>
        </select>
      </div>

      {pokemonData.length > 0 && <PokemonCard pokemon={pokemonData[pokemonIndex]} />}
      {String(pokemonData[pokemonIndex]?.id || 0).padStart(3, "0")}
    </div>
  );
}

export default App;
