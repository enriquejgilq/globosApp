import React, { useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import RecoverPassword from "./RecoverPassword";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  startGoogleLogin,
  startLoginEmailPassword,startLogin
} from "../../redux/actions/auth";
import googleimg from "../../assets/googleimg.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Realizado por Enrique Gil, en colaboracion con Cristian Monje
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    margin: theme.spacing(1, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  register: {
    margin: theme.spacing(1, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const classes = useStyles();

  const email = useRef();
  const password = useRef();

  const loginSystem = (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(startLoginEmailPassword(data.email, data.password));
  };

  const loginSystemBack = (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(startLogin(data.email, data.password));
   
  };



  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesion
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={email}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={password}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginSystemBack}
              disabled={loading}
            >
              Iniciar sesion
            </Button>

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGoogleLogin}
            >
              Iniciar sesion con google
            </Button>
            {loading && (
              <Grid className={classes.loading}>
                <CircularProgress />
              </Grid>
            )}

            <Grid className={classes.register}>
              <Grid item xs={12}>
                <Typography>
                  <Link to="/recuperar">Olvido de contraseña</Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <Link to="/registro">
                    ¿No tienes una cuenta?, registrate aqui
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
