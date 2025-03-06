import { useState, useEffect } from 'react';
import Select from 'react-flags-select';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

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

function Header({ setLanguage }) {
  const [selectedCountry, setCountry] = useState('IT');
  const [jwtToken, setJwtToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setLanguage(languages[selectedCountry]);
  }, [selectedCountry]);

  useEffect(() => {
    const token = getCookie("jwtToken");
    if (token) {
      try {
        const userObject = jwtDecode(token);
        if ((Date.now() / 1000) < userObject.exp) {
          setJwtToken(token);
          setIsLoggedIn(true);
          setUserProfile(userObject);
        }
      } catch (error) {
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
    setJwtToken(response.credential);
    console.log(response.credential);
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


export default Header;
