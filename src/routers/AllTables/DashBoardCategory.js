import React, { useEffect, useRef, useState } from "react";
import { forwardRef } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
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
import useStyles from "./styles";
import { eventStartAddNew, eventStartLoading, categoryUpdate, categoryDelete  } from "../../redux/actions/events";
import { useDispatch, useSelector } from "react-redux";

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


export function DashBoardCategory() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { categories } = useSelector(state=> state.categories )


  useEffect(() => { 
    dispatch( eventStartLoading() );
}, [ dispatch ])
  const [columns, setColumns] = useState([
    { title: "Id de categoria", field: "_id", editable: 'never'},
    { title: "Categoria", field: "category" },
  ]);
 
  return (
    <Grid container xs={6} md={6}>
      <Grid xs={12} md={12}>
        <MaterialTable
          title="Categorias de productos "
          icons={tableIcons}
          columns={columns}
          data={categories}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  dispatch(eventStartAddNew(newData));
                  dispatch( eventStartLoading() );
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  dispatch(categoryUpdate(newData));
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                dispatch(categoryDelete(oldData))
                dispatch( eventStartLoading() );

                  resolve();
                }, 1000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "filas",
            firstTooltip: "Primera Página",
            previousTooltip: "Página anterior",
            nextTooltip: "Próxima página",
            lastTooltip: "Última página ",
          },
          toolbar: {
            nRowsSelected: "{0} fila(s) seleccionadas",
            searchPlaceholder: "Buscar",
          },
          header: {
            actions: "Acciones",
          },
          body: {
            emptyDataSourceMessage: "No hay información para mostrar",
            filterRow: {
              filterTooltip: "Filtrar",
            },
            editRow: {
              cancelTooltip: "Cancelar",
              saveTooltip: "Guardar",
              deleteText: '¿Estás seguro de eliminar esta categoria?'
            },
            addTooltip: "Agregar Categorias",
            editTooltip: "Editar Categorias",
            deleteTooltip: "Eliminar Categorias",
          },
        }}
        />
      </Grid>
    </Grid>
  );
}
