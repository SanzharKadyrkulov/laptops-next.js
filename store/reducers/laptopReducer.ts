import {
  LaptopAction,
  LaptopActionTypes,
  LaptopState,
} from "../../types/laptop";

const initialState: LaptopState = {
  laptops: null,
  laptop: null,
  loading: false,
  error: null,
  page: 1,
  limit: 3,
};

export const laptopReducer = (
  state = initialState,
  action: LaptopAction
): LaptopState => {
  switch (action.type) {
    case LaptopActionTypes.FETCH_LAPTOPS:
      return { ...state, loading: true };
    case LaptopActionTypes.FETCH_LAPTOPS_SUCCES:
      return { ...state, laptops: action.payload, loading: false };
    case LaptopActionTypes.FETCH_LAPTOPS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case LaptopActionTypes.FETCH_ONE_LAPTOP:
      return { ...state, laptop: action.payload, loading: false };
    case LaptopActionTypes.SET_LAPTOP_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
