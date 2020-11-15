import React, { Fragment, useContext, useState } from "react";
import { AuthContext } from "../App";
import MenuMember from "./Menu/MenuMember";
import MenuPublic from "./Menu/MenuPublic";
import MenuAdmin from "./Menu/MenuAdmin";
import MenuStaff from "./Menu/MenuStaff";
function MenuComp() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <MenuPublic />;
  }

  if (state.role === 1) {
    return <MenuAdmin />;
  } else if (state.role === 2) {
    return <MenuStaff />;
  }else if(state.role === 3){
    return <MenuMember />;
  }
}

export default MenuComp;
