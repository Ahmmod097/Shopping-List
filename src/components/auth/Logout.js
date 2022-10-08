import React, { useState } from "react";
import { NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";

export default function Logout() {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(logout);
  };
  
  return (
    <div>
      <NavLink onCLick={handleOnClick} href="#">
        Logout
      </NavLink>
    </div>
  );
}
