import React, { useState, useEffect, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";
import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout";
import RegisterModal from "../auth/RegisterModal";
import { useDispatch, useSelector } from "react-redux";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let isLogin = typeof window !== "undefined" && localStorage.getItem("token") ? true : false;

  const handleToggle = () => setIsOpen(!isOpen);
  
  let userName = useSelector((state) => state.auth.userName);

  useEffect(() => {
  }, [isAuthenticated]);

  useEffect(() => {
  }, [isLogin]);

  const authLinks = (
    <Fragment>
      <NavItem>
        <div className="navbar-text mb-1">
          <strong>{userName ? `Welcome ${userName}` : ""}</strong>
        </div>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );
  
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <NavbarBrand href="/">ShoppingList</NavbarBrand>
        <NavbarToggler onClick={handleToggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {isLogin ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
