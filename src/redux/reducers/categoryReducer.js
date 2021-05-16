import { types } from "../types/types";
const initialState = {
  categories: [],
};



export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.categoryLoaded:
      return {
        ...state,
        categories: [...action.payload],
      };
      case types.categoryUpdate: 
      return{
        ...state,
        categories: state.categories.map(
          e=> (e._id === action.payload._id) ? action.payload : e
        )
      }
      case types.categoryDelete: 
      return {
        ...state,
      }
    default:
      return state;
  }
};
