import PropTypes from "prop-types";
import { useState } from "react";

function NavBar({ pokemonIndex, setPokemonIndex, pokemonList }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Gestion de la recherche
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const foundIndex = pokemonList.findIndex((pokemon) =>
      pokemon.name.toLowerCase().includes(term)
    );

    if (foundIndex !== -1) {
      setPokemonIndex(foundIndex);
    }
  };

  return (
    <div className="Navbar flex flex-col items-center p-4 bg-blue-500 shadow-md">
      {/* Boutons de navigation */}
      <div className="flex space-x-4 mb-3">
        <button
          onClick={() => setPokemonIndex(pokemonIndex - 1)}
          disabled={pokemonIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            pokemonIndex === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white text-blue-500 hover:bg-gray-100"
          }`}
        >
          Précédent
        </button>
        <span className="text-white font-bold">
          {pokemonIndex + 1} / {pokemonList.length}
        </span>
        <button
          onClick={() => setPokemonIndex(pokemonIndex + 1)}
          disabled={pokemonIndex >= pokemonList.length - 1}
          className={`px-4 py-2 rounded-lg ${
            pokemonIndex >= pokemonList.length - 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white text-blue-500 hover:bg-gray-100"
          }`}
        >
          Suivant
        </button>
      </div>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 w-64 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
}

NavBar.propTypes = {
  pokemonIndex: PropTypes.number.isRequired,
  setPokemonIndex: PropTypes.func.isRequired,
  pokemonList: PropTypes.array.isRequired,
};

export default NavBar;
