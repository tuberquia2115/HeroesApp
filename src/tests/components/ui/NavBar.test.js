import React from 'react';
import '@testing-library/jest-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { Navbar } from '../../../components/ui/NavBar';
import { mount } from 'enzyme';
import { types } from '../../../types/types';

describe('Pruebas en <NavBar/>', () => {

    const histotyMock = {
        push: jest.fn(),
        location: {},
        replace: jest.fn(),
        listen: jest.fn(),
        createHref: jest.fn()
    }
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: "Karen Dayana"
        }
    }
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={histotyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>

        </AuthContext.Provider>
    )

    afterEach(() => {
        jest.clearAllMocks()
    })
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Karen Dayana')
    })

    test('debe de llamar el logout y usar history', () => {
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        })

        expect(histotyMock.replace).toHaveBeenCalled()
        expect(histotyMock.replace).toHaveBeenCalledTimes(1);
        expect(histotyMock.replace).toHaveBeenCalledWith('/login')
    })


})
