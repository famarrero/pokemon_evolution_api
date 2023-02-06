//Components
import { Button } from "./components/Button";
import { Card } from "./components/Card";
//Styles
import './sass/App.scss'
//Icons
import { TiArrowLeftOutline, TiArrowRightOutline } from 'react-icons/ti';
//Hooks
import { useEffect, useState } from "react";

const App = () => {

    const [pokemonId, setPokemonId] = useState(60);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

    useEffect(() => {
        getEvolutions(pokemonId);
    }, [pokemonId]);

    async function getEvolutions(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
        const data = await response.json();

        let pokemonEvolutionsArray = [];

        let pokemonLevel1Name = data.chain.species.name;
        let pokemonLevel1Img = await getPokemonImg(pokemonLevel1Name);
        pokemonEvolutionsArray.push([pokemonLevel1Name, pokemonLevel1Img]);


        if (data.chain.evolves_to.length !== 0) {
            let pokemonLevel2Name = data.chain.evolves_to[0].species.name;
            let pokemonLevel2Img = await getPokemonImg(pokemonLevel2Name);
            pokemonEvolutionsArray.push([pokemonLevel2Name, pokemonLevel2Img]);


            if (data.chain.evolves_to[0].evolves_to.length !== 0) {
                let pokemonLevel3Name = data.chain.evolves_to[0].evolves_to[0].species.name;
                let pokemonLevel3Img = await getPokemonImg(pokemonLevel3Name);
                pokemonEvolutionsArray.push([pokemonLevel3Name, pokemonLevel3Img]);
                setPokemonEvolutions(pokemonEvolutionsArray);
            }
        }
        setPokemonEvolutions(pokemonEvolutionsArray);
    }

    async function getPokemonImg(name) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const data = await response.json();
        return data.sprites.other['official-artwork'].front_default;
    }

    const previousClick = () => {
        pokemonId === 1 ? null : setPokemonId(pokemonId - 1)
    }

    const nextClick = () => {
        setPokemonId(pokemonId + 1)
    }

    return (
        <>
            <div className="app">
                <div className={`card-container card${pokemonEvolutions.length}`}>
                    {pokemonEvolutions.map(pokemon =>
                        <Card
                            key={pokemon[0]}
                            pokemonName={pokemon[0]}
                            pokemonImage={pokemon[1]}
                        />
                    )}
                </div>

                <div className="button-container">
                    <Button
                        icon={<TiArrowLeftOutline />}
                        onPressed={previousClick}
                    />
                    <Button
                        icon={<TiArrowRightOutline />}
                        onPressed={nextClick}
                    />
                </div>

            </div>

        </>
    );
}

export { App }