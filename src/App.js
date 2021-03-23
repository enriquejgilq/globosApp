import React from "react";
import "./App.css";
import Login from "./routers/Login/Login";
import RecoverPassword from "./routers/Login/RecoverPassword";
import Register from './routers/Login/Register'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Dashboard from '../src/routers/Dashboard/index'
import  { DashBoardCategory } from './routers/AllTables/DashBoardCategory'
import  { DashBoadSupplier } from './routers/AllTables/DashBoadSupplier'
import  { DashBoardClient } from './routers/AllTables/DashBoardClient'
import  { DashBoardProducts } from './routers/AllTables/DashBoardProducts'
import {
  makeStyles, CssBaseline,
} from '@material-ui/core';
import {Provider} from 'react-redux'
import { store } from "./store/store";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  rootDrawerOpen: {
    marginLeft: theme.drawerWidth,
    width: `calc(100% - ${theme.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logout: {
    marginLeft: 0
  },
  space: {
    ...theme.mixins.toolbar
  }
}));

 
 

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
    <Provider store={store}>

      <Router>
        <Dashboard />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/registro' component={Register} />
          <Route path='/recuperar' component={RecoverPassword} />
          <Route path='/categorias' component={ DashBoardCategory } />
          <Route path='/productos' component={ DashBoardProducts } />
          <Route path='/proveedor' component={ DashBoadSupplier } />
          <Route path='/clientes' component={ DashBoardClient } />

        </Switch>
      </Router>
      </Provider>

    </div>
  );
}

export default App;
