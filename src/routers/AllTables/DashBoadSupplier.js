import React from "react";
import { forwardRef } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { AllTables } from "../../components/Table/AllTables";

export function DashBoadSupplier() {
  const { useState } = React;

  return (
    <Grid container xs={12} md={12}>
      <Grid xs={12} md={12}>
      <AllTables /> 
      </Grid>
    </Grid>
  );
}
