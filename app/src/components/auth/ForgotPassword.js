import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




function ForgotPassword() {

    //* enable navigation
    // const navigate = useNavigate()
    //* inisilize props
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState('')
    const [success, setSucsess] = useState('');

    //* handle login 
    const forgotPassword = async (data) => {

        try {
            const response = await axios.post(`http://localhost:8082/auth/ForgotPassword`, data)
            setSucsess(response.data.message);
            setErrors("")
        } catch (error) {
            console.error('There was an error!', error.response.data.message);
            setErrors(error.response.data.message)
            setSucsess("")
        }
    }

    //* handle submit and pass data to forgotPassword function

    const handlSubmit = async (event) => {
        event.preventDefault();
        const bodyData = {
            email: email,
        }
        await forgotPassword(bodyData)
    }
    return (
        <>
            <section className="section section-lg section-shaped overflow-hidden my-0">
                <div className="shape shape-style-1 shape-zah shape-skew">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="container shape-container py-0 pb-5">
                    <div className="row row-grid justify-content-between align-items-center">
                        <div className="col-lg-6">
                            <h3 className="display-1 text-white">HELLO HELLO HELLO
                                <span className="display-4 text-white">HELLO HELLO HELLOHELLO HELLO HELLO</span>
                            </h3>
                            <p className="text-white">HELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLO.</p>
                            <div className="btn-wrapper">
                                <Link to="/" className="btn btn-success">Login Page</Link>
                                <Link to="/register" className="btn btn-white">Register Page</Link>
                            </div>
                        </div>
                        <div className="col-lg-5 mb-lg-auto">
                            <div className="transform-perspective-right">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-header bg-white pb-5">
                                        <div className="text-muted text-center mb-3">
                                            <small>Forgot PASSWORD</small>
                                        </div>
                                    </div>
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>We are the best!</small>
                                        </div>
                                        <form method="post" onSubmit={handlSubmit}>
                                            {errors && <span className="badge badge-pill badge-warning text-uppercase">{errors}</span>}
                                            {success && <span className="badge badge-pill badge-success text-uppercase">{success}</span>}
                                            <div className="form-group mb-3">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                                    </div>
                                                    <input className="form-control" name="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary my-4">Send</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ForgotPassword;