import axios from "axios";
import { Dispatch } from "react";
import { defaultLimit } from "../../consts";
import { Laptop, LaptopAction, LaptopActionTypes } from "../../types/laptop";

export const fetchLaptops =
  (page = 1, limit = defaultLimit) =>
  async (dispatch: Dispatch<LaptopAction>) => {
    try {
      const filter = window.location.search;

      dispatch({ type: LaptopActionTypes.FETCH_LAPTOPS });

      const { data } = await axios.get(
        `${process.env.API_URL}/laptops/${filter}`,
        {
          params: { _page: page, _limit: limit },
        }
      );
      dispatch({
        type: LaptopActionTypes.FETCH_LAPTOPS_SUCCES,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: LaptopActionTypes.FETCH_LAPTOPS_ERROR,
        payload: e,
      });
    }
  };

export const fetchOneLaptop =
  (id: number, page = 1, limit = 6) =>
  async (dispatch: Dispatch<LaptopAction>) => {
    try {
      dispatch({ type: LaptopActionTypes.FETCH_LAPTOPS });
      const { data } = await axios.get(`${process.env.API_URL}/laptops/${id}`, {
        params: { _page: page, _limit: limit },
      });
      dispatch({
        type: LaptopActionTypes.FETCH_ONE_LAPTOP,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: LaptopActionTypes.FETCH_LAPTOPS_ERROR,
        payload: e,
      });
    }
  };

export function SetLaptopPage(page: number): LaptopAction {
  return { type: LaptopActionTypes.SET_LAPTOP_PAGE, payload: page };
}
export async function deleteLaptop(id: number) {
  await axios.delete(`${process.env.API_URL}/laptops/${id}`);
}
export async function addLaptop(laptop: Laptop) {
  await axios.post(`${process.env.API_URL}/laptops`, laptop);
}

export async function editLaptop(id: number, laptop: Laptop) {
  await axios.patch(`${process.env.API_URL}/laptops/${id}`, laptop);
}
