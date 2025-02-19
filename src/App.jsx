import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import ColorCard from "./components/ColorCard";
import NavBar from "./components/NavBar";
import "./App.css";

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

// Définition des saisons et leurs plages d'IDs
const seasonRanges = {
  season1: { startId: 1, limit: 151 },
  season2: { startId: 152, limit: 100 },
  season3: { startId: 252, limit: 134 },
  season4: { startId: 386, limit: 107 },
  season5: { startId: 494, limit: 156 },
  season6: { startId: 650, limit: 72 },
  season7: { startId: 722, limit: 88 },
  season8: { startId: 810, limit: 96 },
  season9: { startId: 906, limit: 112 },
};

async function fetchPokemon(id) {
  try {
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const [detailsResponse, speciesResponse] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    if (!detailsResponse.ok || !speciesResponse.ok) {
      throw new Error("Échec du chargement des données Pokémon");
    }

    const detailsData = await detailsResponse.json();
    const speciesData = await speciesResponse.json();

    const nameFr =
      speciesData.names.find((entry) => entry.language.name === "fr")?.name ||
      detailsData.name;
    const typeNames = detailsData.types.map(
      (t) => typeTranslations[t.type.name] || t.type.name
    );

    return { id, name: nameFr, imgSrc, type: typeNames };
  } catch (error) {
    console.error(`Erreur lors de la récupération du Pokémon ${id} :`, error);
    return null;
  }
}

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [season, setSeason] = useState("season1");

  useEffect(() => {
    let isMounted = true;

    async function fetchSeasonPokemon() {
      try {
        const { startId, limit } = seasonRanges[season];
        const promises = Array.from({ length: limit }, (_, i) =>
          fetchPokemon(startId + i)
        );
        const results = await Promise.all(promises);
        if (isMounted) {
          setPokemonData(results.filter(Boolean)); // Filtre les erreurs éventuelles
          setPokemonIndex(0);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la saison :", error);
      }
    }

    fetchSeasonPokemon();
    return () => {
      isMounted = false;
    };
  }, [season]);

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Barre de navigation */}
      <NavBar 
        pokemonIndex={pokemonIndex} 
        setPokemonIndex={setPokemonIndex} 
        pokemonList={pokemonData} 
      />

      {/* Sélecteur de saison dynamique */}
      <div className="flex justify-center my-4">
        <label className="mr-2 font-bold text-gray-700">Choisir une saison :</label>
        <select
          className="border rounded p-2 bg-white shadow-md hover:bg-gray-50 cursor-pointer"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          {Object.entries(seasonRanges).map(([key, { startId, limit }]) => (
            <option key={key} value={key}>
              {`Saison ${key.replace("season", "")} (${startId}-${startId + limit - 1})`}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage du Pokémon */}
      {pokemonData.length > 0 && (
        <div className="flex flex-col items-center">
          <PokemonCard pokemon={pokemonData[pokemonIndex]} />
          <p className="text-lg font-semibold mt-2">
            {String(pokemonData[pokemonIndex]?.id).padStart(3, "0")}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
