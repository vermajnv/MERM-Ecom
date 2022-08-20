import React, { useRef, useState } from 'react'
import './LoginSignUp.css';
import {Link} from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const LoginSignUp = () => {
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const {loginEmail, setLoginEmail} = useState('');
    const {loginPassword, setLoginPassword} = useState('');

    const switchTabs = (e, tab) => {
        // if(tap === 'Login') {
        //     switcherTab.current.classList.add('shiftToNeutral');
        //     switcherTab.current.classList.remove('shiftToRight');

        //     registerTab.current.classList.add('shiftToNeutralForm');
        //     loginTab.current.classList.remove('');
        // }
    }

    const loginSubmit = () => {
        console.log('Login Submit');
    }
    return (
        <>
            <div className="loginSignUpContainer">
                <div className="loginSignUpBox">
                    <div>
                        <div className="loginSignUpToggle">
                            <p onClick={(e) => { switchTabs(e, 'Login') }}>LOGIN</p>
                            <p onClick={(e) => { switchTabs(e, 'Register') }}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                        <form action="" className='loginForm' onSubmit={loginSubmit} ref={loginTab}>
                            <div className="loginEmail">
                                <EmailOutlinedIcon></EmailOutlinedIcon>
                                <input 
                                    type="email" 
                                    placeholder='Email' 
                                    required 
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockOpenIcon></LockOpenIcon>
                                <input 
                                    type="password" 
                                    placeholder='password'
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forget Password ?</Link>
                            <input type="submit" value="Login" className='loginBtn'/>
                        </form>
                </div>
            </div>
        </>
    )
}

export default LoginSignUp