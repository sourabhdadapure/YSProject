/**
 * @format
 */
import * as React from "react";
import { AppRegistry } from "react-native";
import App from "./src/views/App";
import ConfigureStore from "./src/config/ConfigStore";
const store = ConfigureStore();
import { Provider } from "react-redux";
import { name as appName } from "./app.json";

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
