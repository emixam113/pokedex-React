import PropTypes from 'prop-types';
function NavBar({pokemonIndex,setPokemonIndex, pokemonList}){

    const handleClick = (event) => {
  
        event.target.textContent === 'Précédent' ? setPokemonIndex(pokemonIndex-1): setPokemonIndex(pokemonIndex+1);
         }
    return(
        <div className= "Navbar">
            {pokemonIndex > 0 ? <button onClick = {handleClick}>Précédent</button> : <button onClick = {handleClick} disabled>Précédent</button>}
            {pokemonIndex < pokemonList.length-1 ? <button onClick = {handleClick}>Suivant</button>: <button onClick = {handleClick} disabled >Suivant</button>}      
      </div>
    )
}

export default NavBar

NavBar.propTypes ={
    pokemonIndex: PropTypes.number.isRequired,
    setPokemonIndex: PropTypes.func.isRequired,
    pokemonList: PropTypes.array.isRequired
}