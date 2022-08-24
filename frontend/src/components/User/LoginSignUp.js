import React, { useEffect, useRef, useState } from 'react'
import './LoginSignUp.css';
import {Link, useNavigate} from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/FaceOutlined';
import { login, clearError, register } from '../../ReduxStorage/actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from '@blaumaus/react-alert';
import Loader from '../layout/Loader/loader';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, loading, isAuthenticated} = useSelector(state => state.user);
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [user, setUser] = useState({
        name : "", 
        email : "",
        password : "",
    });

    const {name, email, password} = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('/profile.jpg');

    const switchTabs = (e, tab) => {
        if(tab === 'Login') {
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');

            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');
        }
        if(tab === 'Register')
        {
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral');

            registerTab.current.classList.add('shiftToNeutralForm');
            loginTab.current.classList.add('shiftToLeft');
        }
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.set('name', name);
        form.set('email', email);
        form.set('password', password);
        form.set('avatar', avatar);
        dispatch(register(form));
    }

    const registerDataChanges = (e) => {
        if(e.target.name === 'avatar')
        {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) 
                {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else
        {
            setUser({
                ...user, [e.target.name] : e.target.value
            })
        }
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }
        if(isAuthenticated) {
            navigate('/account');
        }
    }, [alert, error, dispatch, isAuthenticated, navigate])

    return (
        <>
            {loading ? <Loader /> : (

            <div className="loginSignUpContainer">
                <div className="loginSignUpBox">
                    <div>
                        <div className="loginSignUpToggle">
                            <p onClick={(e) => { switchTabs(e, 'Login') }}>LOGIN</p>
                            <p onClick={(e) => { switchTabs(e, 'Register') }}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form 
                        className='loginForm' 
                        onSubmit={loginSubmit} 
                        ref={loginTab}>
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
                    <form 
                        className='signUpForm'
                        onSubmit={registerSubmit} 
                        ref={registerTab}
                        encType='multipart/form-data'>
                        <div className='signUpName'>
                            <FaceIcon></FaceIcon>
                            <input 
                                type="text"
                                placeholder='Name' 
                                required
                                name='name'
                                value={name}
                                onChange={registerDataChanges}
                            />
                        </div>
                        <div className='signUpEmail'>
                            <EmailOutlinedIcon></EmailOutlinedIcon>
                            <input 
                                type="email"
                                placeholder='Emai' 
                                required
                                name='email'
                                value={email}
                                onChange={registerDataChanges}
                            />
                        </div>
                        <div className='signUpPassword'>
                            <LockOpenIcon></LockOpenIcon>
                            <input 
                                type="password"
                                placeholder='Password' 
                                required
                                name='password'
                                value={password}
                                onChange={registerDataChanges}
                            />
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input 
                                type="file"
                                name='avatar'
                                accept='image/*'
                                onChange={registerDataChanges}
                            />
                        </div>
                        <input 
                            type="submit" 
                            value="Register"
                            className="signUpBtn"
                        />
                    </form>
                </div>
            </div>
            )}
        </>
    )
}

export default LoginSignUp