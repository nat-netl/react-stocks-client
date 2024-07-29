import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as StockActionCreators from "./../redux/store/actionCreators/stock"

export const useActions = () => {
  const dispatch = useDispatch ()
  return bindActionCreators (StockActionCreators, dispatch)
}