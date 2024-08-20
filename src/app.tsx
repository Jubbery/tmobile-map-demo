/* global document */
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "../index.css";

import Map from "./map";
import AppNavbar from "./app-navbar";

function Root() {
  return (
    <Provider store={store}>
      <AppNavbar />
      <Map />
    </Provider>
  );
}

const root = createRoot(
  document.body.appendChild(document.createElement("div"))
);
root.render(<Root />);
