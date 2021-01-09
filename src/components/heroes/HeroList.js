import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard'


export const HeroList = ({ publisher }) => {
    let heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])
    return (
        <div className="row align-items-start animate__animated animate__fadeIn">
            {heroes.map((hero) => (
                <HeroCard key={hero.id} {...hero}/>
            ))}

        </div>

    )
}