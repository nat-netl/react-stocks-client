import { IModalStatus } from "./modal";

export interface IStock {
  id: number;
  name: string;
  date: string;
  quantity: number;
  days_receive_gift: string;
  days_receipt_gift: string;
  description?: string;
  card_numbers: string;
  edit_date?: string
  setActiveEditForm: (value: IModalStatus[]) => void;
  activeEditForm: IModalStatus[]
  handleDelete: (currentId: number) => void
}
export type StockState = {
  stocks: any[];
  loading: boolean;
  error: null | string;
};

export enum StocksActionTypes {
  FETCH_STOCKS = "FETCH_STOCKS",
  FETCH_STOCKS_SUCCESS = "FETCH_STOCKS_SUCCESS",
  FETCH_STOCKS_ERROR = "FETCH_STOCKS_ERROR",
}

interface FetchStocksAction {
  type: StocksActionTypes.FETCH_STOCKS;
}

interface FetchStocksSuccessAction {
  type: StocksActionTypes.FETCH_STOCKS_SUCCESS;
  payload: any[];
}

interface FetchStocksErrorAction {
  type: StocksActionTypes.FETCH_STOCKS_ERROR;
  payload: string;
}

export type StockAction =
  | FetchStocksAction
  | FetchStocksSuccessAction
  | FetchStocksErrorAction;
