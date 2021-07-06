import React, { useEffect, useRef, useState } from "react";
import { forwardRef } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  eventStartLoading,
  productsLoaded,
  productUpdates,
} from "../../redux/actions/events";
import useStyles from "./styles";
import { addProducts } from "../../redux/actions/events";
import AlertDialogSlide from "../../components/ModalAlert/ModalAlert";
import ComboBox from "../../components/Autocomplete";
import { AllTables } from "../../components/Table/AllTables";
import Edit from "@material-ui/icons/Edit";
import Swal from "sweetalert2";

export function DashBoardProducts() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsLoaded());
    dispatch(eventStartLoading());
  }, [dispatch]);
  const classes = useStyles();

  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const [id_category, setid_category] = useState("");
  const [name_category, setname_category] = React.useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  
  const [products_name, setproducts_name] = useState('')
  const [amount, setamount] = useState('')

  const [columns, setColumns] = useState([
    { title: "Nombre del producto", field: "products_name" },
    {title: "Categoria", field: "category.name_category" },
    { title: "Cantidad", field: "amount", type: "number" },
  ]);

  const cleanFields = () => {
    products_name.current.value = "";
    amount.current.value = "";
  };

  const handleClickOpen = (e) => {
    setproducts_name(e.products_name)
    setamount(e.amount)
    setOpen(true);
  
  };
  const handleClickclose = () => {
    setproducts_name('')
    setamount('')
    setOpen(false);
  };

  const onSave = () => {
    const datos = {
      products_name: products_name,
      amount: amount,
      category: { name_category, id_category },
    };
    dispatch(addProducts(datos));
    dispatch(productsLoaded());
    dispatch(eventStartLoading());
  
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenAlert = (e) => {
    setproducts_name(e.products_name)
    console.log(e.products_name);
    console.log(categories);

    const inputOptions = categories.reduce((o, i) => {
      o[" " + i._id] = i.category;
      return o;
    }, {});

    Swal.fire({
      title: "Select Tag",
      html: '<input id="swal-input1" class="swal2-input">',
      input: "select",
      inputOptions,
      inputPlaceholder: "Select tag",
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value != "") {
            document.getElementById("taginfo").name_category = value;
            resolve();
          } else {
            reject("You need to select one tag");
          }
        });
      },
    }).then(function (result) {
      Swal.fire({
        type: "success",
        html: "You selected: " + result,
      });
    });
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
      <Grid item xs={12} md={12}>
        <AllTables
          title="Productos"
          columns={columns}
          data={products}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
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
              tooltip: "Editar",
              onClick: (event, rowData) => {
                handleClickOpen(rowData);
              },
            },
          ]}
        />

        <AlertDialogSlide
          title="Editar Producto "
          open={open}
          handleClickOpen={handleClickOpen}
          handleClickclose={handleClickclose}
          categories={categories}
          handleSave={onSave}
        >
          <Grid container spacing={2} xs={12} md={12}>
            <Grid item xs={6} md={6}>
            <TextField
            fullWidth
            label="Nombre del producto"
            variant="outlined"
            required
            autoComplete="false"
            value={products_name}
            
          />
            </Grid>
            <Grid item xs={6} md={6}>
            <TextField
              className={classes.text}
              id="outlined-basic"
              label="Cantidad"
              variant="outlined"
              type="number"
              value={amount}
              required
            />
            </Grid>
            <Grid item xs={6} md={6}>
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
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, newValue) => {
                  setid_category(newValue?._id);
                }}
              />
            </Grid>
          </Grid>
        </AlertDialogSlide>
      </Grid>
    </Grid>
  );
}
//el agregar y editar llamar modal para hacer las funciones.
