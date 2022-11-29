import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { Pages } from '../../constants/index';
import { NavContainer, LinksWrapper, UserWrapper } from "./StyledComponents";
import ConnectWallet from '../ConnectWallet';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <NavContainer>
        <LinksWrapper>
          {
            Pages.map((page) => {
              return (
                <Link key={page.title} to={page.link}>
                  {page.title}
                </Link>
              )
            })
          }
        </LinksWrapper>
        <UserWrapper>
          <ConnectWallet />
          {userInfo ? (
            <>
              <Link to="/profile">
                {userInfo.name}
              </Link>
              <Link onClick={logoutHandler}>
                Sign Out
              </Link>
            </>
          ) : (
            <Link to="/login">
              Sign In
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/userlist">
              Admin
            </Link>
          )}
        </UserWrapper>
      </NavContainer>
    </header>
  );
}

export default Header;
