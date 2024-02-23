import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { WithoutQuery } from "./pages/WithoutQuery.jsx";
import { WithQuery } from "./pages/WithQuery.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const router = createBrowserRouter([
  { path: "", element: <App /> },
  { path: "/withoutquery", element: <WithoutQuery /> },
  { path: "withquery", element: <WithQuery /> },
]);

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
