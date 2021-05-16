import { types } from "../types/types";
const initialState = {
  products: [],
};


export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.productLoaded:
      return {
        ...state,
        products: [...action.payload],
      };
     
      case types.productsUpdate:
        return{
          ...state,
          products: state.products.map(
            e=> (e._id === action.payload._id) ? action.payload : e
          )
        }
       
    default:
      return state;
  }
};

