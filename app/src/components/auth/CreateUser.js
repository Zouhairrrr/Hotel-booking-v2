import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const CreateUser = () => {


    //* enable navigation
    const navigate = useNavigate()
    //* inisilize props
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [success, setSucsess] = useState('')


    const UserRegister = async (data) => {
        try {
            const response = await axios.post(`http://localhost:8082/auth/register`, data)
            setSucsess(response.data.message);
            setErrors("")
            setTimeout(() => navigate('/auth/login'), 2000);
        } catch (error) {
            console.error('There was an error!', error.response.data.message);
            setErrors(error.response.data.message)
            setName("");
            setEmail("");
            setPassword("");
        }
    }
    const HandleSumit = async (event) => {
        event.preventDefault()
        const data = {
            name: name,
            email: email,
            password: password
        };
        await UserRegister(data);
    }
    return (
        <>
            <section className="section section-shaped section-lg my-0">



                <div className="shape shape-style-1 shape-zah">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="container pt-lg-md">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card bg-secondary shadow border-0">
                                <div className="card-header bg-white pb-5">
                                    <div className="text-muted text-center mb-3">
                                        <small>Sign up with</small>
                                    </div>
                                    <div className="text-center">
                                        <Link to="#" className="btn btn-neutral btn-icon mr-4">
                                            <span className="btn-inner--icon">
                                                <img src="../assets/img/icons/common/github.svg" alt="images" />
                                            </span>
                                            <span className="btn-inner--text">Github</span>
                                        </Link>
                                        <Link to="#" className="btn btn-neutral btn-icon">
                                            <span className="btn-inner--icon">
                                                <img src="../assets/img/icons/common/google.svg" alt="images" />
                                            </span>
                                            <span className="btn-inner--text">Google</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Or sign up with credentials</small>
                                    </div>
                                    <form method="post" onSubmit={HandleSumit}>
                                        
                                        {success && <span className="badge badge-pill badge-success text-uppercase">{success}</span>}
                                        {errors && <span className="badge badge-pill badge-warning text-uppercase">{errors}</span>}
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-hat-3"></i></span>
                                                </div>
                                                <input
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="form-control" placeholder="Name" type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                                </div>
                                                <input
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}

                                                    className="form-control" placeholder="Email" type="email" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="form-control" placeholder="Password" type="password" />
                                            </div>
                                        </div>
                                        <div className="text-muted font-italic">
                                            <small>password strength:
                                                <span className="text-success font-weight-700">strong</span>
                                            </small>
                                        </div>
                                        <div className="row my-4">
                                            <div className="col-12">
                                                <div className="custom-control custom-control-alternative custom-checkbox">
                                                    <input className="custom-control-input" id="customCheckRegister" type="checkbox" />
                                                    <label className="custom-control-label" htmlFor="customCheckRegister">
                                                        <span> Already registered?
                                                            <Link to="/auth/login">LOGIN</Link>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary mt-4">Create account</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default CreateUser;