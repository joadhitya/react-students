import React, { useReducer, createContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomeComp from "./components/HomeComp";
import ListStudents from "./components/ListStudents";
import LoginComp from "./components/LoginComp";
import MenuComp from "./components/MenuComp";
import Public from "./components/Public";
import RegisterComp from "./components/RegisterComp";
import RoleAdmin from "./components/RoleAccess/RoleAdmin";
import RoleMember from "./components/RoleAccess/RoleMember";
import RoleStaff from "./components/RoleAccess/RoleStaff";
import Transaction from "./components/Transaction";
export const AuthContext = createContext();

// Intial State
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpires: 0,
  role: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      // alert(action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        tokenExpires: action.payload.expires,
        role: action.payload.role,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <MenuComp />
          <Route exact path="/" component={Public} />
          <Route exact path="/login" component={LoginComp} />
          <Route exact path="/dashboard" component={HomeComp} />
          <Route exact path="/register" component={RegisterComp} />
          <Route exact path="/transaction" component={Transaction} />
          <Route exact path="/students" component={ListStudents} />
          <Route exact path="/admin" component={RoleAdmin} />
          <Route exact path="/staff" component={RoleStaff} />
          <Route exact path="/member" component={RoleMember} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
