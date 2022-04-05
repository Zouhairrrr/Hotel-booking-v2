import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ActivateAccount() {

    const navigate = useNavigate()
    const { token } = useParams()
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const activate = () => {
            axios.get(`http://localhost:8082/auth/activateAccount/${token}`)
                .then((response) => {
                    const msgSuccess = response.data.message
                    setSuccess(msgSuccess);
                    setUserId(response.data.data._id)
                    console.log(response.data.data._id);
                    if (!response.data.success) {
                        navigate('/auth/ForgotPassword')
                        return
                    }
                    setTimeout(() => { navigate('/auth/resetPassword', { state: setUserId() }) }, 2000)
                })
                .catch((error) => {
                    const msgerror = error.response.data.message
                    setErrors(msgerror);
                    setTimeout(() => { navigate('/') }, 2000)
                    setUserId("");
                })
        }
        activate()
    }, [])
    return (
        <>
            <div className="container">
                {errors && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <span className="alert-inner--text"><strong>Warning!</strong> {errors}!</span>
                </div>}

                {success && <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <span className="alert-inner--text"><strong>Success!</strong> {success} ! </span>
                </div>}
            </div>
        </>
    )
}

export default ActivateAccount;