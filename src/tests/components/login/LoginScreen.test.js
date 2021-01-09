import React from 'react'
import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen/>', () => {
    const contextValue = {
        dispatch: jest.fn()
    }

    const historyMock = {
        replace: jest.fn()
    }

    
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={historyMock} />
        </AuthContext.Provider>
    )

    afterEach(() => {
        jest.clearAllMocks()
    })
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe de realizar el dispatch y la navegacion', () => {
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick()

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Jose Manuel Tuberquia'
            }
        })

        expect(historyMock.replace).toHaveBeenCalledWith('/')

        localStorage.setItem('lastPath', '/dc');

        handleClick();
        
        expect(historyMock.replace).toHaveBeenCalledWith('/dc');
    })

    

})
