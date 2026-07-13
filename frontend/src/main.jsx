import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import photo from "../src/assets/images/test.jpg";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="profile-photo-container">
        <img src={photo} />
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
