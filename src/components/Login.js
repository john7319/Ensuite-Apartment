import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        login(email, password)
            .then((userData) => {
                if (userData) {
                    //const welcomeMessage = `Welcome ${userData.role === 'admin' ? 'Admin' : 'User'} ${userData.name}!`;
                    
                    if (userData){
                        alert(`Welcome ${userData.name}`)
                        navigate('/')
                    }
                    // // Redirect based on user role with state
                    // if (userData.role === 'admin') {
                    //     navigate('/admin-dashboard', { state: { welcomeMessage } });
                    // } else if (userData.role === 'user') {
                    //     navigate('/user-dashboard', { state: { welcomeMessage } });
                    // } else {
                    //     alert("You must be a user");
                    // }
                }
            })
            .catch((error) => {
                console.error(error);
                if (error.message === 'Token not verified') {
                    setError('Your account is not verified or has been deactivated. Please check your email for verification instructions.');
                } else {
                    setError('Invalid email or password');
                }
            });
    };

    return (
        <div className="row">
            <section className='sign in column center'>
                <Link to="/" className="home-icon"><i className="fas fa-home" /></Link>
                <h2>
                    Apartment App
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <br/>
                        <input
                            type="email"
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <br/>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} iconn`}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button className='log' type="submit">Login</button>
                </form>
                <div>
                    <br />
                    <div className="signin--links">
                        <a href="#!">Forgot Password</a>
                    </div>
                    <div className="row center">
                        <div className="row signin--or">
                            <span>or</span>
                        </div>
                    </div>
                    <button onClick={() => navigate("/sign-up")} className="reg">Sign up</button>
                </div>
            </section>
        </div>
    );
};

export default Login;
