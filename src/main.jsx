import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { ScrollProvider } from "./context/ScrollContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ScrollProvider>
        <App />
      </ScrollProvider>
    </Provider>
    <Toaster />
  </>
);
