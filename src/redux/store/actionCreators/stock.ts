import { Dispatch } from "redux"
import { StockAction, StocksActionTypes } from "../../../types/stock"
import axios from "axios"
import { BASE_URL } from "../../../constants/baseUrl"

export const fetchStocks = () => {
  return async (dispatch: Dispatch<StockAction>) => {
    try {
      dispatch({type: StocksActionTypes.FETCH_STOCKS})
      const response = await axios.get (`${BASE_URL}/stocks/?page=3&limit=2`)
      setTimeout(() => {
        dispatch({type: StocksActionTypes.FETCH_STOCKS_SUCCESS, payload: response.data})
      }, 500)
    } catch (e) {
      dispatch({type: StocksActionTypes.FETCH_STOCKS_ERROR, payload: `Ошибка получения данных ${e}`})
    }
  }
}

export const fetchSearchStocks = (searchItem: string) => {
  return async (dispatch: Dispatch<StockAction>) => {
    try {
      dispatch({type: StocksActionTypes.FETCH_STOCKS})
      const response = await axios.get (`${BASE_URL}/search?term=${searchItem}`)
      setTimeout(() => {
        dispatch({type: StocksActionTypes.FETCH_STOCKS_SUCCESS, payload: response.data})
      }, 500)
    } catch (e) {
      dispatch({type: StocksActionTypes.FETCH_STOCKS_ERROR, payload: `Ошибка получения данных ${e}`})
    }
  }
}


