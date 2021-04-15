import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./routers/Login/Login";
import RecoverPassword from "./routers/Login/RecoverPassword";
import Register from "./routers/Login/Register";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Dashboard from "../src/routers/Dashboard/index";
import { DashBoardCategory } from "./routers/AllTables/DashBoardCategory";
import { DashBoadSupplier } from "./routers/AllTables/DashBoadSupplier";
import { DashBoardClient } from "./routers/AllTables/DashBoardClient";
import { DashBoardProducts } from "./routers/AllTables/DashBoardProducts";
import { firebase } from "./firebase/firebaseConfig";

import { makeStyles, CssBaseline } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { login, startcheking } from "./actions/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PrivateRoute } from "./routers/routes/PrivateRoute";
import { PublicRoute } from "./routers/routes/PublicRoute";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
  },
  rootDrawerOpen: {
    marginLeft: theme.drawerWidth,
    width: `calc(100% - ${theme.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logout: {
    marginLeft: 0,
  },
  space: {
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const classes = useStyles();
  const [checkin, setChekin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch(); // Works!
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChekin(false);
    });
  }, [dispatch, setChekin, setIsLoggedIn]);

const { checking, uid } = useSelector(state=> state.authBack )

 useEffect(() => {
  dispatch(startcheking())
 }, [dispatch])

  if (checkin || checking ) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      <Router>
        {isLoggedIn || uid  && <Dashboard />}
        <Switch>
          <PublicRoute
            path="/"
            exact
            component={Login}
            isAuthenticated={isLoggedIn|| uid }
          />
          <PublicRoute
            path="/registro"
            component={Register}
            isAuthenticated={isLoggedIn || uid}
          />
          <PublicRoute
            path="/recuperar"
            component={RecoverPassword}
            isAuthenticated={isLoggedIn || uid}
          />

          <PrivateRoute
            path="/inicio"
            component={Dashboard}
            isAuthenticated={isLoggedIn || uid}
          />
          <PrivateRoute
            path="/categorias"
            component={DashBoardCategory}
            isAuthenticated={isLoggedIn || uid}
          />
          <PrivateRoute
            path="/productos"
            component={DashBoardProducts}
            isAuthenticated={isLoggedIn || uid}
          />
          <PrivateRoute
            path="/proveedor"
            component={DashBoadSupplier}
            isAuthenticated={isLoggedIn || uid}
          />
          <PrivateRoute
            path="/clientes"
            component={DashBoardClient}
            isAuthenticated={isLoggedIn || uid} 
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
