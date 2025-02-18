import PropTypes from "prop-types";
import PokemonType from "./PokemonType";

function PokemonCard({ pokemon }) {
  const getBackgroundColor = () => {
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
    return pokemon?.type?.[0] ? typeColors[pokemon.type[0]] || "#f5f5f5" : "#f5f5f5";
  };

  return (
    <figure
      className="pokemoncard"
      style={{
        backgroundColor: getBackgroundColor(),
        borderRadius: "20px",
        padding: "20px",
        textAlign: "center",
        maxWidth: "300px",
        margin: "auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="pokemon-image">
        {pokemon?.imgSrc ? <img src={pokemon.imgSrc} alt={pokemon.name} width="150" /> : <p>???</p>}
      </div>
      <div className="Name">
        <figcaption style={{ fontSize: "20px", fontWeight: "bold" }}>{pokemon?.name || "Inconnu"}</figcaption>
      </div>
      <div className="types" style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        {pokemon?.type?.map((t, index) => (
          <PokemonType key={index} type={t} />
        ))}
      </div>
    </figure>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PokemonCard;
