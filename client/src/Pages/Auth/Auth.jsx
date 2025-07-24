import React, { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import './Auth.css';
import { useDispatch } from 'react-redux';
import { setcurrentuser } from '../../action/currentuser';

const Auth = ({ user, setauthbtn, seteditcreatechanelbtn }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const result = {
          email: res.data.email,
          name: res.data.name,
          imageUrl: res.data.picture,
          _id: res.data.sub,
        };

        dispatch(setcurrentuser({ result, token: tokenResponse.access_token }));
        localStorage.setItem('Profile', JSON.stringify({ result, token: tokenResponse.access_token }));
        setProfile(result);
      } catch (error) {
        console.error('Fetching user info failed:', error);
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
    setauthbtn(false);
  };

  return (
    <div className="Auth_container" onClick={() => setauthbtn(false)}>
      <div className="Auth_container2" onClick={(e) => e.stopPropagation()}>
        {user ? (
          <>
            <div className="User_Details">
              <div className="Chanel_logo_App">
                <p className="fstChar_logo_App">
                  {user?.result?.name
                    ? user.result.name.charAt(0).toUpperCase()
                    : user?.result?.email?.charAt(0).toUpperCase() || "?"}
                </p>
              </div>
              <div className="email_auth">{user?.result?.email || "No Email"}</div>
            </div>

            <div className="btns_Auth">
              {user?.result?.name ? (
                <Link to={`/channel/${user.result._id}`} className="btn_Auth">
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
