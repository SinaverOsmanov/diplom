import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { getRoomByIdReducer } from "./reducers/roomReducers/getRoomByIdReducer";
import { getRoomsReducer } from "./reducers/roomsRedurers/getRoomsReducer";
import { loginUserReducer } from "./reducers/userReducers/loginUserReducer";

const rootReducers = combineReducers({
  rooms: getRoomsReducer,
  room: getRoomByIdReducer,
  auth: loginUserReducer,
});

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
