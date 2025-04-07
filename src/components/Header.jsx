import { useState, useEffect } from 'react';
import Select from 'react-flags-select';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import PropTypes from 'prop-types';
import {isTokenValid, getCookie} from '../utilities.jsx'
import { jwtDecode } from "jwt-decode";

const languages = {
  IT: "IT",
  GB: "EN",
  ES: "ES",
  FR: "FR",
};

function Header( {setLanguage} ) {
  const [selectedCountry, setCountry] = useState('IT');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setLanguage(languages[selectedCountry]);
  }, [selectedCountry, setLanguage]);

  useEffect(() => {
    const token = getCookie("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (isTokenValid(decodedToken)) {
          setIsLoggedIn(true);
          setUserProfile(decodedToken);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);

  const onLoginSuccess = (response) => {
    setIsLoggedIn(true);
    const userObject = jwtDecode(response.credential);
    setUserProfile(userObject);
    document.cookie = `jwtToken=${response.credential}; max-age=172800; secure; SameSite=Strict`;
    //this log must be removed on production
    console.log(response.credential);
  };
  
  const onLoginError = (response) => {
    console.log(response);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    document.cookie = `jwtToken=${null};`;
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const emailParts = userProfile && userProfile.email ? userProfile.email.split('@') : [];
  const username = emailParts[0] || '';
  const customLabelsFull = { "IT": "Italiano", "GB": "English", "ES": "Español", "FR": "Français" };
  const customLabelsShort = { "IT": "IT", "GB": "EN", "ES": "ES", "FR": "FR" };

  const clientId = "28880670233-rfbhtbqpefv7mqpdikeevvmgg3mrg7gv.apps.googleusercontent.com"

  return (
    <section>
      <div className="d-flex justify-content-between align-items-stretch">
        <Select
          className="mt-2 "
          countries={["IT", "GB", "ES", "FR"]}
          customLabels={
            screenWidth > 420
            ? customLabelsFull
            : customLabelsShort}
          onSelect={setCountry}
          selected={selectedCountry}
        />
        <div className="mt-2 text-end">
          <GoogleOAuthProvider clientId={clientId}>
            <div>
              {isLoggedIn
                ? (<div className="d-flex align-items-center">
                    <div>
                      <p className="ms-2 mb-0">{screenWidth > 420
                        ? userProfile.email
                        : username}
                      </p>
                      <span className="ms-2 cursor-pointer logout-link" onClick={handleLogout} >
                        Logout
                      </span>
                    </div>
                    <img
                      src={userProfile.picture}
                      alt="Profile"
                      className="ms-2 rounded-circle img-fluid"
                      style={{ height: '35px', width: '35px' }}
                    />
                  </div>)
                : <GoogleLogin
                    onSuccess={onLoginSuccess}
                    onError={onLoginError}
                />
              }
            </div>
          </GoogleOAuthProvider>
        </div>
      </div>
    </section>
  );
}
Header.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default Header;
