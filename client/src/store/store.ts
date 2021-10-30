import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { getRoomByIdReducer } from "./reducers/roomReducers/getRoomByIdReducer";
import { getRoomsByUserReducer } from "./reducers/roomsRedurers/getRoomsByUserReducer";
import { getRoomsReducer } from "./reducers/roomsRedurers/getRoomsReducer";
import { loginUserReducer } from "./reducers/userReducers/loginUserReducer";

const rootReducers = combineReducers({
  rooms: getRoomsReducer,
  // userRooms: getRoomsByUserReducer,
  room: getRoomByIdReducer,
  auth: loginUserReducer,
});

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
