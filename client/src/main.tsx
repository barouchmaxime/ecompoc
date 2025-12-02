import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {App} from "./App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import Cart from "./app/routes/cart/index";
import { catalogRoute } from "./app/routes/catalog";

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container!)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" {...catalogRoute }/>
        <Route path="/cart" element={<Cart />} />
      </Route>
    )
  );

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

