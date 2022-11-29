import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import Message from "../../components/Message";
import Rainbow from "../../components/Rainbow";
import Loader from "../../components/Loader";
import { login, loginWithGoogle, loginWithFacebook } from "../../actions/userActions";
import { USER_LOGIN_FAIL } from "../../constants/userConstants";
import GoogleIcon from "../../assets/icons/google.png"
import FaceBookIcon from "../../assets/icons/facebook.png"
import { SignInContainer } from "./StyledComponents";

function SingInScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    gapi.load("client:auth2", () => { gapi.client.init({ clientId: "1055787788487-h0rp41r4e0cve6n9d270vlviv4o5d23v.apps.googleusercontent.com", plugin_name: "chat", }); });
  }, []);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const responseFacebook = async (response) => {
    if (response) {
      const data = {
        name: `${response.name}`,
      };
      dispatch(loginWithFacebook(data));
    }
  };

  const onGoogleLoginFailure = async (response) => {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Filed to sign in with Google"
    });
  };

  const onGoogleLoginSuccess = async (response) => {
    const data = {
      email: response.profileObj.email,
      name: `${response.profileObj.givenName}`,
    };
    dispatch(loginWithGoogle(data));
  };

  return (
    <>
      <SignInContainer>
        <h1>Sign In</h1>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Box>
          <Box>
            <Typography>Email Address</Typography>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box>
            <Typography>Password</Typography>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Box>
          <Box display={`flex`} alignItems={`center`} justifyContent={`space-between`} mt={`15px`}>
            <Button type="submit" variant="outlined" height={`40px`} onClick={submitHandler}>
              Sign In
            </Button>
            <Box ml={`10px`} zIndex={999}>
              <GoogleLogin
                clientId="1055787788487-h0rp41r4e0cve6n9d270vlviv4o5d23v.apps.googleusercontent.com"
                buttonText="GOOGLE"
                onSuccess={onGoogleLoginSuccess}
                onFailure={onGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
                ux_mode={"popup"}
                render={renderProps => (
                  <Button variant='outlined' sx={{ marginLeft: '10px' }} onClick={renderProps.onClick}>
                    <Box display={`flex`} alignItems={`center`}>
                      <img src={GoogleIcon} style={{ width: '20px', height: 'auto' }} alt='google icon' />
                      <Box ml={`5px`}>{`Google`}</Box>
                    </Box>
                  </Button>
                )}
              />
              <FacebookLogin
                appId="415252097456649"
                textButton="Facebook"
                cssClass="btnFacebook"
                callback={responseFacebook}
                icon={<img src={FaceBookIcon} style={{ width: '20px', height: 'auto' }} alt='facebook icon' />}
              />
            </Box>
          </Box>
        </Box>

        <Box className="py-3">
          <Box style={{ zIndex: 2 }}>
            New Customer ?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
              Register
            </Link>
          </Box>
        </Box>

      </SignInContainer>
      <Rainbow left={`40%`} rotDeg={`25deg`} />
    </>
  );
}

export default SingInScreen;
