import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import {
  Modal,
  Backdrop,
  Fade,
  Menu,
  Grid,
  TextField,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "./styles";

function Alert(props) {
  const { title, text, buttons, categories, open, handleClose } = props;
  const [openAlert, setOpenAlert] = useState(false);
  const classes = useStyles();

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Grid item xs={12} md={12}>
          <DialogTitle id="alert-dialog-title">
            {"Editar procuctos"}
          </DialogTitle>
        </Grid>
        <Grid item xs={12} md={12}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
            <Select fullWidth>
              {categories.map((option, index) => (
                <MenuItem key={option}>{option.category}</MenuItem>
              ))}
            </Select>
          </DialogContent>
        </Grid>
        <Grid direction="row" item xs={6} md={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Nombre del producto"
            variant="outlined"
            required
            autoComplete="false"
          />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Nombre del producto"
            variant="outlined"
            required
            autoComplete="false"
          />
        </Grid>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Alert;
