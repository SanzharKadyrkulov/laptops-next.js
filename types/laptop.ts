export interface LaptopState {
  laptops: any[] | null;
  laptop: Laptop | null;
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export interface Laptop {
  id: number;
  productName: string;
  image: string;
  cpu: string;
  ram: string;
  storage: string;
  screen: string;
  price: number;
  brand: string;
  description: string;
}
export enum LaptopActionTypes {
  FETCH_LAPTOPS = "FETCH_LAPTOPS",
  FETCH_LAPTOPS_SUCCES = "FETCH_LAPTOPS_SUCCES",
  FETCH_LAPTOPS_ERROR = "FETCH_LAPTOPS_ERROR",
  FETCH_ONE_LAPTOP = "FETCH_ONE_LAPTOP",
  SET_LAPTOP_PAGE = "SET_LAPTOP_PAGE",
}

interface FetchLaptopsAction {
  type: LaptopActionTypes.FETCH_LAPTOPS;
}
interface FetchLaptopsSuccesAction {
  type: LaptopActionTypes.FETCH_LAPTOPS_SUCCES;
  payload: any[];
}
interface FetchLaptopsErrorAction {
  type: LaptopActionTypes.FETCH_LAPTOPS_ERROR;
  payload: string;
}
interface FetchOneLaptopAction {
  type: LaptopActionTypes.FETCH_ONE_LAPTOP;
  payload: Laptop;
}

interface SetLaptopPageAction {
  type: LaptopActionTypes.SET_LAPTOP_PAGE;
  payload: number;
}
export type LaptopAction =
  | FetchLaptopsAction
  | FetchLaptopsSuccesAction
  | FetchLaptopsErrorAction
  | FetchOneLaptopAction
  | SetLaptopPageAction;
