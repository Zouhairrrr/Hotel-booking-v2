import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ActivateAccount() {
    const navigate = useNavigate();
    const { token } = useParams()
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState("");

    useEffect(() => {
        const activate = () => {
            axios.get(`http://localhost:8082/auth/activateAccount/${token}`)
                .then((response) => {
                    const user = response.data.message
                    setSuccess(user);
                    if (!response.data.success) {
                        navigate('/auth/ForgotPassword')
                        return
                    }
                    setTimeout(() => { navigate('/auth/resetPassword') }, 2000)
                })
                .catch((error) => {
                    const user = error.response.data.message
                    setErrors(user);
                    setTimeout(() => { navigate('/') }, 2000)
                })
        }
        activate()
    })
    return (
        <>
            <div className="container">
                {errors && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <span class="alert-inner--icon"><i class="ni ni-bell-55"></i></span>
                    <span class="alert-inner--text"><strong>Warning!</strong> {errors}!</span>
                </div>}
                {success && <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                    <span class="alert-inner--text"><strong>Success!</strong> {success} ! </span>
                </div>}
            </div>
        </>
    )
}

export default ActivateAccount;