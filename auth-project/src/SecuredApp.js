import React from 'react';
import App from './App';
import './App.css';
import {
    AuthProvider, 
    AuthService, 
    useAuth, 
    } from 'react-oauth2-pkce'   
import { useParams } from 'react-router-dom';

const authService = new AuthService({   
    clientId: '162424205051293113@development',    
    authorizeEndpoint: 'https://accounts.zitadel.ch/oauth/v2/authorize',  
    tokenEndpoint: 'https://api.zitadel.ch/oauth/v2/token',   
    redirectUri: "http://localhost:3000",  
    scopes: ['openid', 'profile', 'email']  
});  

function SecuredApp() {
    const { authService } = useAuth(); 
    const login = async () => authService.authorize(); 
    const logout = async () => authService.logout(); 
    console.log(authService);
    const { fromHomepage } = useParams();

    if (authService.isPending()) { 
        console.log(fromHomepage);
        if (fromHomepage) {
            setTimeout(() => {
                return <div>
                    {login()}
                </div>
                }, 50);
        }
        else {
            return <div className='if-not-logged-in'>
                <div>
                <p>Not logged in yet</p>
                <button onClick={()=> {
                    logout() ;
                    login();
                    }}>Login</button>
                </div>
        </div>
        }
    }

    if (!authService.isAuthenticated()) { 
        if (fromHomepage) {
            setTimeout(() => {
            return <div>
                {login()}
            </div>
            }, 50);
        }
        else {
            return (
                <div className='if-not-logged-in'>
                    <div>
                    <p style={{color: "red"}}>Not Logged in yet</p>
                    <button onClick={login}>Login</button>
                    </div>
                </div>
            )
        }
    }

    if (Object.keys(JSON.stringify(authService.getAuthTokens())).length>2){
            return(
            <div className='profile-container'>
                <div className='profile-details'>
                <h2>Hello, {JSON.stringify(authService.getUser().name).slice(1, -1)}</h2>
                <p className='userLabel'>Family name: </p>
                <p className='userInfo'>{JSON.stringify(authService.getUser().family_name).slice(1, -1)} </p>
                <p className='userLabel'>Name: </p>
                <p className='userInfo'> {JSON.stringify(authService.getUser().name).slice(1, -1)}</p>
                <p className='userLabel'>Prefered username: </p>
                <p className='userInfo'> {JSON.stringify(authService.getUser().preferred_username, null, 2).slice(1, -1)}</p>
                <p className='userLabel'>Email: </p>
                <p className='userInfo'> {JSON.stringify(authService.getUser().email, null, 2).slice(1, -1)}</p>
                <p className='userLabel'>Is email verified: </p>
                <p className='userInfo'> {JSON.stringify(authService.getUser().email_verified, null, 2)}</p>
                <button onClick={logout} className="logOutBtn">Logout</button>
            </div>
            </div>
        )
    }

    return ( 
        <div>
            <button onClick={logout}>Logout</button>
            <App />
        </div>
    );
}

function WrappedSecuredApp() {
    return (
        <div>
            <AuthProvider authService={authService} > 
                <SecuredApp />
            </AuthProvider>
        </div>
    );
}

export default WrappedSecuredApp; 

