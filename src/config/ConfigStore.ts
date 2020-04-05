import { createStore, applyMiddleware } from "redux";
import rootReducer from "../modules";
import thunk from "redux-thunk";

export default function ConfigureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}
