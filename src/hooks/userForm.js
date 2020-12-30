import { useState } from 'react';



const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState)
    }

    const handlenInputChange = ({ target }) => {

        setValues({
            ...values, [target.name]: target.value
        })
    }

    return [values, handlenInputChange, reset];
}

export default useForm;