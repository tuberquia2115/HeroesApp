import React from 'react'
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter/>', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe de mostrar login si no està autenticado', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>

                <AppRouter />
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostyrar el componente marvel si esta autenticado', () => {
        const contextValueData = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: "Jose Manuel"
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValueData}>
                <AppRouter />
            </AuthContext.Provider>
        )
        expect(wrapper.find('.navbar').exists()).toBe(true)
    })

})
