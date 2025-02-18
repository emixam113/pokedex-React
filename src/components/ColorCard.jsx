import PropTypes from "prop-types";

const typeColors = {
  Normal: "#A8A77A",
  Feu: "#EE8130",
  Eau: "#6390F0",
  Electrik: "#F7D02C",
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

function ColorCard({ type, children }) {
  const backgroundColor = typeColors[type] || "#777"; // Couleur par défaut si type inconnu

  return (
    <div
      className="border-2 rounded-lg p-4 shadow-lg"
      style={{
        backgroundColor,
        color: "white", // Améliore la lisibilité
        textAlign: "center",
        minHeight: "100px", // Évite que la carte soit trop petite
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

ColorCard.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ColorCard;
