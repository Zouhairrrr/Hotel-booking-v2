import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ActivateAccount() {


    console.log("eeeee")

    const ActivateAcount = () => {
        const navigate = useNavigate();
        const { token } = useParams()
        const [success, setSuccess] = useState("");
        const [errors, setErrors] = useState("");

        useEffect(() => {
            const activate = () => {
                try {
                    const response = axios.get(`http://localhost:8082/auth/activateAccount/${token}`)
                    console.log("eeeee")
                    setSuccess(response.data);
                    setErrors("")
                } catch (error) {
                    console.log(error.response);
                    setErrors(error.response)
                }
            }
            activate()
        })
        return (
            <>
                <div className="badge badge-success">
                    LOADING...jjjjjjjjjj
                </div>
            </>
        )
    }

}

export default ActivateAccount;