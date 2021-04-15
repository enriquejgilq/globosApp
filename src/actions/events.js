import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

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
