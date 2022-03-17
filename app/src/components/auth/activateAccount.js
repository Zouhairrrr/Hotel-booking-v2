import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ActivateAcount = async () => {
    const navigate = useNavigate();
    const { token } = useParams()
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState("");
 
    useEffect(() => {
        const activate = async () => {
            if (token) console.log("token is provideddd")

            try {
                const response = await axios.get(`http://localhost:8082/auth/activateAccount/${token}`)
                console.log(response);
                setSuccess(response.data.message);
                setErrors("")
                // navigate('/auth/resetPassword');
            } catch (error) {
                console.log(error.response.data.message);
                setSuccess("")
                setErrors(error.response.data.message)
            }
        }
        activate()
    }, [token])


    return (
        <>
            LOADING...
        </>
    )
}

export default ActivateAcount;