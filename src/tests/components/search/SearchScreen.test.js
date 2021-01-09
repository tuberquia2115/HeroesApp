import React from 'react'
import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <SearchScreen/>', () => {

    const historyMock = {
        push: jest.fn(),
        location: {
            search: ''
        }
    }
    const wrapper = mount(
        <MemoryRouter initialEntries={['/search']}>
            <Route path="/search" component={() => <SearchScreen history={historyMock} />} />
        </MemoryRouter>
    )


    afterEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrase correctamente con valores por defecto', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero')
    })

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper.find('input').prop('value').trim()).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar el componente de error si no existe en hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman1224']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper.find('.alert-danger').text().trim()).toBe('there is not a hero with batman1224')
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de llamar handlenSubmit()', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={() => <SearchScreen history={historyMock} />} />
            </MemoryRouter>
        )
        const value = 'batman';
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText', value
            }
        })

        wrapper.find('form').prop('onSubmit')({ preventDefault() { } })

        expect(historyMock.push).toHaveBeenCalledWith(`?q=${value}`)

    })


})
