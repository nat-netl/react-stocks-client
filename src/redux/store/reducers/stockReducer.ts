import { StockAction, StockState, StocksActionTypes } from "../../../types/stock";

const initialState: StockState = {
  stocks: [],
  loading: false,
  error: null,
};

export const stockReducer = (
  state = initialState,
  action: StockAction
): StockState => {
  switch (action.type) {
    case StocksActionTypes.FETCH_STOCKS:
      return { loading: true, error: null, stocks: [] };
    case StocksActionTypes.FETCH_STOCKS_SUCCESS:
      return { loading: false, error: null, stocks: action.payload };
    case StocksActionTypes.FETCH_STOCKS_ERROR:
      return { loading: false, error: action.payload, stocks: [] };
    default:
      return state;
  }
};
