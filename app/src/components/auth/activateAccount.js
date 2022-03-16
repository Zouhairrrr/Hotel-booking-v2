import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default ActivateAcount = async (id, token) => {

    // let { id, token } = useParams()

    const response = await axios.get(`http://localhost:8082/auth/activate/:${id}/:${token}`, {
        params: {
            id: setId(response.params.id),
            token: setToken(response.params.token)
        }
    })

}