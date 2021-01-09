import React from 'react'
import { shallow } from 'enzyme'
import '@testing-library/jest-dom';
import { HeroCard } from '../../../components/heroes/HeroCard';

describe('Pruebas en <HeroCard/>', () => {

    const wrapper = shallow(
        <HeroCard
            id={'dc-batman'}
            superhero={'Batman'}
            alter_ego={'Bruce Wayne'}
            first_appearance={'Detective Comics #27'}
            characters={'Bruce Wayne'}
        />
    )
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

})
