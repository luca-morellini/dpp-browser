import { useState, useEffect } from 'react';
import Select from 'react-flags-select';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const languages = {
  IT: "IT",
  GB: "EN",
  ES: "ES",
  FR: "FR",
};

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
 
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

function Header({setLanguage}) {
  const [selectedCountry, setCountry] = useState('IT');
  const [jwtToken, setJwtToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setLanguage(languages[selectedCountry]);
  }, [selectedCountry]);

  function isTokenValid(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); //Token payload decode
      const expiry = payload.exp * 1000; //Token expiry date in milliseconds
      return Date.now() < expiry;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    const token = getCookie("jwtToken");
    if (token && isTokenValid(token)) {
      setJwtToken(token);
      setIsLoggedIn(true);
      const userObject = decodeJwtResponse(token);
      setUserProfile(userObject);
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);

  const onLoginSuccess = (response) => {
    setIsLoggedIn(true);
    const userObject = decodeJwtResponse(response.credential);
    setUserProfile(userObject);
    document.cookie = `jwtToken=${response.credential}; max-age=172800; secure; SameSite=Strict`;
    setJwtToken(response.credential);
  };
  
  const onLoginError = (response) => {
    console.log(response);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    document.cookie = `jwtToken=${null};`;
    setJwtToken(null);
  }

  const clientId = "28880670233-rfbhtbqpefv7mqpdikeevvmgg3mrg7gv.apps.googleusercontent.com"

  return (
    <section>
      <div className="d-flex justify-content-between align-items-stretch">
        <Select
          className="mt-2"
          countries={["IT", "GB", "ES", "FR"]}
          customLabels={{ "IT": "Italiano", "GB": "English", "ES": "Español", "FR": "Français" }}
          onSelect={setCountry}
          selected={selectedCountry}
        />
        <div className="mt-2 text-end">
          <GoogleOAuthProvider clientId={clientId}>
            <div>
              {isLoggedIn
                ? (<div className="d-flex align-items-center">
                    <div>
                      <p className="ms-2 mb-0">{userProfile.email}</p>
                      <span className="ms-2 cursor-pointer logout-link" onClick={handleLogout} >
                        Logout
                      </span>
                    </div>
                    <img
                      src={userProfile.picture}
                      alt="Profile"
                      className="ms-2 rounded-circle img-fluid"
                      style={{ height: '40px', width: '40px' }}
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


export default Header;
