import { combineReducers } from "redux";
import { stockReducer } from "./stockReducer";

export const rootReducer: any = combineReducers({
  stock: stockReducer,
});

export type RootState = ReturnType<typeof rootReducer>