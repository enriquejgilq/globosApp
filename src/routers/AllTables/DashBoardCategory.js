import React, { useEffect, useRef, useState } from "react";
import { forwardRef } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import useStyles from "./styles";
import { eventStartAddNew, eventStartLoading, categoryUpdate, categoryDelete  } from "../../redux/actions/events";
import { useDispatch, useSelector } from "react-redux";
import {AllTables} from '../../components/Table/AllTables'



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
      <AllTables title="Categorias"
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
           /> 
      </Grid>
    </Grid>
  );
}
