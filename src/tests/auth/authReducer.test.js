import '@testing-library/jest-dom';
import { authReducer } from '../../auth/authReducer';
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {
    const stateInitial = {
        logged: true,

    }

    test('debe de retornar el estado por defecto', async () => {
        const state = authReducer(stateInitial, {});
        expect(state).toEqual(stateInitial);
    })

    test('debe de auntenticar y colocar el name del suaurio', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'nombre de prueba',
                logged: true,
            }
        }
        const state = authReducer(stateInitial, action);
       
        expect(state.logged).toBe(true);
        expect(state.name).toBe('nombre de prueba');
    })

    test('debe de borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout,
        }
        const state = authReducer(stateInitial, action);
        expect(state.logged).toBe(false);
       
    })



})
