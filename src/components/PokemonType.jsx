import PropTypes from "prop-types";

// Dictionnaire des couleurs par type en français
const typeColors = {
  Normal: "#A8A77A",
  Feu: "#EE8130",
  Eau: "#6390F0",
  Électrik: "#F7D02C",
  Plante: "#7AC74C",
  Glace: "#96D9D6",
  Combat: "#C22E28",
  Poison: "#A33EA1",
  Sol: "#E2BF65",
  Vol: "#A98FF3",
  Psy: "#F95587",
  Insecte: "#A6B91A",
  Roche: "#B6A136",
  Spectre: "#735797",
  Dragon: "#6F35FC",
  Ténèbres: "#705746",
  Acier: "#B7B7CE",
  Fée: "#D685AD",
};

// Composant Type Pokémon
function PokemonType({ type }) {
  const backgroundColor = typeColors[type] || "#777"; // Couleur par défaut si non trouvée

  return (
    <div
      className="pokemon-type px-3 py-1 rounded-full text-white text-sm font-bold shadow-md"
      style={{
        backgroundColor,
        minWidth: "60px", // Évite que le texte soit trop compact
        textAlign: "center",
      }}
    >
      {type}
    </div>
  );
}

PokemonType.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PokemonType;
