import React, { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../redux/actions/ui";
import { startRegisterwithEmailPassword, startRegister } from "../../redux/actions/auth";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Swal from "sweetalert2";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        to="https://enriquejgilq.github.io/"
      >
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const classes = useStyles();
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const [nameError, setnameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [phoneError, setphoneError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const saveUser = () => {
    const data = {
      email: email.current.value,
      password: password.current.value,
      name: name.current.value,
      phone: phone.current.value,
    };
    if (data.name === "") {
      setnameError("El nombre no puede estar vacio");
      dispatch(setError("El nombre no puede estar vacio"));
      setemailError("");
      setpasswordError("");
      setphoneError("");
    } else if (!validator.isEmail(data.email)) {
      console.log("email vacio");
      setnameError("");
      setemailError("El Correo electronico no es valido");
      dispatch(setError("El Correo electronico no es valido"));
      setpasswordError("");
      setphoneError("");
    } else if (data.phone === "") {
      console.log("telefono vacio");
      setnameError("");
      setemailError("");
      setphoneError("El telefono no puede estar vacio");
      dispatch(setError("El telefono no puede estar vacio"));
      setpasswordError("");
    } else if (data.password === "") {
      console.log("contraseña vacia");
      setnameError(" ");
      setemailError("");
      setphoneError("");
      setpasswordError("La contraseña no puede estar vacia");
      dispatch(setError("La contraseña no puede estar vacia"));
    } else if (data.password < 8) {
      setnameError(" ");
      setemailError("");
      setpasswordError("");
      setpasswordError("La contraseña tiene que tener más de 8 digitos");
      dispatch(setError("La contraseña tiene que tener más de 8 digitos"));
    } else {

     /* dispatch(
        startRegisterwithEmailPassword(
          data.email,
          data.password,
          data.name,
          data.phone
        )
      );
      dispatch(removeError());
      console.log("perfecto");
*/ 
dispatch(startRegister(
  data.email,
  data.password,
  data.name,
  data.phone
  ))

      setnameError(" ");
      setemailError("");
      setpasswordError("");
      setpasswordError("");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre de usuario"
              name="name"
              autoComplete="name"
              autoFocus
              inputRef={name}
              helperText={nameError}
            />
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
              helperText={emailError}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Numero de telefono"
              name="phone"
              autoComplete="phone"
              autoFocus
              type="number"
              min="0"
              inputRef={phone}
              helperText={phoneError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Contraseña"
              name="password"
              autoFocus
              type="password"
              helperText={passwordError}
              inputRef={password}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveUser}
            >
              Registro de usuario
            </Button>
            <Typography>
              <Link to="/">Atrás</Link>
            </Typography>

            <Box mt={5}>
              <Copyright />
            </Box>
            {/*editar mensaje de error modal */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
