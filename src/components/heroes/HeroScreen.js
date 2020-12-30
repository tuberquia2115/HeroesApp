import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';
export const HeroScreen = ({ history }) => {
    const { heroId } = useParams();
    let hero = useMemo(() => getHeroById(heroId), [heroId])
    console.log(hero)
    if (!hero[0]) {
        return <Redirect to="/" />
    }

    const handlenReturn = () => {
        if (history.length <= 2) {
            history.push('/')
        } else {
            history.goBack()
        }
    }
    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero[0];
    return (
        <div className="row mt-5">
            <hr />
            <div className="col-4">
                <img src={"https://img.pngio.com/iron-man-edwin-jarvis-hulk-falcon-marvel-heroes-2016-cc0-marvel-heroes-png-600_750.jpg"} className="img-thumbnail animate__animated animate__fadeInLeft" alt={superhero} />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3 className>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b>{alter_ego} </li>
                    <li className="list-group-item"> <b> Publisher: </b>{publisher} </li>
                    <li className="list-group-item"> <b> First appearance: </b>{first_appearance} </li>
                </ul>
                <h5>Characters</h5>
                <p>{characters}</p>
                <button
                    onClick={handlenReturn}
                    className="btn btn-outline-info">
                    Return
                </button>
            </div>
        </div>
    )
}