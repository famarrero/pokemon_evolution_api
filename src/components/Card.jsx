import '../sass/Card.scss'

const Card = ({ key, pokemonName, pokemonImage }) => {
    return (
        <div className="card">
            <div className="card__circle"></div>
            <p className="card__name">{pokemonName}</p>
            <img className="card__img" src={pokemonImage} alt="pokemon.jpg" />
        </div>
    )
}

export { Card }