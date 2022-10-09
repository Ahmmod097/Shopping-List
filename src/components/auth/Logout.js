import React, { useState, useEffect } from "react";
import { NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  
  const handleModal = () => {
    dispatch(logout());
  };

  return (
    <div>
      <NavLink onClick={handleModal} href="#">
        Logout
      </NavLink>
    </div>
  );
}
