import { fetchConToken } from "../../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";



//Revisar el reducer de los productos 
export const eventStartAddNew = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events", event, "POST");
      const body = await resp.json();
      if (body.ok) {
        Swal.fire("categoria guardada con éxito", body.msg, "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(addNewCategory(event));
  };
};

const addNewCategory = (event) => ({
  type: types.eventStartAddNew,
  payload: event,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events");
      const body = await resp.json();

      const categories = body.eventos;
      dispatch(categoryLoaded(categories));
    } catch (error) {
      console.log(error);
    }
  };
};

const categoryLoaded = (categories) => ({
  type: types.categoryLoaded,
  payload: categories,
});

export const categoryUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event._id}`, event, "PUT");
      const body = await resp.json();
      if (body.ok) {
        Swal.fire(
          '',
          'Categoria editada con éxito',
          'success'
        )
        dispatch(categoryUp(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const categoryUp = (event) => ({
  type: types.categoryUpdate,
  payload: event,
});

export const categoryDelete = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event._id}`, {}, "DELETE");
      const body = await resp.json();
      if (body.ok) {
        try {
          const resp = await fetchConToken("events");
          const body = await resp.json();
    
          const categories = body.eventos;
          dispatch(categoryLoaded(categories));
        } catch (error) {
          console.log(error);
        }
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const categoryDel = () => ({
  type: types.categoryDelete,
});



export const addProducts = (event) => {
  return async (dispatch) => {
    console.log({event})

    try {
      const resp = await fetchConToken("products", event, "POST");
      const body = await resp.json();
      if (body.ok) {
        Swal.fire("producto guardada con éxito", body.msg, "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(addNewProduct(event));
  };

}


const addNewProduct = (event) => ({
  type: types.productsStartAddNew,
  payload: event,
});



export const productsLoaded = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("products");
      const body = await resp.json();
      const allProducts = body.products
      
         dispatch(allProductsLoaded(allProducts));

    } catch (error) {
      console.log(error);
    }
  };
};

const allProductsLoaded = (products) => ({
  type: types.productLoaded,
  payload: products,
});


export const productUpdates = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`products/${event._id}`, event, "PUT");
      const body = await resp.json();
      if (body.ok) {
        Swal.fire(
          '',
          'producto editado con éxito',
          'success'
        )
        dispatch(productUpdate(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const productUpdate = (products) => ({
  type: types.productsUpdate,
  payload: products,
});