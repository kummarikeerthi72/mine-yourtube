import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import './Auth.css';
import { useDispatch } from 'react-redux';
import { setcurrentuser } from '../../action/currentuser';

const Auth = ({ user, setauthbtn, seteditcreatechanelbtn }) => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const decoded = jwtDecode(tokenResponse.credential);

        const result = {
          email: decoded.email,
          name: decoded.name,
          imageUrl: decoded.picture,
          _id: decoded.sub,
        };

        dispatch(setcurrentuser({ result, token: tokenResponse.credential }));
        localStorage.setItem(
          'Profile',
          JSON.stringify({ result, token: tokenResponse.credential })
        );
      } catch (error) {
        console.error('Decoding failed:', error);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  const logout = () => {
    dispatch(setcurrentuser(null));
    localStorage.clear();
    googleLogout();
  };

  return (
    <div className="Auth_container" onClick={() => setauthbtn(false)}>
      <div className="Auth_container2">
        {user ? (
          <>
            <p className="User_Details">
              <div className="Chanel_logo_App">
                <p className="fstChar_logo_App">
                  {user?.result?.name
                    ? user.result.name.charAt(0).toUpperCase()
                    : user.result.email.charAt(0).toUpperCase()}
                </p>
              </div>
              <div className="email_auth">{user.result.email}</div>
            </p>
            <div className="btns_Auth">
              {user.result.name ? (
                <Link
                  to={`/channel/${user.result._id}`}
                  className="btn_Auth"
                >
                  Your Channel
                </Link>
              ) : (
                <input
                  type="button"
                  className="btn_Auth"
                  value="Create Your Own Channel"
                  onClick={() => seteditcreatechanelbtn(true)}
                />
              )}
              <div className="btn_Auth" onClick={logout}>
                <BiLogOut />
                Log Out
              </div>
            </div>
          </>
        ) : (
          <button className="btn_Auth" onClick={() => login()}>
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
