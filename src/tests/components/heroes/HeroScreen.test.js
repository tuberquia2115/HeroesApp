import React from 'react'
import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom'
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen/>', () => {

    const historyMock = {
        push: jest.fn(),
        length: 10,
        goBack: jest.fn()
    }

    afterEach(() => {
        jest.clearAllMocks()
    })
    test('debe de mostrar el componente redirect si no hau argumentos en el URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen
                    history={historyMock}
                />
            </MemoryRouter>
        )
        expect(wrapper.find('Redirect').exists()).toBe(true)
    })
    test('debe de mostrar un hero si el paràmentro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={HeroScreen} />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('img').exists()).toBe(true);
    })

    test('debe de regresar a la pantalla anterior history.push', () => {
        const historyMock = {
            push: jest.fn(),
            length: 1,
            goBack: jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={() => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();
        expect(historyMock.push).toHaveBeenCalled();
        expect(historyMock.goBack).not.toHaveBeenCalled();
        expect(historyMock.push).toHaveBeenCalledTimes(1)
        expect(historyMock.push).toHaveBeenCalledWith('/')
    })

    test('debe de regresar a la pantalla anterior llamar history.goBack', () => {
        const historyMock = {
            push: jest.fn(),
            length: 4,
            goBack: jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={() => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();
        expect(historyMock.goBack).toHaveBeenCalled();
        expect(historyMock.push).not.toHaveBeenCalled();
        expect(historyMock.goBack).toHaveBeenCalledTimes(1)
    })


    test('debe de llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider12123']}>
                <Route path="/hero/:heroId" component={() => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        )
        expect(wrapper.text()).toBe('');

    })



})
