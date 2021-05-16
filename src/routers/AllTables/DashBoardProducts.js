import React, { useEffect, useRef, useState } from "react";
import { forwardRef } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import {
  eventStartLoading,
  productsLoaded,
  productUpdates,
} from "../../redux/actions/events";
import useStyles from "./styles";
import { addProducts } from "../../redux/actions/events";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from '../../components/Alert/'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export function DashBoardProducts() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const [id_category, setid_category] = useState("");
  const [name_category, setname_category] = React.useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);



  useEffect(() => {
    dispatch(productsLoaded());
    dispatch(eventStartLoading());
  }, [dispatch]);
  const classes = useStyles();
  const products_name = useRef();
  const amount = useRef();
  const [columns, setColumns] = useState([
    { title: "Nombre del producto", field: "products_name" },
    {
      title: "Categoria",
      field: "name_category",
      editComponent: props =>
      <Autocomplete
      id="combo-box-demo"
      noOptionsText="No hay coincidencias"
      options={categories}
      clearOnBlur
      getOptionLabel={(option) => option.category}
      onInputChange={(event, newInputValue) => {
        setname_category(newInputValue);
      }}
      renderOption={(option) => (
        <React.Fragment>
          <Typography>{option.category}-</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {option._id}
          </Typography>
        </React.Fragment>
      )}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
      onChange={(event, newValue) => {
        setid_category(newValue?._id);
      }}
    />

    },
    { title: "Cantidad", field: "amount", type: "number" },
  ]);

  const cleanFields = () => {
    products_name.current.value = "";
    amount.current.value = "";
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    const datos = {
      products_name: products_name.current.value,
      amount: amount.current.value,
      category: { name_category, id_category },
    };
    dispatch(addProducts(datos));
    dispatch(productsLoaded());
    dispatch(eventStartLoading());
    cleanFields()
  };


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenAlert = (e) => {
    const data = { categories}
   setOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  
  return (
    <Grid
      container
      xs={8}
      md={8}
      direction="row"
      justify="space-around"
      alignItems="stretch"
      spacing={1}
    >
      <Grid item xs={12} md={6}>
        <Autocomplete
          id="combo-box-demo"
          noOptionsText="No hay coincidencias"
          options={categories}
          clearOnBlur
          getOptionLabel={(option) => option.category}
          onInputChange={(event, newInputValue) => {
            setname_category(newInputValue);
          }}
          renderOption={(option) => (
            <React.Fragment>
              <Typography>{option.category}-</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {option._id}
              </Typography>
            </React.Fragment>
          )}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          onChange={(event, newValue) => {
            setid_category(newValue?._id);
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
        spacing={1}
      >
        <form className={classes.form} onSubmit={guardarDatos}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Nombre del producto"
            variant="outlined"
            required
            autoComplete="false"
            inputRef={products_name}
          />
          <Grid item xs={12} md={12} className={classes.cnt}>
            <TextField
              className={classes.text}
              id="outlined-basic"
              label="Cantidad"
              variant="outlined"
              type="number"
              inputRef={amount}
              required
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              className={classes.button}
            >
              <Typography className={classes.txt}> Guardar</Typography>
            </Button>
          </Grid>
        </form>
      </Grid>

      <Grid item xs={12} md={12}>
        <MaterialTable
          title={<Typography className={classes.txt}> Productos </Typography>}
          icons={tableIcons}
          columns={columns}
          data={products}
          editable={{
           
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
          }}
          actions={[
        {
          icon: () => <Edit fontSize="small" />,
          tooltip: 'Editar',
          onClick: (event, rowData) =>{
            handleOpenAlert(rowData)
          }
        },
      ]}

          
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header: {
              actions: "Acciones",
            },
          }}
        />

<Alert
        text={<h2>asd</h2>}
        open={openAlert}
        handleOpen={handleOpenAlert}
        handleClose={handleCloseAlert}
        categories={categories}
        buttons={
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCloseAlert}
          >
            Aceptar
          </Button>
        }
      />
      </Grid>
    </Grid>
  );
}
//CAMBIAR CATEGORIA DE PRODUCTO