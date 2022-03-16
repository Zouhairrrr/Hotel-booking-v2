import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <h1 className="display-2 text-center text-info mt-3">home page</h1>
            <div className="nav mt-5">
                <Link className="nav-link" to='auth/login'>SIGN IN</Link>
                <Link className="nav-link" to='auth/register'>SIGN UP</Link>
                <Link className="nav-link" to='user/profile'>PROFILE</Link>
            </div>
        </>
    );
}

export default Home;